<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
    <div class="app-shell">
        <nav class="mini-nav" aria-label="Navigation des vues">
            <RouterLink to="/">Liste</RouterLink>
            <RouterLink to="/carte">Carte</RouterLink>
        </nav>

        <RouterView />
    </div>
</template>

<style scoped>
.app-shell {
    min-height: 100vh;
}

.mini-nav {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1000;
    display: flex;
    gap: 0.4rem;
    padding: 0.35rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #cbd5e1;
    backdrop-filter: blur(6px);
}

.mini-nav a {
    display: inline-block;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    text-decoration: none;
    color: #334155;
    font-size: 0.8rem;
    font-weight: 600;
}

.mini-nav a.router-link-exact-active {
    background: #ee04ff;
    color: #ffffff;
}

@media (min-width: 1024px) {
    .mini-nav {
        top: 1rem;
        left: 1rem;
    }
}
</style>
