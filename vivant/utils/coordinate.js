
/**
 * 
 * @param {string} city 
 * @returns {Object} {latitude, longitude}
 */
async function getCoordinates(city){
    const url = `https://api-adresse.data.gouv.fr/search/?q=${city}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.features[0].geometry.coordinates)
    return data.features[0].geometry.coordinates;
}

getCoordinates("Nantes")