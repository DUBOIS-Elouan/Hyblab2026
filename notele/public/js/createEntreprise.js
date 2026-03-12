class Entreprise {
  nom;
  taille;
  secteur;
  tags;
  vu;  

  constructor(taille,secteur,nom,tags,coords) {
    this.taille = taille;
    this.secteur = secteur;
    this.nom = nom;
    this.tags = tags;
    this.coords = coords;

  }
}

const entreprises = [
  new Entreprise("PME", "Alimentaire", "Ecofrost", [],false),
  new Entreprise("PME", "Tech", "Red System", ["Jobs pas comme les autres"],false),
  new Entreprise("PME", "Alimentaire", "Storme", ["Affaire de famille"],false),
  new Entreprise("Indépendant", "Alimentaire", "Les Glaces d'Élodie", [],false),
  new Entreprise("PME", "Agriculture", "Moulin de Moulbaix", ["Affaire de famille"],false),
  new Entreprise("Grande entreprise", "Commerce", "Famiflora", [],false),
  new Entreprise("PME", "Artisanat", "Atlantis Security", ["Jobs pas comme les autres"],false),
  new Entreprise("PME", "Artisanat", "Les Camuches", [],false),
  new Entreprise("Indépendant", "Agriculture", "Mother Flower", ["Boss ladies"],false),
  new Entreprise("PME", "Tech", "Technord", [],false),
  new Entreprise("PME", "Alimentaire", "Six Fumaison", ["Jobs pas comme les autres"],false),
  new Entreprise("PME", "Agriculture", "Domaine Degavre", ["Jobs pas comme les autres"],false),
  new Entreprise("Indépendant", "Commerce", "Doc Phone", ["Jobs pas comme les autres"],false),
  new Entreprise("PME", "Tech", "MyQM", ["Plot twist"],false),
  new Entreprise("Indépendant", "Artisanat", "Hélène Création", ["Boss ladies"],false),
];

const pins = {  "Alimentaire" : "./img/pin_Alimentaire.svg", "Tech" : "./img/pin_tech.svg", "Agriculture" : "./img/pin_agriculture.svg",
                "Artisanat" : "./img/pin_artisanat.svg", "Commerce" : "./img/pin_commerce.svg", "Industrie" : "./img/pin_industrie.svg",
                "Sante" : "./img/pin_sante.svg",};

var i = 1;
entreprises.forEach((entreprise) => {
    const entreprise_div = document.createElement("div");
    entreprise_div.id = "E" + String(i);
    entreprise_div.className = "entreprisePin Pin"

    const entreprise_pin = document.createElement("img");
    entreprise_pin.alt = "Pin entreprise " + entreprise.nom;
    entreprise_pin.src = pins[entreprise.secteur];
    entreprise_div.appendChild(entreprise_pin)

    const parentDiv = document.getElementById("pinLayer");
    const nextDiv = document.getElementById("V1");

  parentDiv.insertBefore(entreprise_div, nextDiv);
  i++;
});