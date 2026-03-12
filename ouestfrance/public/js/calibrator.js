// ════════════════════════════════════════════════════════════════
//  CALIBRATOR MODULE
//  Exposes window.Calibrator — loaded independently from main.js
// ════════════════════════════════════════════════════════════════
window.Calibrator = (() => {

  let calibMode   = false;
  let calibPoints = [];
  let IMAGE_PATH  = '';
  let rendererEl  = null;

  // ── DOM refs ──
  const toggle  = () => document.getElementById('calib-toggle');
  const panel   = () => document.getElementById('calib-panel');
  const cross   = () => document.getElementById('calib-crosshair');
  const coords  = () => document.getElementById('calib-coords');
  const list    = () => document.getElementById('calib-list');
  const hint    = () => document.getElementById('hint');

  // ════════════════════════════════════════════════════════════════
  //  PUBLIC API
  // ════════════════════════════════════════════════════════════════
  function init(imagePath, renderer) {
    IMAGE_PATH = imagePath;
    rendererEl = renderer.domElement;

    toggle().addEventListener('click', () => setMode(!calibMode));
    document.getElementById('calib-close-btn').addEventListener('click', () => setMode(false));
    document.getElementById('calib-clear').addEventListener('click', clearPoints);
    document.getElementById('calib-export').addEventListener('click', exportJSON);

    window.addEventListener('mousemove', e => {
      if (!calibMode) return;
      cross().style.left = e.clientX + 'px';
      cross().style.top  = e.clientY + 'px';
    });
  }

  function isActive() {
    return calibMode;
  }

  function addPoint(phi, theta) {
    const name = prompt("Nom de l'objet :", 'Objet ' + (calibPoints.length + 1));
    if (!name) return;
    calibPoints.push({ name, phi: +phi.toFixed(4), theta: +theta.toFixed(4) });
    coords().innerHTML =
      `✅ <b>${name}</b> — phi = <b>${phi.toFixed(4)}</b>  /  theta = <b>${theta.toFixed(4)}</b>`;
    renderList();
  }

  // ════════════════════════════════════════════════════════════════
  //  PRIVATE
  // ════════════════════════════════════════════════════════════════
  function setMode(on) {
    calibMode = on;
    toggle().classList.toggle('active', on);
    panel().classList.toggle('on', on);
    cross().classList.toggle('on', on);
    if (rendererEl) rendererEl.style.cursor = on ? 'crosshair' : 'grab';
    if (hint()) hint().style.display = on ? 'none' : '';
    if (on) coords().textContent = '▶ Cliquez sur un objet pour obtenir ses coordonnées.';
  }

  function clearPoints() {
    calibPoints = [];
    renderList();
    coords().textContent = '▶ Cliquez sur un objet pour obtenir ses coordonnées.';
  }

  function renderList() {
    list().innerHTML = calibPoints.map((p, i) =>
      `<div class="calib-entry">
        <span><b>${p.name}</b> &nbsp;<small style="opacity:.4">phi=${p.phi}  θ=${p.theta}</small></span>
        <button class="calib-del" onclick="Calibrator._remove(${i})">✕</button>
      </div>`
    ).join('');
  }

  function exportJSON() {
    if (!calibPoints.length) { alert('Aucun point enregistré.'); return; }

    const json = JSON.stringify({
      imagePath: IMAGE_PATH,
      hotspots: calibPoints.map(p => ({
        id: p.name.toLowerCase().replace(/\s+/g, '_'),
        label: p.name,
        phi: p.phi,
        theta: p.theta,
        article: {
          category: 'Catégorie · Sous-catégorie',
          title: p.name,
          description: 'Décrivez cet objet ici.',
          specs: [
            { label: 'Spec 1', value: 'Valeur 1' },
            { label: 'Spec 2', value: 'Valeur 2' },
            { label: 'Spec 3', value: 'Valeur 3' },
            { label: 'Spec 4', value: 'Valeur 4' }
          ]
        }
      }))
    }, null, 2);

    const btn = document.getElementById('calib-export');

    navigator.clipboard.writeText(json)
      .then(() => {
        btn.textContent = '✅ Copié dans le presse-papier !';
        setTimeout(() => btn.textContent = '📋 Copier le JSON', 2200);
      })
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = json;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('JSON copié !');
      });
  }

  // Exposed for inline onclick in renderList
  function _remove(i) {
    calibPoints.splice(i, 1);
    renderList();
  }

  return { init, isActive, addPoint, _remove };

})();