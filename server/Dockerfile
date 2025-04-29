# Utiliser une image officielle Node.js
FROM node:20

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire TypeScript (optionnel si tu prévois un build séparé)
# RUN npm run build

# Exposer le port
EXPOSE 5000

# Commande pour démarrer le serveur
CMD ["npm", "run", "dev"]
