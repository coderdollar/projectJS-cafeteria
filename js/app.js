const comprarProducto = document.getElementById("comprarProducto");
const verCarrito = document.getElementById ("verCarrito");
const modalContainer = document.getElementById ("modalContainer");
const cantidadCarrito = document.getElementById ("cantidadCarrito"); 

let carrito = JSON.parse(localStorage.getItem("cart")) || [];

const getProductos = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product) => {
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

            Toastify({
                text: "Producto agregado",
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#f0679b",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        });
    });
};

getProductos();

// SET ITEM
const guardarLocal = () => {
    localStorage.setItem("cart", JSON.stringify(carrito));
};