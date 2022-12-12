const Cart = {
  cartElement: sel("aside"),
  cartcarrinhos: sel(".cart"),
  subtotalElement: sel(".cart-value-subtotal"),
  descontoElement: sel(".cart-value-desconto"),
  totalElement: sel(".cart-value-total"),
  subtotal: 0,
  desconto: 0,
  total: 0,

  setcarrinhoItemDOM(carrinhoItem, cartIndex) {
    const carrinhoInfo = Cart.setcarrinhoSizeName(carrinhoItem, cart[cartIndex]);
    const carrinhoName = `${carrinhoItem.name} ${carrinhoInfo}`;

    const cartItem = `
    <div class="cart--item">
      <img src=${carrinhoItem.img} />
      <div class="cart--item-nome">${carrinhoName}</div>
      <div class="cart--item--qtarea">
        <button class="cart--item-qtmenos" onclick="Cart.removeCartItem(${cartIndex})">-</button>
        <div class="cart--item--qt">${cart[cartIndex].qt}</div>
        <button class="cart--item-qtmais" onclick="Cart.addCartItem(${cartIndex})">+</button>
      </div>
    </div>`;

    return cartItem;
  },

  setcarrinhoSizeName(carrinhoItem, cartItem) {
    let carrinhoInfo;
    let carrinhoPrice;

    switch (cartItem.sizeIndex) {
      case 0:
        carrinhoPrice = carrinhoItem.prices[0];
        carrinhoInfo = `(P)<br>R$ ${formatPrice(carrinhoPrice)}`;
        break;
      case 1:
        carrinhoPrice = carrinhoItem.prices[1];
        carrinhoInfo = `(V)<br>R$ ${formatPrice(carrinhoPrice)}`;
        break;
      case 2:
        carrinhoPrice = carrinhoItem.prices[2];
        carrinhoInfo = `(V)<br>R$ ${formatPrice(carrinhoPrice)}`;
        break;
      case 3:
        carrinhoPrice = carrinhoItem.prices[3];
        carrinhoInfo = `(A)<br>R$ ${formatPrice(carrinhoPrice)}`;
        break;
    }

    Cart.subtotal += carrinhoPrice * cartItem.qt;
    return carrinhoInfo;
  },

  addCartItem(cartIndex) {
    cart[cartIndex].qt++;
    Cart.update();
  },

  removeCartItem(cartIndex) {
    if (cart[cartIndex].qt > 1) {
      cart[cartIndex].qt--;
    } else {
      cart.splice(cartIndex, 1);
    }

    Cart.update();
  },

  update() {
    // Mobile Cart
    sel(".menu-openner span").innerHTML = cart.length;

    if (cart.length > 0) {
      // reset cart to update
      Cart.reset();
      Cart.cartElement.classList.add("show");

      cart.forEach((cartItem, cartIndex) => {
        // find the object carrinho from cart
        let carrinhoItem = carrinhoList.find(carrinho => carrinho.id === cartItem.id);

        const carrinhoItemElement = Cart.setcarrinhoItemDOM(carrinhoItem, cartIndex);
        Cart.cartcarrinhos.innerHTML += carrinhoItemElement;
      });

      Cart.setValues();
    } else {
      Cart.cartElement.classList.remove("show");
      Cart.cartElement.style.left = "100vw";
    }
  },

  reset() {
    Cart.cartcarrinhos.innerHTML = "";
    Cart.subtotal = 0;
    Cart.desconto = 0;
    Cart.total = 0;
  },

  setValues() {
    Cart.desconto = Cart.subtotal * 0.1;
    Cart.total = Cart.subtotal - Cart.desconto;

    Cart.subtotalElement.innerHTML = `R$ ${formatPrice(Cart.subtotal)}`;
    Cart.descontoElement.innerHTML = `R$ ${formatPrice(Cart.desconto)}`;
    Cart.totalElement.innerHTML = `R$ ${formatPrice(Cart.total)}`;
  },

  setMenuMobileEvents() {
    sel(".menu-openner").addEventListener("click", () => {
      if (cart.length > 0) {
        sel("aside").style.left = "0";
      }
    });

    sel(".menu-closer").addEventListener("click", () => {
      sel("aside").style.left = "100vw";
    });
  },
};
