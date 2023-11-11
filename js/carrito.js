const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Su orden al momento...</h2>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src= "${product.img}">
            <h3>${product.nombre}</h3>
            <div class="cantidad">
                <span class="restar"> - </span>
                <p>Cantidad: ${product.cantidad}</p>
                <span class="sumar"> + </span>
            </div>    
            <h4>Subtotal: $${product.cantidad * product.precio} USD</h4> 
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
                product.cantidad--;
            }
            guardarLocal ();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
 
        sumar.addEventListener("click", () => {
            product.cantidad++;
            guardarLocal ();
            pintarCarrito();
        });

        let eliminarProducto = document.createElement("span");
        eliminarProducto.innerHTML = "X";
        eliminarProducto.className = "eliminar-producto";
        carritoContent.append(eliminarProducto);

        eliminarProducto.addEventListener("click", eliminar);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0); 

    const totalPurchase = document.createElement("div")
    totalPurchase.className = "total-content"
    totalPurchase.innerHTML = `Total a pagar: $${total} USD`;
    modalContainer.append(totalPurchase);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminar = () => {
    const foundId = carrito.find((element) => element.id);
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    pintarCarrito();
    carritoCounter();
    saveLocal();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();