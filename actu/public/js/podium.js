fetch('data/movies.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('podium-container');
    let htmlString = '';

    const topThree = data.filter(item => item.rank === 1 || item.rank === 2 || item.rank === 3);

    topThree.forEach(item => {
      htmlString += `
        <div class="step step-${item.rank}">
          <img src="${item.image}" alt="${item.alt}" class="step-img">
          ${item.rank}
        </div>
      `;
    });

    container.innerHTML = htmlString;

    // GASP
    gsap.from(".step", {
      y: 150,            
      opacity: 0,        
      duration: 0.8,     
      stagger: 0.2,      
      ease: "back.out(1.7)" 
    });

    

  })
  .catch(error => console.error('failed to read json', error));