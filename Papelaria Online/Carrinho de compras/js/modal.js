//* Encapsulate Selectors comands
const sel = el => document.querySelector(el);
const all = el => document.querySelectorAll(el);

const Modal = {
  carrinhoModal: sel(".carrinho-modal"),
  carrinhoSizeList: all(".carrinho-info--size"),
  addcarrinhoElement: sel(".carrinho-info--qtmais"),
  removecarrinhoElement: sel(".carrinho-info--qtmenos"),
  addToCartButton: sel(".carrinho-info--addButton"),

  opencarrinhoItem(event) {
    event.preventDefault();

    Modal.setcarrinhoItemDOM(event);
    Modal.open();
  },

  open() {
    Modal.carrinhoModal.style.opacity = 0;
    Modal.carrinhoModal.style.display = "flex";
    setTimeout(() => {
      Modal.carrinhoModal.style.opacity = 1;
    }, 200);
  },

  close() {
    Modal.carrinhoModal.style.opacity = 0;
    setTimeout(() => {
      Modal.carrinhoModal.style.display = "none";
    }, 500);
  },

  setcarrinhoItemDOM(e) {
    let carrinhoIndex = e.target.closest(".carrinho-item").getAttribute("data-key");
    modalKey = carrinhoIndex;
    modalQt = 1; // initial carrinho qtd

    sel(".carrinho-modal-img").src = carrinhoList[carrinhoIndex].img;
    sel(".carrinho-info h1").innerHTML = carrinhoList[carrinhoIndex].name;
    sel(".carrinho-info--desc").innerHTML = carrinhoList[carrinhoIndex].description;
    sel(".carrinho-info--actualPrice").innerHTML = `R$ ${formatPrice(
      carrinhoList[carrinhoIndex].prices[0]
    )}`;

    sel(".carrinho-info--qt").innerHTML = modalQt;

    Modal.setcarrinhoPrices(carrinhoIndex);
  },

  setcarrinhoPrices(carrinhoIndex) {
    Modal.carrinhoSizeList.forEach((size, sizeIndex) => {
      // initial -> carrinho G
      if (sizeIndex === 0)Modal.setSelectedSize(size);
      carrinhoPrice = carrinhoList[Number(carrinhoIndex)].prices[sizeIndex];

      size.addEventListener("click", () => {
        Modal.setSelectedSize(size);

        carrinhoPrice = carrinhoList[Number(carrinhoIndex)].prices[sizeIndex];
        sel(".carrinho-info--actualPrice").innerHTML = `R$ ${formatPrice(
          carrinhoPrice * modalQt
        )}`;
      });

      size.querySelector("span").innerHTML =
        carrinhoList[carrinhoIndex].sizes[sizeIndex];
    });
  },

  setSelectedSize(size) {
    sel(".carrinho-info--size.selected").classList.remove("selected");
    size.classList.add("selected");
  },

  setQuantityEvents() {
    // seting the quantity buttons
    Modal.removecarrinhoElement.addEventListener("click", () => {
      if (modalQt > 1) {
        modalQt--;
        sel(".carrinho-info--qt").innerHTML = modalQt;

        sel(".carrinho-info--actualPrice").innerHTML = `R$ ${formatPrice(
          carrinhoPrice * modalQt
        )}`;
      }
    });

    Modal.addcarrinhoElement.addEventListener("click", () => {
      if (modalQt < 50) {
        // max = 50 carrinhos
        modalQt++;
        sel(".carrinho-info--qt").innerHTML = modalQt;

        sel(".carrinho-info--actualPrice").innerHTML = `R$ ${formatPrice(
          carrinhoPrice * modalQt
        )}`;
      }
    });
  },

  //* Add to Cart
  setAddToCartEvent() {
    Modal.addToCartButton.addEventListener("click", () => {
      // get selected size
      const sizeIndex = parseInt(
        sel(".carrinho-info--size.selected").getAttribute("data-key")
      );

      // id@size = identifier
      const identifier = carrinhoList[modalKey].id + "@" + sizeIndex;
      const key = cart.findIndex(item => item.identifier == identifier);

      //* if it is already in cart
      if (key > -1) cart[key].qt += modalQt;

      //* if it is already in cart
      if (key === -1) {
        const cartItem = {
          identifier,
          id: carrinhoList[modalKey].id,
          sizeIndex,
          qt: modalQt,
        };

        cart.push(cartItem);
      }

      Cart.update();
      Modal.close();
    });
  },
};
