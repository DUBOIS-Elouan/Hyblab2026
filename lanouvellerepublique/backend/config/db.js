import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../data/data.json');

let db = {};

async function loadDatabase() {
  try {
    const data = await readFile(DATA_PATH, 'utf-8');
    db = JSON.parse(data);
    console.log('Données JSON chargées avec succès.');
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err.message);
    db = {
      Article: [],
      Section: [],
      Image: [],
      Restaurant: [],
      Social_media: [],
      Diet: [],
      Cuisine_type: [],
      Client_type: [],
      Service: []
    };
  }
}

await loadDatabase();

export default db;
