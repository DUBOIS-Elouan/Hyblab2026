"use strict"




const affiches = document.querySelector(".affiches");

const zone_pour = document.querySelector(".zoon_pour");
const zone_contre = document.querySelector(".zoon_contre");

const film_cards = [];
// generate affiche

const nb_card = 13;
const nb_tours = Math.round(Math.random()*30 + 10);
const distance = 400



;[...Array(nb_card).keys()].forEach((index) => {
  console.log("ici")
  const section = document.createElement("section");
  section.classList.add("film")

  const front_div = document.createElement("div")
  front_div.classList.add("affiche_front")

  const affiche = document.createElement("img")
  affiche.setAttribute("src", "./img/background.svg")
  const text = document.createElement("h2")
  text.innerText = index.toString()

  front_div.appendChild(affiche)
  front_div.appendChild(text)

  const back_div = document.createElement("div")
  back_div.classList.add("affiche_back")

  const film_title = document.createElement("h2")
  film_title.innerText = "Nom Film"
  const film_text = document.createElement("p")
  film_text.innerText = "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès"

  back_div.appendChild(film_title)
  back_div.appendChild(film_text)

  section.appendChild(front_div)
  section.appendChild(back_div)

  film_cards.push(section)

  affiches.appendChild(section)
})


//anmation card
film_cards.forEach((card) => {
  const front = card.querySelector(".affiche_front");
  const back = card.querySelector(".affiche_back");
  const tl = gsap.timeline({ paused: true })
    .to(front, { duration: 1, rotationY: 180 })
    .to(back, { duration: 1, rotationY: 0 }, 0)

  card.addEventListener("click", function () {
    if (tl.progress() === 0) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

})

film_cards.sort(() => Math.random() - 0.5)

const rect_poss =  Array(nb_card)

film_cards.forEach((elem, index) => {
  rect_poss[index] = elem.getBoundingClientRect();
})


setTimeout(function () {


  film_cards.forEach((elem, index) => {

    const angle = ((2 * Math.PI) / film_cards.length) * index

    elem.setAttribute("id",index)

    console.log(angle * 360 / (Math.PI*2))
    console.log(Math.sin(angle)*distance +(window.innerHeight/2))

    const rect = rect_poss[index]

    gsap.set(affiches, {
      margin: 0,
    })

    console.log(rect)
    gsap.set(elem, {
      position: "absolute",
      x: rect.left,
      y: rect.top,
      top: 0,
      left: 0
    });

        
    const t1 = gsap.timeline({ease: Linear})

    master.add(t1,0)

    t1.to(elem,{
      delay : Math.random(),
      duration : 2,
      y : rect.top - 50
    })
    .to(elem,{
      duration :1,
      y : Math.sin(angle)*distance +(window.innerHeight/2),// + window.innerHeight/2,
      z : Math.cos(angle)*distance,
      x : (window.innerWidth / 2),
      scale : ((Math.cos(angle)*distance+distance) * 0.8 / (distance*2) + 0.2)*2.5, 
      xPercent:-50,
      yPercent:-50,
    },3)

    ;[...Array(nb_tours).keys()].forEach(decalage => {
      const angle = ((2 * Math.PI) / film_cards.length) * ((index+decalage)%film_cards.length)

      t1.to(elem,{
        duration : 0.5 * (decalage/nb_tours)/2,
        y : Math.sin(angle)*distance +(window.innerHeight/2),// + window.innerHeight/2,
        z : Math.cos(angle)*distance,
        x : (window.innerWidth / 2),
        scale : ((Math.cos(angle)*distance+distance) * 0.8 / (distance*2) + 0.2)*2.5, 
        xPercent:-50,
        yPercent:-50,
      })
    })




    if ((index+nb_tours-1)%film_cards.length == 0){
      t1.set(elem,{
        transformOrigin: "bottom left",
        xPercent : -125,
        yPercent :  25
      })
      .to(elem,{
        duration : 1,
        rotateZ : "-10deg",
      },"+=0")
      .to(zone_contre,{
        duration : 1,
        "--transparance_contre": "100%"
      },"<")
      .to(elem,{
        duration : 1,
        rotateZ : "0deg"
      },"+=0")
      .to(zone_contre,{
        duration : 1,
        "--transparance_contre": "70%"
      },"<")


      .set(elem,{
        transformOrigin: "bottom right",
        xPercent : 25,
        yPercent :  25
      })
      .to(elem,{
        duration : 1,
        rotateZ : "10deg"
      },"+=0")
      .to(zone_pour,{
        duration : 1,
        "--transparance_pour": "0%"
      },"<")
      .to(elem,{
        duration : 1,
        rotateZ : "0deg"
      },"+=0")
      .to(zone_pour,{
        duration : 1,
        "--transparance_pour": "30%"
      },"<")
      .set(elem,{
        transformOrigin: "center center",
        xPercent : -50,
        yPercent :  -50
      })
    }
  })

}, 2000);



///////////////////////

// const img = document.getElementById("img");
// const card = document.getElementById("card");

// img.onload = () => {
//   const colorThief = new ColorThief();
//   const color = colorThief.getColor(img);

//   card.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
// };



const master = gsap.timeline({
  onComplete: () => {

    

    
    console.log("Tout est fini");
  }
});



//

gsap.registerPlugin(Observer);

let pos = 0.0
Observer.create({
  target: window,
  type: "touch",
  debounce: true,

  onChange: (self) => {

    pos +=  self.deltaY / 100;
    
    console.log(self.deltaY / 20)
    console.log(pos)
    console.log(pos*180/Math.PI)



    film_cards.forEach((elem, index) => {

      const angle = (((2 * Math.PI) / film_cards.length) * ((index+nb_tours)%film_cards.length)) +pos

      
      gsap.set(elem, {
        y : Math.sin(angle)*distance +(window.innerHeight/2),
        z : Math.cos(angle)*distance,
        scale : ((Math.cos(angle)*distance+distance) * 0.8 / (distance*2) + 0.2)*2.5, 

    });
  })
}});
