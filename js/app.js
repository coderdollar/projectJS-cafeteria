const comprarProducto = document.getElementById("comprarProducto");
const verCarrito = document.getElementById ("verCarrito");
const modalContainer = document.getElementById ("modalContainer");
const cantidadCarrito = document.getElementById ("cantidadCarrito"); 

// *********************PRODUCTOS *********************
const menu = [
    {id: 1, nombre: "Coffee", precio: 5, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-14-300x300.png", cantidad: 1},
    {id: 2, nombre: "Chocolate", precio: 2, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-3-300x300.png", cantidad: 1 }, 
    {id: 3, nombre: "Darling's shake", precio: 1, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-2-300x300.png", cantidad: 1},
    {id: 4, nombre: "Soda", precio: 3, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-13-300x300.png", cantidad: 1 },
    {id: 5, nombre: "Cinnamon Pancakes", precio: 10, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-5-1-300x300.png", cantidad: 1 },
    {id: 6, nombre: "Strawberry Banana", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-4-1-300x300.png", cantidad: 1},
    {id: 7, nombre: "Grand Slam", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-3-1-300x300.png", cantidad: 1},
    {id: 8, nombre: "Darling's Omelette", precio: 3, img: "https://dennysmexico.com/wp-content/uploads/2023/04/Mesa-de-trabajo-11-1-300x300.png", cantidad: 1 },
    {id: 9, nombre: "Bacon Burger", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-3-300x300.png", cantidad: 1},
    {id: 10, nombre: "BLT Sandwich", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-18-300x300.png", cantidad: 1},
    {id: 11, nombre: "Chicken Tenders", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/03/chicken-tenders-300x300.png", cantidad: 1},
    {id: 12, nombre: "Double Burger", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-14-300x300.png", cantidad: 1},
    {id: 13, nombre: "Superbird", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-15-300x300.png", cantidad: 1},
    {id: 14, nombre: "Apple Pie", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-3-1-300x300.png", cantidad: 1},
    {id: 15, nombre: "Cookie", precio: 4, img: "https://dennysmexico.com/wp-content/uploads/2023/05/Mesa-de-trabajo-6-1-300x300.png", cantidad: 1},
];

let carrito = JSON.parse(localStorage.getItem("cart")) || [];

// ******************APP**********************
menu.forEach((product) => {
    let content = document.createElement("div");
    content.className = "tarjetita";
    content.innerHTML = `
        <img src= "${product.img}">
        <h3 class="nombre-producto">${product.nombre}</h3>
        <p class="precio">$${product.precio} USD</p>
    `;
    comprarProducto.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "agregar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener ("click", () =>{
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id); 

        if (repeat){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            });
        }else{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,  
            cantidad: product.cantidad,
        });
        } 
        console.log(carrito);
        carritoCounter();
        guardarLocal ();
    });
});

// SET ITEM
const guardarLocal = () => {
    localStorage.setItem("cart", JSON.stringify(carrito));
};

// *****************CARRITO*********************
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