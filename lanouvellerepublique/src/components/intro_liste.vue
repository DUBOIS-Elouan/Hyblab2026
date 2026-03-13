<script setup>
import tmvIcon from '@/assets/Icones/tmv.svg'
import { COLORS } from '@/assets/Couleurs/Coulleurs.js'

const pink = COLORS.pinkSwitch
</script>

<template>
	<section class="intro-liste" aria-label="Introduction de la liste">
		<div class="intro-liste__tagbox">
			<span class="intro-liste__bubble">Les restos</span>
			<img class="intro-liste__logo" :src="tmvIcon" alt="Logo TMV" />
		</div>

		<div class="intro-liste__content">
			<div class="intro-liste__bar" aria-hidden="true"></div>
			<p>
				Envie de voyager (surtout dans votre assiette) ?
				<br />
				TMV vous écrit au dos d'une carte postale dénichée dans un quartier de Tours. Du bistrot
				généreux à la petite table secrète, on vous partage nos bons plans et chroniques resto pour
				vous faire découvrir les adresses sympas et gourmandes de la ville.
				<br />
				Glissez ce mot dans votre poche, votre prochaine escale est ici !
			</p>
		</div>
	</section>
</template>

<style scoped>
.intro-liste {
	position: relative;
	width: 100%;
	max-width: 600px;
	margin: 0 auto 0.75rem;
	padding-top: 1.35rem;
}

.intro-liste__content {
	position: relative;
	background: #ffffff;
	border: none;
	border-radius: 18px;
	padding: 2.05rem 1.3rem 1.4rem;
	text-align: left;
	color: #1f2430;
	line-height: 1.65;
	font-size: 1.08rem;
}

.intro-liste__content::before {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: inherit;
	padding: 6px;
	background:
		repeating-linear-gradient(90deg, v-bind(pink) 0 30px, transparent 30px 44px) top / 44px 6px repeat-x,
		repeating-linear-gradient(90deg, v-bind(pink) 0 30px, transparent 30px 44px) bottom / 44px 6px repeat-x,
		repeating-linear-gradient(0deg, v-bind(pink) 0 30px, transparent 30px 44px) left / 6px 44px repeat-y,
		repeating-linear-gradient(0deg, v-bind(pink) 0 30px, transparent 30px 44px) right / 6px 44px repeat-y;
	-webkit-mask:
		linear-gradient(#000 0 0) content-box,
		linear-gradient(#000 0 0);
	-webkit-mask-composite: xor;
	mask-composite: exclude;
	pointer-events: none;
}

.intro-liste__tagbox {
	position: absolute;
	top: 0;
	left: 1rem;
	transform: translateY(24%) rotate(-2.4deg);
	transform-origin: left center;
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	gap: 0.7rem;
	width: clamp(205px, 60%, 330px);
	padding: 0.62rem 1.4rem 0.62rem 1rem;
	background: #ffffff;
	border: none;
	border-radius: 12px;
	box-shadow: 0 8px 18px rgba(232, 21, 178, 0.22), 0 3px 6px rgba(15, 23, 42, 0.08);
	z-index: 2;
}

.intro-liste__bubble {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	padding: 0.3rem 0.78rem;
	border-radius: 999px;
	background: transparent;
	border: 2px solid #ffffff;
	color: v-bind(pink);
	font-size: 1.24rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.03em;
}

.intro-liste__logo {
	display: inline-block;
	height: 31px;
	width: auto;
	margin-left: -22px;
}

.intro-liste__bar {
	width: 82px;
	height: 5px;
	border-radius: 999px;
	background: v-bind(pink);
	margin-bottom: 1rem;
}

.intro-liste p {
	margin: 0;
}

@media (min-width: 768px) {
	.intro-liste__content {
		padding: 2.2rem 1.6rem 1.5rem;
	}
}
</style>
