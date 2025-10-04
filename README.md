# 🎬 MobileFlix

Une application mobile moderne pour découvrir et explorer les films, développée avec React Native et Expo.

## 📱 Fonctionnalités

- **Découverte de films** : Explorez les derniers films et les tendances du moment
- **Recherche avancée** : Trouvez facilement vos films préférés
- **Interface intuitive** : Design moderne avec animations fluides
- **Gestion des favoris** : Sauvegardez vos films préférés
- **Onboarding** : Guide d'introduction pour les nouveaux utilisateurs
- **Support multiplateforme** : Android, iOS et Web

## 🚀 Technologies utilisées

- **React Native** 19.1.0 - Framework mobile
- **Expo** ~54.0.8 - Plateforme de développement
- **TypeScript** ~5.9.2 - Typage statique
- **NativeWind** ^4.2.1 - Styling avec Tailwind CSS
- **React Navigation** - Navigation entre écrans
- **Appwrite** - Backend as a Service
- **Expo Router** - Routage file-based

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI
- Compte Expo (pour le développement)

## 🛠️ Installation

1. **Cloner le projet**

   ```bash
   git clone https://github.com/kenryalonzo/App.MovieFlix.git
   cd mobile_movie_app
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env` à la racine du projet avec vos configurations Appwrite :

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npx expo start
   ```

## 📱 Utilisation

### Développement

- **Android** : `npm run android` ou scanner le QR code avec Expo Go
- **iOS** : `npm run ios` ou scanner le QR code avec Expo Go
- **Web** : `npm run web`

### Build de production

```bash
npx expo build:android
npx expo build:ios
```

## 📂 Structure du projet

```
mobile_movie_app/
├── app/                    # Code principal de l'application
│   ├── (tabs)/            # Onglets principaux
│   ├── _layout.tsx        # Layout racine
│   └── onboarding.tsx     # Écran d'onboarding
├── components/            # Composants réutilisables
│   ├── MovieCard.tsx      # Carte de film
│   ├── SearchBar.tsx      # Barre de recherche
│   └── onboarding/        # Composants d'onboarding
├── services/              # Services API et Appwrite
├── constants/             # Constantes et configurations
├── assets/                # Images, icônes et polices
└── types/                 # Définitions TypeScript
```

## 🎨 Fonctionnalités principales

### Écran d'accueil

- Affichage des films tendance
- Grille des derniers films
- Recherche rapide

### Recherche

- Recherche par titre
- Filtres avancés
- Résultats en temps réel

### Profil utilisateur

- Gestion des films sauvegardés
- Paramètres personnalisés

## 🔧 Scripts disponibles

- `npm start` - Démarrer le serveur de développement
- `npm run android` - Lancer sur Android
- `npm run ios` - Lancer sur iOS
- `npm run web` - Lancer sur le web
- `npm run lint` - Vérifier le code avec ESLint
- `npm run reset-project` - Réinitialiser le projet

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Développé par [kenryalonzo](https://github.com/kenryalonzo)

---

⭐ Si vous aimez ce projet, n'oubliez pas de lui donner une étoile !
