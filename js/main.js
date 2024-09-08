import { renderPizzas } from './modules/renderPizzas.js';
import { renderToppings } from './modules/renderToppings.js';
import { toppingsToggle } from './modules/toppingsToggle.js';

export const API_URL = "https://festive-inconclusive-jupiter.glitch.me/api"

const init = () => {
    toppingsToggle();
    renderToppings();
    renderPizzas();
};

init();
