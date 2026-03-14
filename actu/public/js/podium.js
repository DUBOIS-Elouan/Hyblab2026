const API = "http://localhost:8080/actu/api" 

async function loadpodium(){
  const classementResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
  const classement = await classementResponse.json();
  const podium = classement.slice(0,3);

  const container = document.getElementById('podium-container');
  
  let stepsHtmlString = '';
  let rank = 0;
  podium.forEach(item => {
    rank +=1;
    stepsHtmlString += `
      <div class="step step-${rank}">
        <img src="${item.affiche}" alt="${item.titre}" class="step-img img-${rank}">
        <span class="step-rank">${rank}</span>
      </div>
    `;
  });

  const fullPodiumHtml = `
      <img class="podium-svg" src="img/podium/podium.svg"></img>
      <div class="podium-steps">
        ${stepsHtmlString}
      </div>

    `;

  container.innerHTML = fullPodiumHtml;

  gsap.from(".step", {
    y: 150,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
  });

  const classementCritiqueResponse = await 

  buildBackSide(data);
  initFlip();
}

loadpodium();

// fetch('data/movies.json')
//   .then(response => response.json())
//   .then(data => {
//     const container = document.getElementById('podium-container');
    
//     const topThree = data.filter(item => item.rank === 1 || item.rank === 2 || item.rank === 3);

//     let stepsHtmlString = '';
//     topThree.forEach(item => {
//       stepsHtmlString += `
//         <div class="step step-${item.rank}">
//           <img src="${item.image}" alt="${item.title}" class="step-img img-${item.rank}">
//           <span class="step-rank">${item.rank}</span>
//         </div>
//       `;
//     });

//     const fullPodiumHtml = `
//       <img class="podium-svg" src="img/podium/podium.svg"></img>
//       <div class="podium-steps">
//         ${stepsHtmlString}
//       </div>

//     `;

//     container.innerHTML = fullPodiumHtml;

//     gsap.from(".step", {
//       y: 150,
//       opacity: 0,
//       duration: 0.8,
//       stagger: 0.2,
//       ease: "back.out(1.7)"
//     });

//     buildBackSide(data);
//     initFlip();
//   })
//   .catch(error => console.error('failed to read json', error));

function scoreToStars(score, max = 4) {
  const filled = Math.round((score / 100) * max);
  let html = '';
  for (let i = 0; i < max; i++) {
    html += `<span class="star${i < filled ? '' : ' empty'}">&#9733;</span>`;
  }
  return html;
}

function buildBackSide() {
  const heroImg = document.getElementById('back-hero-img');
  const backList = document.getElementById('back-list');

  const sorted = [...data].sort((a, b) => a.critic_rank - b.critic_rank);

  const top = sorted[0];
  heroImg.src = top.image;
  heroImg.alt = top.title;

  sorted.forEach((movie, i) => {
    const item = document.createElement('div');
    item.className = 'back-item';
    item.style.animationDelay = `${i * 55}ms`;
    item.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="back-item-img">
      <div class="back-item-content">
        <span class="back-item-title">${movie.title}</span>
        <span class="back-item-critic">${movie.director || ''}</span>
        <div class="back-item-stars">${scoreToStars(movie.critic_score)}</div>
      </div>
    `;
    backList.appendChild(item);
  });
}

function initFlip() {
  const card = document.getElementById('flip-card');
  if (!card) return;

  card.addEventListener('click', (e) => {
    if (
      e.target.closest('.step-img') ||
      e.target.closest('.toggle-btn')
    ) return;

    card.classList.toggle('is-flipped');
  });
}