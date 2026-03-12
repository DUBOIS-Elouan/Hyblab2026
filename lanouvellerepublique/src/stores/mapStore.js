import { computed } from "vue"
import { useGeolocation } from "@vueuse/core"

const { coords } = useGeolocation()

export const userCoords = computed(() => {
    const { latitude, longitude } = coords.value
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        return [latitude, longitude]
    }
    return null
})
