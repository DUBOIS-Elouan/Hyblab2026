"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){

  // Get some data
  let response = await fetch('data/contaminationMiniere.json');
  const data2 = await response.json();

  // Update the DOM

  // Insert title
  const title = document.querySelector('.titre');
  console.log(title)
  title.innerHTML = `${data2.titreEnquete}`;

  // Insert chapeau
  const chapeau = document.querySelector('.chapeau')
  chapeau.innerHTML = data2.chapeauEnquete;

  // Insert img
  const imgPrincipale = document.querySelector('.imgPrincipale')
  console.log(imgPrincipale)
  console.log(data2.imgPath)
  imgPrincipale.src = data2.imgPath


};