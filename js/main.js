import { renderPizzas } from './modules/renderPizzas.js';

export const API_URL = "https://festive-inconclusive-jupiter.glitch.me/api"

const init = () => {
    toppingsToggle();
    renderPizzas();
};

init();
