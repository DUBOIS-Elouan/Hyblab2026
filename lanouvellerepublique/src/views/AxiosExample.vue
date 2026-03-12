<template>
  <div class="axios-example p-6 bg-gray-50 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4 text-blue-600">Exemple Axios : Catégories du Restaurant</h1>

    <!-- État de chargement -->
    <div v-if="loading" class="text-gray-500 italic mb-4">
      Chargement des données...
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-red-500 bg-red-100 p-3 rounded mb-4">
      Erreur : {{ error }}
    </div>

    <!-- Affichage des résultats -->
    <div v-else>
      <div v-if="restaurant" class="mb-6">
        <h2 class="text-xl font-semibold border-b pb-2 mb-3">
          Premier Restaurant trouvé : <span class="text-blue-500">{{ restaurant.name }}</span> (ID: {{ restaurant.id }})
        </h2>

        <div v-if="categories && categories.length > 0" class="mt-4">
          <h3 class="font-medium text-lg mb-2 text-gray-700">Catégories du restaurant :</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">{{ formattedCategories }}</pre>

          <div class="mt-4 space-y-2">
            <p v-if="categories[0].cuisine" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mr-2">
              <strong>Cuisine :</strong> {{ categories[0].cuisine }}
            </p>
            <p v-if="categories[0].diet" class="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mr-2">
              <strong>Régime :</strong> {{ categories[0].diet }}
            </p>
            <p v-if="categories[0].client_type" class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full inline-block">
              <strong>Type de client :</strong> {{ categories[0].client_type }}
            </p>
          </div>
        </div>
        <p v-else class="text-orange-500 italic">Aucune catégorie trouvée pour ce restaurant.</p>
      </div>
      <p v-else class="text-orange-500">Aucun restaurant n'a été trouvé.</p>
    </div>

    <!-- Bouton pour recharger -->
    <button
      @click="fetchData"
      class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
    >
      Actualiser les données
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// États réactifs
const restaurant = ref(null);
const categories = ref(null);
const loading = ref(true);
const error = ref(null);

// URL de base de l'API (à adapter selon la configuration)
const API_BASE_URL = 'http://localhost:3000/api/restaurant';

/**
 * Fonction principale pour récupérer les données
 */
const fetchData = async () => {
  loading.value = true;
  error.value = null;

  try {
    // 1. Récupérer d'abord la liste de tous les restaurants pour avoir l'ID du premier
    console.log('Récupération de la liste des restaurants...');
    const restaurantsRes = await axios.get(API_BASE_URL);

    if (restaurantsRes.data && restaurantsRes.data.length > 0) {
      restaurant.value = restaurantsRes.data[0];
      const firstId = restaurant.value.id;

      // 2. Faire une deuxième requête pour obtenir les catégories du premier restaurant
      console.log(`Récupération des catégories pour le restaurant ID: ${firstId}...`);
      const categoriesRes = await axios.get(`${API_BASE_URL}/getRestaurantCat/${firstId}`);

      categories.value = categoriesRes.data;
      console.log('Données reçues avec succès !', categories.value);
    } else {
      error.value = "Aucun restaurant n'a été trouvé dans la base de données.";
    }
  } catch (err) {
    console.error('Erreur lors de la requête Axios :', err);
    error.value = err.message || "Une erreur est survenue lors de la communication avec l'API.";
  } finally {
    loading.value = false;
  }
};

// Formater les catégories pour l'affichage JSON
const formattedCategories = computed(() => {
  return JSON.stringify(categories.value, null, 2);
});

// Appeler fetchData au montage du composant
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Ajoute des styles supplémentaires si nécessaire */
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
