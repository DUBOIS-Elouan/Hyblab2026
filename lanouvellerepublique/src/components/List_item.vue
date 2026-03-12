<template>
    <div class="list-item">
        <img v-if="image" :src="image" :alt="title" class="list-item-image" />
        <div v-if="date" class="date-badge">{{ date }}</div>
        <div class="list-item-content">
            <h3 class="title">{{ title }}</h3>
        </div>
        <div v-if="badges.length" class="badges-panel">
            <span v-for="badge in badges" :key="badge" class="badge">
                {{ badge }}
            </span>
        </div>
        <slot />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Item Title'
    },
    image: {
        type: String,
        default: ''
    },
    badges: {
        type: Array,
        default: () => []
    },
    date: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
.list-item {
    display: flex;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;
    position: relative;
    overflow: hidden;
    border: 2px solid #222;
    border-radius: 14px;
    max-width: 320px;
    width: 100%;
    background: #d8d8d8;
}

.list-item-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.list-item-content {
    position: absolute;
    left: 0.55rem;
    right: 0.55rem;
    bottom: 3.1rem;
    background: #ffffff;
    border-radius: 10px;
    padding: 0.85rem 0.7rem;
}

.date-badge {
    position: absolute;
    top: 0.55rem;
    left: 0.55rem;
    z-index: 1;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}

.title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 700;
}

.badges-panel {
    position: absolute;
    left: 0.55rem;
    right: 0.55rem;
    bottom: 0.55rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.badge {
    display: inline-flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid #95bfa2;
    background: #ecf8f0;
    color: #1f5f36;
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
}
</style>