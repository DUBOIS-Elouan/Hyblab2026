const MovieList = (() => {
  let allMovies = [];
  let isExpanded = false;

  async function loadMovies(jsonPath = 'data/movies.json') {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error('Failed to load movies.json');
      allMovies = await res.json();
      render();
    } catch (e) {
      console.error(e);
      const list = document.querySelector('.list');
      if (list) list.innerHTML = '<div class="list-loading">Failed to load movies.json</div>';
    }
  }

  function createItem(movie, index, isNew = false) {
    const div = document.createElement('div');
    div.className = 'list-item' + (isNew ? ' fade-in' : '');
    div.style.animationDelay = isNew ? `${index * 60}ms` : '0ms';
    div.style.flexShrink = '0';
    div.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="item-img">
      <div class="item-content">
        <div class="item-top">
          <span class="item-title">${movie.title}</span>
          <div class="item-circle bg-red">${movie.rank}</div>
        </div>
        <div class="item-bottom">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${movie.score}%;"></div>
          </div>
          <span class="item-percent">${movie.score}%</span>
        </div>
      </div>
    `;
    return div;
  }

  function render(animate = false) {
    const list = document.querySelector('.list');
    if (!list) return;

    const likedMovies = allMovies.filter(m => m.liked);
    const moviesToShow = isExpanded ? allMovies : likedMovies;

    const existingIds = new Set(
      [...list.querySelectorAll('.list-item')].map(el => el.dataset.id)
    );

    list.innerHTML = '';

    moviesToShow.forEach((movie, i) => {
      const isNew = animate && !existingIds.has(String(movie.id));
      const item = createItem(movie, i, isNew);
      item.dataset.id = movie.id;
      list.appendChild(item);
    });
  }

  function toggle() {
    isExpanded = !isExpanded;

    const btn = document.querySelector('.toggle-btn');
    if (btn) btn.classList.toggle('expanded', isExpanded);

    render(true);
  }

  function initToggleButton() {
    const list = document.querySelector('.list');
    if (!list) return;

    list.style.maxHeight = '350px';
    list.style.overflowY = 'auto';
    list.style.boxSizing = 'border-box';

    if (list.parentElement.classList.contains('list-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'list-wrapper';
    list.parentNode.insertBefore(wrapper, list);
    wrapper.appendChild(list);

    const btn = document.createElement('button');
    btn.className = 'toggle-btn';
    btn.setAttribute('aria-label', 'Toggle all movies');
    btn.innerHTML = `
      <div class="dot-line"></div>
      <div class="dot-line"></div>
      <div class="arrow">
        <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 2.5 L4 5.5 L7 2.5" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>
      <div class="dot-line"></div>
      <div class="dot-line"></div>
    `;
    btn.addEventListener('click', toggle);
    wrapper.appendChild(btn);
  }

  function init(jsonPath) {
    initToggleButton();
    loadMovies(jsonPath);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  MovieList.init('data/movies.json');
});