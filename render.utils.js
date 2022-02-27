export function renderItem(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = item.name;

    div.append(p);
    return div;
}
