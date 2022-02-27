import { checkAuth, logout, fetchItem, addCart, getUser } from '../fetch-utils.js';
import { renderItem } from '../render.utils.js';

const itemEl = document.getElementById('test');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayItem() {
    const item = await fetchItem();

    for (let i of item) {
        console.log('i', i);
        const iEl = renderItem(i);
        iEl.addEventListener('click', async () => {
            const newItem = { customer_id: getUser().id, product_id: i.id };
            await addCart(newItem);
            console.log(getUser().id);
        });
        itemEl.append(iEl);
    }
    return itemEl;
}
displayItem();
