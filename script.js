const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
const products = {
  original: {name: 'Coca-Cola Original', line: 'Original', eyebrow: 'O CLÁSSICO É SEMPRE UMA BOA IDEIA', description: 'Aquele sabor inconfundível que transforma uma pausa em um bom momento. Combine com sua comida favorita e com quem faz seu dia melhor.', tags: ['Sabor original', 'Com açúcar'], image: 'assets/coca-cola-original.png'},
  zero: {name: 'Coca-Cola Sem Açúcar', line: 'Sem Açúcar', eyebrow: 'TODO O SABOR. ZERO AÇÚCAR.', description: 'Uma escolha sem açúcar para acompanhar seus encontros, suas refeições e suas pequenas pausas. Abra uma gelada e aproveite o momento.', tags: ['Sabor Coca-Cola', 'Sem açúcar'], image: 'assets/coca-cola-zero.png'}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectFlavor(tab) {
  const product = products[tab.dataset.flavor];
  tabs.forEach(item => {item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1;});
  document.querySelector('#product-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#product-title').replaceChildren(document.createTextNode('Coca-Cola'), document.createElement('br'), document.createTextNode(product.line));
  document.querySelector('#product-description').textContent = product.description;
  document.querySelector('#product-eyebrow').textContent = product.eyebrow;
  const image = document.querySelector('#product-image'); image.src = product.image; image.alt = product.name;
  document.querySelector('.stage-word').textContent = tab.dataset.flavor === 'zero' ? 'Zero' : 'Original';
  document.querySelector('#product-tags').replaceChildren(...product.tags.map(label => {const span = document.createElement('span');span.textContent = label;return span;}));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFlavor(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {event.preventDefault(); tabs[next].focus(); selectFlavor(tabs[next]);}
  });
});
