// ════════════════════════════════════════════════════════════════
//  LOAD DATA FROM JSON
// ════════════════════════════════════════════════════════════════
fetch('data/epstein-data.json')
  .then(r => r.json())
  .then(({ imagePath, hotspots }) => init(imagePath, hotspots))
  .catch(err => {
    console.error('Failed to load the data, check if the file exists', err);
  });

// ════════════════════════════════════════════════════════════════
//  MAIN INIT
// ════════════════════════════════════════════════════════════════
function init(IMAGE_PATH, HOTSPOTS) {

  // ════════════════════════════════════════════════════════════════
  //  THREE.JS SETUP
  // ════════════════════════════════════════════════════════════════
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0.001);

  // Sphère inversée 360°
  const sphereGeo = new THREE.SphereGeometry(500, 64, 40);
  sphereGeo.scale(-1, 1, 1);

  const loader = new THREE.TextureLoader();
  loader.load(
    IMAGE_PATH,
    tex => {
      scene.add(new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ map: tex })));
      hideLoading();
    },
    xhr => {
      document.getElementById('loading-bar').style.width =
        Math.round(xhr.loaded / (xhr.total || 1) * 100) + '%';
    },
    () => {
      // Texture de fallback si l'image est introuvable
      const c = document.createElement('canvas');
      c.width = 2048; c.height = 1024;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, 2048, 1024);
      g.addColorStop(0,  '#1a0808');
      g.addColorStop(.5, '#2a1a08');
      g.addColorStop(1,  '#0a0a1a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 2048, 1024);
      for (let x = 0; x < 2048; x += 80) {
        ctx.strokeStyle = 'rgba(240,160,90,.05)';
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
      }
      for (let y = 0; y < 1024; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(240,160,90,.7)';
      ctx.font = 'bold 38px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠  Image non trouvée — placez votre .png dans le même dossier', 1024, 490);
      ctx.fillStyle = 'rgba(255,255,255,.22)';
      ctx.font = '22px sans-serif';
      ctx.fillText(IMAGE_PATH, 1024, 545);
      scene.add(new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })));
      hideLoading();
    }
  );

  // ════════════════════════════════════════════════════════════════
  //  HOTSPOT MESHES
  // ════════════════════════════════════════════════════════════════
  const R = 490;
  const hotspotMeshes = [];

  function sph2cart(phi, theta) {
    return new THREE.Vector3(
      R * Math.sin(phi) * Math.sin(theta),
      R * Math.cos(phi),
      R * Math.sin(phi) * Math.cos(theta)
    );
  }

  HOTSPOTS.forEach(h => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x5cf0c8 })
    );
    mesh.position.copy(sph2cart(h.phi, h.theta));
    mesh.userData = h;
    scene.add(mesh);
    hotspotMeshes.push(mesh);

    const label = document.createElement('div');
    label.className = 'hotspot-label';
    label.innerHTML = `<div class="dot"></div><div class="tag">${h.label}</div>`;
    document.body.appendChild(label);
    h._label = label;
    h._mesh  = mesh;
  });

  // ════════════════════════════════════════════════════════════════
  //  INIT MODULES
  // ════════════════════════════════════════════════════════════════
  window.Controller.init(camera, renderer);
  window.Popup.init();
  if (window.Calibrator) window.Calibrator.init(IMAGE_PATH, renderer);

  // ════════════════════════════════════════════════════════════════
  //  RAYCASTING
  // ════════════════════════════════════════════════════════════════
  const raycaster = new THREE.Raycaster();
  const mouse     = new THREE.Vector2();

  renderer.domElement.addEventListener('click', e => {
    const { x: mdX, y: mdY } = window.Controller.getDragStart();
    if (Math.hypot(e.clientX - mdX, e.clientY - mdY) > 5) return;
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (window.Calibrator && window.Calibrator.isActive()) {
      const dir = raycaster.ray.direction.clone().normalize();
      const phi   = Math.acos(Math.max(-1, Math.min(1, dir.y)));
      const theta = Math.atan2(dir.x, dir.z);
      window.Calibrator.addPoint(phi, theta);
      return;
    }

    const hits = raycaster.intersectObjects(hotspotMeshes);
    if (hits.length > 0) window.Popup.open(hits[0].object.userData);
  });

  renderer.domElement.addEventListener('mousemove', e => {
    if (window.Controller.dragging()) return;
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    if (window.Calibrator && window.Calibrator.isActive()) return;
    renderer.domElement.style.cursor =
      raycaster.intersectObjects(hotspotMeshes).length > 0 ? 'pointer' : 'grab';
  });

  // ════════════════════════════════════════════════════════════════
  //  LABEL PROJECTION 3D → 2D
  // ════════════════════════════════════════════════════════════════
  const tempV = new THREE.Vector3();

  function updateLabels() {
    HOTSPOTS.forEach(h => {
      tempV.copy(h._mesh.position).project(camera);
      if (tempV.z > 1) { h._label.style.opacity = '0'; return; }
      h._label.style.opacity = '1';
      h._label.style.left = ((tempV.x * .5 + .5) * window.innerWidth)  + 'px';
      h._label.style.top  = ((-tempV.y * .5 + .5) * window.innerHeight) + 'px';
    });
  }

  // ════════════════════════════════════════════════════════════════
  //  ANIMATION LOOP
  // ════════════════════════════════════════════════════════════════
  function animate() {
    requestAnimationFrame(animate);
    window.Controller.update();
    updateLabels();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

} // end init()

// ════════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════════
function hideLoading() {
  document.getElementById('loading-bar').style.width = '100%';
  setTimeout(() => document.getElementById('loading').classList.add('hidden'), 400);
}