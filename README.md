# 🎥 Dashboard YouTube Personnalisé

Bienvenue sur le **Dashboard YouTube Personnalisé** ! Ce projet est un tableau de bord statique et réactif (HTML/CSS/JS) qui affiche les dernières vidéos de vos chaînes YouTube préférées en un seul endroit.

## 🚀 Démarrage Rapide

### 1. Prérequis

Pour que ce tableau de bord fonctionne, vous devez :
1. Avoir une **Clé API Google/YouTube Data v3**.
2. Récupérer les **IDs de chaîne** (Channel IDs) des YouTubers que vous souhaitez suivre.

### 2. Configuration du Projet

1.  **Clonez le dépôt :**

2.  **Modifiez le fichier `script.js` :**
    Ouvrez le fichier `script.js` et remplacez les valeurs des deux constantes suivantes :

    ```javascript
    // ⚠️ 1. REMPLACEZ PAR VOTRE CLÉ API YOUTUBE
    const API_KEY = 'VOTRE_CLE_API_YOUTUBE_ICI'; 

    // ⚠️ 2. LISTE DES IDs DE CHAÎNES YOUTUBE
    const CHANNEL_IDS = [
        'ID_CHAINE_1', 
        'ID_CHAINE_2', 
        // ... ajoutez vos IDs ici
    ];
    ```

3.  **Déployez sur GitHub Pages :**
    Poussez vos modifications sur GitHub. Le déploiement via GitHub Pages rendra votre dashboard accessible à l'URL : `https://[votre-username].github.io/[nom-du-repo]/`.

***

## 🔒 Avertissement Sécurité de la Clé API (TRÈS IMPORTANT !)

Ce projet est une application **front-end** (côté client). Cela signifie que votre clé API est chargée et visible dans le code JavaScript de n'importe quel visiteur qui inspecte la page.

### 🔑 La Clé API est Privée et Restreinte

**Ne laissez jamais votre clé API YouTube sans restriction !** Une clé non restreinte peut être copiée et utilisée par des tiers, entraînant un épuisement de votre quota journalier et des frais potentiels.

Pour assurer que **seul votre tableau de bord** puisse utiliser cette clé :

1.  **Restreignez la clé** dans la console Google Cloud.
2.  Accédez à **APIs & Services > Credentials** et éditez votre clé.
3.  Sous **Application restrictions**, sélectionnez **HTTP referrers (web sites)**.
4.  Ajoutez l'URL de votre site GitHub Pages à la liste blanche des référents.

**Exemple de restriction d'URL :**
Si votre site est `https://john-doe.github.io/youtube-dashboard/`, ajoutez :   https://john-doe.github.io/youtube-dashboard/*

**Grâce à cette restriction, même si quelqu'un copie votre clé, elle ne fonctionnera sur aucun autre site, assurant ainsi que seul vous (via votre propre tableau de bord) pouvez l'utiliser.**

***

## ⚙️ Structure des Fichiers

| Fichier | Rôle |
| :--- | :--- |
| `index.html` | La structure de la page web. |
| `style.css` | Le style (mise en page, couleurs, responsive design). |
| `script.js` | La logique pour appeler l'API YouTube et afficher les vidéos. |
| `README.md` | Ce document. |
