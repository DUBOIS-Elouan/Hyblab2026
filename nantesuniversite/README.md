# Descriptif du projet

Porteur de projet :

Sujet :

Nom d'équipe :

Participants : 

- EDNA :
- Polytech :  



## A supprimer

Ces instructions ne sont la que pour vous guider dans le développement de vos pages web. Elles seront à supprimer pour la soumission finale de votre code.

Le dossier de votre projet contient un squelette de code que vous devez modifier. 

- La partie `serveur.js`  ne doit a priori pas être touchée, si vous avez des entrées d'API à ajouter il faudra le faire dans le dossier `api`.
- Le dossier `public`  contient la partie statique de votre site. Par défaut le fichier index.html charge un fichier `style.css` qui est destiné au format mobile (portrait). Si votre porteur de projet demande un site desktop, vous pouvez vous baser sur l'exemple `index-desktop.html` et le CSS associé `style-desktop.css` qui propose une page au format paysage.

Veuillez noter que le code fourni dans `public` n'est qu'un code d'exemple. Vous pouvez totalement le remplacer si c'est plus simple pour vous. Le code proposé fournit cependant une solution relativement simple pour gérer la variabilité des rapports hauteur:largeur en format desktop et mobile.

## Instructions de déploiement

Si votre projet nécessite des instructions spécifiques pour son déploiement, merci d'ajouter des explications ici.

## Frontend (React + Vite + TailwindCSS)

Le frontend React se trouve dans le dossier `frontend/`. Le build est généré dans `public/` et servi par le serveur Express.

### Prérequis

- Node.js >= 18
- npm

### Développement local

```bash
# Installer les dépendances
cd frontend
npm install

# Lancer le serveur de développement Vite (hot-reload)
npm run dev
# L'app est accessible sur http://localhost:5173/nantesuniversite/
```

> Note : en mode `dev`, le serveur Vite tourne indépendamment du serveur Express. Pour tester l'intégration complète avec l'API, lancez aussi le serveur principal (voir ci-dessous) et buildez le frontend.

### Build de production

```bash
cd frontend
npm run build
# Les fichiers sont générés dans ../public/
```

Le dossier `public/` est ensuite servi automatiquement par le serveur Express (`server.js`).

### Lancer le serveur Express (depuis la racine du projet Hyblab2026)

```bash
# Depuis la racine du monorepo (Hyblab2026/)
npm install   # si pas encore fait
npm start     # ou node server.js selon la configuration
# L'app est accessible sur http://localhost:8080/nantesuniversite/
```
