//  CONTROLLER MODULE
//  Exposes window.Controller — handles drag, touch, zoom

window.Controller = (() => {

  let isDragging = false;
  let lon = 0, lat = 0, targetLon = 0, targetLat = 0;
  let mdX = 0, mdY = 0, prevX = 0, prevY = 0;
  let camera = null;
  let rendererEl = null;

  // 
  //  PUBLIC API
  // 
  function init(cam, renderer) {
    camera = cam;
    rendererEl = renderer.domElement;

    // ── Mouse ──
    rendererEl.addEventListener('mousedown', e => {
      isDragging = true;
      mdX = prevX = e.clientX;
      mdY = prevY = e.clientY;
      document.body.classList.add('dragging');
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.classList.remove('dragging');
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      targetLon -= (e.clientX - prevX) * 0.25;
      targetLat += (e.clientY - prevY) * 0.15;
      targetLat  = Math.max(-85, Math.min(85, targetLat));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    // ── Touch ──
    rendererEl.addEventListener('touchstart', e => {
      isDragging = true;
      mdX = prevX = e.touches[0].clientX;
      mdY = prevY = e.touches[0].clientY;
    });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', e => {
      if (!isDragging) return;
      targetLon -= (e.touches[0].clientX - prevX) * 0.25;
      targetLat += (e.touches[0].clientY - prevY) * 0.15;
      targetLat  = Math.max(-85, Math.min(85, targetLat));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    });

    // ── Zoom (wheel) ──
    rendererEl.addEventListener('wheel', e => {
      camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.03));
      camera.updateProjectionMatrix();
    }, { passive: true });
  }

  // Called each frame from the animation loop
  function update() {
    lon += (targetLon - lon) * 0.09;
    lat += (targetLat - lat) * 0.09;
    const phi   = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    camera.lookAt(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
  }

  function getDragStart() {
    return { x: mdX, y: mdY };
  }

  function dragging() {
    return isDragging;
  }

  return { init, update, getDragStart, dragging };

})();