'use strict';

const app = require( 'express' )();
const path = require('path');

// BASE DE DONNEES

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let db;

app.get('/init', async function ( req, res ) {
    initialisation();
    res.json({'Ok':true});
} );
// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );


// BASE DE DONNEES

async function getDB(){
    if(!db){
        db = await open({
            filename: './actu/api/BDD/database.db',
            driver: sqlite3.Database
        })
    }
    return db;
}

async function initialisation(){
    const db = await getDB();
    db.exec(`
    CREATE TABLE Utilisateur(
        id INTEGER PRIMARY KEY,
        token TEXT
    ) STRICT

    CREATE TABLE FilmAime(
        id_film INTEGER PRIMARY KEY,
        id_utilisateur INTEGER PRIMARY KEY
    ) STRICT

    CREATE TABLE Film (
        id INTEGER PRIMARY KEY,
        nom TEXT,
        affiche TEXT,
        bande_annonce TEXT,
        critique TEXT, 
        nb_etoile INTEGER,
        description TEXT, 
        realisateur TEXT,
        date_sortie TEXT
    ) STRICT 

    CREATE TABLE Acteur(
        id INTEGER PRIMARY KEY, 
        nom TEXT, 
        prenom TEXT
    )

    CREATE TABLE FilmActeur(
        id_film INTEGER PRIMARY KEY,
        id_acteur INTEGER PRIMARY KEY
    )

    CREATE TABLE FilmCoupDeCoeur(
        id_film INTEGER PRIMARY KEY,
        date TEXT
    )
    `); 
}

// ======================
// == GET INSTRUCTIONS ==
// ======================

async function GetLastDate(){
    const db = await getDB();
    
    const query = `
        SELECT max(date_sortie) as last_date from Film
    `;

    const result = await db.all(query, []);

    return result;
}

// --- FILMS --- 

async function GetFilmsByDate(date){
    const db = await getDB();
    
    const query = `
        SELECT * FROM Film WHERE date_sortie = ?
    `;
    const result = await db.all(query, [date]);

    return result;
}

async function GetFilmsCoupDeCoeurByDate(date){
    const db = await getDB();
    
    const query = `
        SELECT * FROM FilmCoupDeCoeur FC JOIN Film F ON FC.id_film = F.id WHERE date_sortie = ?
    `;
    const result = await db.get(query, [date]);

    return result;
}

async function GetClassement(date){
    const db = await getDB();
    
    const query = `
        SELECT F.nom, COUNT(FA.id_utilisateur) as nb_likes
        FROM film F
        JOIN FilmAime FA ON F.id = FA.id_film
        WHERE F.date_sortie = ?
        GROUP BY F.id
        ORDER BY nb_likes DESC
    `;

    const result = await db.all(query, [date]);

    return result;
}

// --- USER --- 

async function GetUserById(id){
    const db = await getDB();
    
    const query = `
        SELECT * FROM Utilisateur WHERE id = ?
    `;

    const result = await db.get(query, [id]);

    return result;
}


async function GetLikeByUserId(userid){
    const db = await getDB();
    
    const query = `
        SELECT F.* FROM FilmAime FA JOIN Film F on FA.id_film = F.id WHERE FA.id_utilisateur = ?
    `;

    const result = await db.all(query, [userid]);

    return result;
}


// --- ACTEUR ---

async function GetActeursByFilm(idFilm){
    const db = await getDB();
    
    const query = `
        SELECT * FROM FilmActeur FA JOIN Acteur A ON FA.id_acteur = A.id WHERE FA.id_film = ? 
    `;

    const result = await db.all(query, [idFilm]);

    return result;
}


// =========================
// == INSERT INSTRUCTIONS ==
// =========================

async function ajoutUtilisateur(token){
    const db = await getDB();

    const insert = db.prepare(`
        INSERT INTO Utilisateur (token) VALUES (?)
    `);

    insert.run(1,token);
}

async function ajoutFilmAime(id_film, id_utilisateur){
    const db = await getDB();

    const insert = db.prepare(`
        INSERT INTO FilmAime (id_film, id_utilisateur) VALUES (${id_film}, ${id_utilisateur})
    `);
    insert.run(1,id_film);
    insert.run(2,id_utilisateur);

}

async function ajoutFilm(nom, affiche, bande_annonce, critique, nb_etoile, description, realisateur, date_sortie){
    const db = await getDB();
    
    const insert = db.prepare(`
        INSERT INTO Film (nom, affiche, bande_annonce, critique, nb_etoile, description, realisateur, date_sortie) VALUES (${nom}, ${affiche}, ${bande_annonce}, ${critique}, ${nb_etoile}, ${description}, ${realisateur}, ${date_sortie})
    `);

    insert.run(1,nom);
    insert.run(2,affiche);
    insert.run(3,bande_annonce);
    insert.run(4,critique);
    insert.run(5,nb_etoile);
    insert.run(6,description);
    insert.run(7,realisateur);
    insert.run(8,date_sortie);
}

async function ajoutActeur(nom, prenom){
    const db = await getDB();

    const insert = db.prepare(`
        INSERT INTO Acteur (nom, prenom) VALUES (${nom}, ${prenom})
    `);
    insert.run(1,nom);
    insert.run(2,prenom);

}

async function ajoutFilmActeur(id_film, id_acteur){
    const db = await getDB();

    const insert = db.prepare(`
        INSERT INTO FilmActeur (id_film, id_acteur) VALUES (${id_film}, ${id_acteur})
    `);
    insert.run(1,id_film);
    insert.run(2,id_acteur);

}

async function ajoutFilmCoupDeCoeur(id_film, date){
    const db = await getDB();

    const insert = db.prepare(`
        INSERT INTO Film (id_film, date) VALUES (${id_film}, ${date})
    `);
    insert.run(1,id_film);
    insert.run(2,date);

}





// Export our API
module.exports = app;
