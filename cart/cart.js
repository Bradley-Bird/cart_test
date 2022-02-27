import { checkAuth, fetchCart } from '../fetch-utils.js';
import { renderItem } from '../render.utils.js';

const itemEl = document.getElementById('test');

checkAuth();

async function displayCart() {
    const cart = await fetchCart();
    console.log('cart', cart);

    for (let item of cart) {
    }
}
displayCart();
