<script setup>
import ListItem from '@/components/List_item.vue'
import restaurants from '@/restaurants.js'
import { COLORS } from '@/assets/Couleurs/Coulleurs.js'
const listBg = COLORS.cream
</script>

<template>
  <main class="list-view">
    <ListItem
      v-for="restaurant in restaurants"
      :key="restaurant.name"
      :title="restaurant.hook || restaurant.name"
      :image="restaurant.image || ''"
      :badges="restaurant.badges || []"
      :date="restaurant.date || ''"
    >
    </ListItem>
  </main>
</template>

<style scoped>
.list-view {
  min-height: 100vh;
  padding: 15rem 1.25rem 10rem;
  background: v-bind(listBg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.list-view > :deep(.list-item) {
  width: 100%;
  max-width: 600px;
}

@media (min-width: 768px) {
  .list-view {
    padding-bottom: 1.25rem;
  }
}
</style>
