import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import restaurantsData from '@/restaurants.js'

export const useFilterStore = defineStore('filterStore', () => {
  // État des filtres
  const filters = ref({
    coupDeCoeur: false,
    dietary: [],
    cuisine: [],
    ambiance: [],
    budget: [],
    service: [],
  })

  // Liste des restaurants avec leurs catégories (enrichis de l'API)
  const restaurantsWithCategories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Récupérer les catégories pour chaque restaurant via l'API
  const fetchRestaurantCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // Enrichir chaque restaurant avec ses catégories
      const enriched = await Promise.all(
        restaurantsData.map(async (restaurant) => {
          try {
            // Essayer de récupérer les catégories via l'API
            const res = await axios.get(`http://localhost:3000/api/restaurant/getRestaurantCat/${restaurant.id || restaurant.name}`)
            return {
              ...restaurant,
              categories: res.data || [],
            }
          } catch (err) {
            // Si l'API ne répond pas, retourner le restaurant sans catégories
            console.warn(`Categories not found for ${restaurant.name}`, err)
            return {
              ...restaurant,
              categories: [],
            }
          }
        })
      )
      restaurantsWithCategories.value = enriched
    } catch (err) {
      console.error('Error fetching restaurant categories:', err)
      error.value = err.message
      // Fallback : utiliser les restaurants locaux sans catégories
      restaurantsWithCategories.value = restaurantsData.map((r) => ({
        ...r,
        categories: [],
      }))
    } finally {
      loading.value = false
    }
  }

  // Appliquer les filtres
  const applyFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Réinitialiser les filtres
  const clearFilters = () => {
    filters.value = {
      coupDeCoeur: false,
      dietary: [],
      cuisine: [],
      ambiance: [],
      budget: [],
      service: [],
    }
  }

  // Restaurants filtrés (computed)
  const filteredRestaurants = computed(() => {
    return restaurantsWithCategories.value.filter((restaurant) => {
      const categories = restaurant.categories[0] || {}

      // Filtre: Coup de Cœur (si on l'implémente comme un champ booléen dans les données)
      if (filters.value.coupDeCoeur && !restaurant.coupDeCoeur) {
        return false
      }

      // Filtre: Préférences alimentaires (diet)
      if (filters.value.dietary.length > 0) {
        const hasDiet = categories.diet && filters.value.dietary.includes(categories.diet)
        if (!hasDiet) return false
      }

      // Filtre: Type de cuisine
      if (filters.value.cuisine.length > 0) {
        const hasCuisine = categories.cuisine && filters.value.cuisine.includes(categories.cuisine)
        if (!hasCuisine) return false
      }

      // Filtre: Ambiance (client_type)
      if (filters.value.ambiance.length > 0) {
        const hasAmbiance = categories.client_type && filters.value.ambiance.includes(categories.client_type)
        if (!hasAmbiance) return false
      }

      // Filtre: Budget (à mapper selon la structure API)
      if (filters.value.budget.length > 0) {
        // À implémenter selon la structure des données
      }

      // Filtre: Service (à mapper selon la structure API)
      if (filters.value.service.length > 0) {
        // À implémenter selon la structure des données
      }

      return true
    })
  })

  return {
    filters,
    restaurantsWithCategories,
    filteredRestaurants,
    loading,
    error,
    fetchRestaurantCategories,
    applyFilters,
    clearFilters,
  }
})
