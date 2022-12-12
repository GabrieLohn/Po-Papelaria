const carrinhoArea = sel(".carrinho-area");

let cart = [];
let modalKey = 0;
let modalQt = 1;
let carrinhoPrice = 0;

const setcarrinhoItemDOM = (carrinho, index) => {
  const carrinhoItem = `
    <div class="carrinho-item" data-key=${index}>
      <div class="carrinho-item--img"><img src=${carrinho.img} /></div>
      <a href="" class="carrinho-item--link">
        <div class="carrinho-item--add" onclick="Modal.opencarrinhoItem(event)">+</div>
      </a>
      <div class="carrinho-item--price">R$ ${formatPrice(carrinho.prices[0])}</div>
      <div class="carrinho-item--name">${carrinho.name}</div>
      <div class="carrinho-item--desc">${carrinho.description}</div>
    </div>`;

  return carrinhoItem;
};

carrinhoList.forEach((carrinho, index) => {
  const carrinhoItem = setcarrinhoItemDOM(carrinho, index);
  carrinhoArea.innerHTML += carrinhoItem;
});

Modal.setQuantityEvents();
Modal.setAddToCartEvent();
Cart.setMenuMobileEvents();

function formatPrice(price) {
  return (price.toFixed(2)).toString().replace(".", ",");
}

