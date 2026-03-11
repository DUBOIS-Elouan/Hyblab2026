const pinData = {
    E1: { left: 20, top: 25 },
    E2: { left: 38, top: 48 },
    E3: { left: 55, top: 30 },
    E4: { left: 73, top: 40 },
    E5: { left: 60, top: 55 },
    V1: { left: 3, top: 18},
    V2: { left: 20, top: 21},
    V3: { left: 40, top: 55},
    V4: { left: 47.5, top: 72.5},
    V5: { left: 72.5, top: 23},
    V6: { left: 75, top: 45},
    V7: { left: 87, top: 37},
};

const img = document.getElementById("regionMap");
const mapWrapper = document.getElementById("mapWrapper");

function getImageRenderedRect() {
    const rect = img.getBoundingClientRect();
    const naturalRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = rect.width / rect.height;

    let renderedW, renderedH, offsetX, offsetY;

    if (containerRatio > naturalRatio) {
        // Bandes sur les côtés
        renderedH = rect.height;
        renderedW = renderedH * naturalRatio;
        offsetX = (rect.width - renderedW) / 2;
        offsetY = 0;
    } else {
        // Bandes en haut/bas
        renderedW = rect.width;
        renderedH = renderedW / naturalRatio;
        offsetX = 0;
        offsetY = (rect.height - renderedH) / 2;
    }

    return { renderedW, renderedH, offsetX, offsetY };
}

function placePins() {
    const { renderedW, renderedH, offsetX, offsetY } = getImageRenderedRect();

    for (const [id, coords] of Object.entries(pinData)) {
        const pin = document.getElementById(id);
        if (!pin) continue;

        pin.style.left = offsetX + (coords.left / 100) * renderedW + "px";
        pin.style.top  = offsetY + (coords.top  / 100) * renderedH + "px";
    }
}

img.addEventListener("load", placePins);
window.addEventListener("resize", placePins);
if (img.complete) placePins();