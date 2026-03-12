//  POPUP MODULE
//  Exposes window.Popup — handles article popup open/close

window.Popup = (() => {

  function init() {
    document.getElementById('popup-close').addEventListener('click', close);
    document.getElementById('btn-close-popup').addEventListener('click', close);
    document.getElementById('popup-overlay').addEventListener('click', e => {
      if (e.target.id === 'popup-overlay') close();
    });
  }

  function open(data) {
    const a = data.article;
    document.getElementById('popup-category').textContent    = a.category || '';
    document.getElementById('popup-title').textContent       = a.title;
    document.getElementById('popup-description').textContent = a.description;
    document.getElementById('popup-specs').innerHTML = (a.specs || []).map(s =>
      `<div class="spec-item">
        <div class="spec-label">${s.label}</div>
        <div class="spec-value">${s.value}</div>
      </div>`
    ).join('');
    document.getElementById('popup-overlay').classList.add('visible');
  }

  function close() {
    document.getElementById('popup-overlay').classList.remove('visible');
  }

  return { init, open, close };

})();