const API_KEY = 'AIzaSyCBfBhdZkbTTsxxNbDgpKo_0Xl--tDPBDA';

const CHANNEL_IDS = [
    'UCYnvxJ-PKiGXo_tYXpWAC-w', // Micode
    'UCdV6JBe40vqPQOsG4boS5zQ', // TRY
];

const MAX_RESULTS_PER_CHANNEL = 5; // Nombre de vidéos à récupérer par chaîne

const dashboardContainer = document.getElementById('video-dashboard');

/**
 * Construit l'URL d'appel à l'API YouTube pour une chaîne spécifique.
 * On utilise l'endpoint `search` pour récupérer les dernières vidéos d'une chaîne.
 */
function getApiUrl(channelId) {
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const params = new URLSearchParams({
        key: API_KEY,
        channelId: channelId,
        part: 'snippet',
        order: 'date', // Trie par date de publication (les plus récentes d'abord)
        type: 'video', // Assure qu'on récupère uniquement des vidéos
        maxResults: MAX_RESULTS_PER_CHANNEL,
    });
    return `${baseUrl}?${params.toString()}`;
}

/**
 * Formate la date de publication.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Crée l'élément HTML pour une vidéo.
 */
function createVideoCard(video) {
    const videoId = video.id.videoId;
    const { title, channelTitle, publishedAt, thumbnails } = video.snippet;
    const thumbnailUrl = thumbnails.medium ? thumbnails.medium.url : 'placeholder.jpg'; // Utilise la miniature moyenne

    const card = document.createElement('div');
    card.className = 'video-card';

    // Utilisation d'un lien pour rendre toute la carte cliquable
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
    link.target = '_blank'; // Ouvre la vidéo dans un nouvel onglet

    link.innerHTML = `
        <img src="${thumbnailUrl}" alt="Vignette de la vidéo: ${title}" class="video-thumbnail">
        <div class="video-info">
            <h3>${title}</h3>
            <p class="channel-name">${channelTitle}</p>
            <p>Publié le ${formatDate(publishedAt)}</p>
        </div>
    `;

    card.appendChild(link);
    return card;
}

/**
 * Fonction principale pour récupérer et afficher les vidéos.
 */
async function loadVideos() {
    dashboardContainer.innerHTML = ''; // Vide le message de chargement

    const allVideos = [];
    const fetchPromises = CHANNEL_IDS.map(async (channelId) => {
        try {
            const url = getApiUrl(channelId);
            const response = await fetch(url);

            if (!response.ok) {
                // Lance une erreur pour la gestion dans le catch
                throw new Error(`Erreur HTTP: ${response.status} pour la chaîne ${channelId}`);
            }

            const data = await response.json();
            
            // Ajoute les vidéos récupérées à notre liste globale
            allVideos.push(...data.items);
        } catch (error) {
            console.error(`Impossible de charger les vidéos pour la chaîne ${channelId}:`, error);
            // On peut ignorer cette chaîne et continuer avec les autres
        }
    });

    // Attend que toutes les requêtes soient terminées
    await Promise.all(fetchPromises);

    if (allVideos.length === 0) {
        dashboardContainer.innerHTML = '<p class="error">Impossible de charger les vidéos. Vérifiez la clé API et les IDs de chaînes.</p>';
        return;
    }

    // Trie toutes les vidéos par date de publication (du plus récent au plus ancien)
    allVideos.sort((a, b) => {
        return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
    });

    // Affiche toutes les vidéos triées
    allVideos.forEach(video => {
        const card = createVideoCard(video);
        dashboardContainer.appendChild(card);
    });
}

// Démarre le chargement des vidéos au chargement de la page
loadVideos();
