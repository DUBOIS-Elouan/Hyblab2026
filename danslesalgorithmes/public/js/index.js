"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

swiper.on("slideChange", function () {
  switch( swiper.activeIndex ) {
    case 0:
      initSlide1();
      break;
    case 1:
      initSlide2();
      break;
  }
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide1();
}, 1000);


const figure = document.querySelector("#background-figure");
const steps = document.querySelectorAll(".step");
const scroller = scrollama();

// Variable pour stocker le son en cours de lecture
let currentAudio = null;

// Afficher la première image au chargement
figure.style.backgroundImage = `url('${steps[0].getAttribute('data-image')}')`;

scroller
    .setup({
        step: "#scrolly article .step",
        offset: 0.5,
        debug: false
    })
    .onStepEnter((response) => {
        // 1. Gérer le style actif
        steps.forEach(step => step.classList.remove('is-active'));
        response.element.classList.add('is-active');

        // 2. Gérer le changement d'image
        const newImage = response.element.getAttribute('data-image');
        figure.style.backgroundImage = `url('${newImage}')`;

        // 3. Gérer l'audio
        const newAudioFile = response.element.getAttribute('data-audio');
        
        // Si un son joue déjà, on l'arrête
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Remet le son à zéro
            currentAudio = null;
        }

        // S'il y a un son prévu pour cette étape, on le lance
        if (newAudioFile) {
            currentAudio = new Audio(newAudioFile);
            // Le bloc .catch() évite que la page plante si le navigateur bloque l'audio
            currentAudio.play().catch(erreur => {
                console.warn("Le navigateur a bloqué la lecture automatique du son :", erreur);
            });
        }
    });
  document.addEventListener('DOMContentLoaded', function() {
  // Quizz 1 : une seule réponse correcte
  const quiz1 = {
    container: document.getElementById('quiz-1'),
    options: document.querySelectorAll('#quiz-1 .option-btn'),
    nextButton: document.getElementById('next-btn-1'),
  };

  // Quizz 2 : sélection multiple
  const quiz2 = {
    container: document.getElementById('quiz-2'),
    options: document.querySelectorAll('#quiz-2 .option-btn'),
    feedback: document.getElementById('feedback-2'),
    validateButton: document.getElementById('validate-btn-2'),
  };

  // Fonction pour gérer le Quizz 1
  function handleQuiz1(selectedButton) {
    const isCorrect = selectedButton.dataset.correct === 'true';
    selectedButton.textContent = isCorrect ? 'Effectivement' : 'Et non';

    quiz1.options.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = '#5cb85c';
      } else {
        button.style.backgroundColor = '#d9534f';
      }
    });
  }

  // Fonction pour gérer la sélection des réponses dans le Quizz 2
  function toggleSelection(button) {
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      button.style.backgroundColor = '#4CAF50';
    } else {
      button.classList.add('selected');
      button.style.backgroundColor = '#5bc0de'; // Bleu clair pour les réponses sélectionnées
    }
  }

  // Fonction pour valider les réponses du Quizz 2
  function validateQuiz2() {
    const selectedOptions = document.querySelectorAll('#quiz-2 .option-btn.selected');
    const allCorrectOptions = document.querySelectorAll('#quiz-2 .option-btn[data-correct="true"]');

    // Désactive tous les boutons
    quiz2.options.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = '#5cb85c'; // Vert pour les bonnes réponses
      } else if (button.classList.contains('selected')) {
        button.style.backgroundColor = '#d9534f'; // Rouge pour les mauvaises réponses sélectionnées
      }
    });

    // Vérifie si toutes les bonnes réponses ont été sélectionnées
    let allCorrectSelected = true;
    allCorrectOptions.forEach(option => {
      if (!option.classList.contains('selected')) {
        allCorrectSelected = false;
      }
    });

    // Affiche le feedback
    if (allCorrectSelected && selectedOptions.length === allCorrectOptions.length) {
      quiz2.feedback.textContent = "Parfait ! Toutes les réponses sélectionnées sont correctes.";
      quiz2.feedback.style.color = '#5cb85c';
    } else {
      quiz2.feedback.textContent = "Toutes les propositions étaient correctes.";
      quiz2.feedback.style.color = '#5cb85c';
    } 
  }

  // Écouteurs d'événements pour le Quizz 1
  quiz1.options.forEach(button => {
    button.addEventListener('click', () => handleQuiz1(button));
  });

  // Écouteurs d'événements pour le Quizz 2
  quiz2.options.forEach(button => {
    button.addEventListener('click', () => toggleSelection(button));
  });

  quiz2.validateButton.addEventListener('click', validateQuiz2);
});