<template>
  <article
    class="detail-box"
    :class="{ 'detail-box--active': props.isActive }"
    role="textbox"
    tabindex="0"
  >
    <p class="mini-box__coords">
        {{ content }}'' 
    </p>
  </article>
</template>

<script setup>

const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.detail-box {
  display: flex;
  align-items: top;
  
}
</style>