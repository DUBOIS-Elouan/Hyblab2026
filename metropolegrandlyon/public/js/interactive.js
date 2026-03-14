//Liste de tous les éléments intéractifs de la page
const list_int = document.getElementsByClassName("interactive");



/**
 * Affiche un Pop-Up avec un texte correpondant à l'ID de l'élément donné en paramètre
 */
function popUp(id){
  fetch('data/text.json')
  .then(response => response.json())
  .then(data => {
    const PopUp = document.getElementById('P');
    const PopUpTxt = document.getElementById('PopUpTxt');
    const PopUpTitre = document.getElementById('PopUpTitre');

    PopUpTitre.innerHTML = data[id]["title"];
    PopUpTxt.innerHTML = data[id]["text"];//On affecte le texte au PopUp
    PopUp.style.display = "flex";//On affiche le Pop-Up

    document.body.style.overflow = "hidden";//Bloquer le scroll

    //FERMER LE POP-UP
    const closeBtn = document.getElementById('close');

    closeBtn.onclick = () => {PopUp.style.display = "none"; document.body.style.overflow = "auto";}
    window.onclick = (event) => {
      if (event.target == PopUp){ PopUp.style.display = "none"; document.body.style.overflow = "auto"}
    };

  })
};



/**
 * Observeur pour l'animation de l'apparition des éléments interactifs
 */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutExpo'
      });
    }
  });
});



/**
 * Récupérer tous les éléments interactifs et affectent les fonctions correspondantes
 */
for(const int of list_int) {//On récupère chaque élément interactif de index.html
  observer.observe(int);
  int.addEventListener("click", () => {//A chaque clic sur un élément on affiche le Pop-Up avec le texte indiqué
    popUp(int.id);
  });
};