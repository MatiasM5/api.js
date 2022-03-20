const listaProductos = document.getElementById("ecommerce");

class Producto {
  constructor(title, description, price, img, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.img = img;
    this.id = id;
  }
}

const remeraA = new Producto(
  "Remera",
  "Remera Blanca",
  1550,
  "./assets/verano.jpg",
  1
);
const remeraB = new Producto(
  "Remera",
  "Remera Negra",
  1550,
  "./assets/verano.jpg",
  2
);
const remeraC = new Producto(
  "Remera",
  "Remera Gris",
  1550,
  "./assets/verano.jpg",
  3
);
const buzoA = new Producto(
  "Buzo",
  "Buzo Negro",
  2500,
  "./assets/winter.jpg",
  4
);
const buzoB = new Producto(
  "Buzo",
  "Buzo Gris",
  2500,
  "./assets/winter.jpg",
  5
);
const buzoC = new Producto(
  "Buzo",
  "Buzo Rojo",
  2500,
  "./assets/winter.jpg",
  6
);
const trajeA = new Producto(
    "Traje",
    "Traje Negro",
    30550,
    "./assets/formal.jpg",
    7
);
const trajeB = new Producto(
    "Traje",
    "Traje Gris",
    30550,
    "./assets/formal.jpg",
    8
);
const trajeC = new Producto(
    "Traje",
    "Traje Blanco",
    30550,
    "./assets/formal.jpg",
    9
  );

const baseDeDatosRopa = [
  remeraA,
  remeraB,
  remeraC,
  buzoB,
  buzoA,
  buzoC,
  trajeA,
  trajeB,
  trajeC
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let acumulador = ``;
baseDeDatosRopa.forEach((producto) => {
  acumulador += `
  <div class="col">
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top imgProd" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title titleProd" id="">${producto.title}</h5>
        <p class="card-text descriptionProd" id="">${producto.description}</p>
        <p class="card-text priceProd" id="">$${producto.price}</p>
        <button data-id="${producto.id}" class="btn addbtn btn-primary agregar-carrito">Agregar al Carrito</button>
      </div>
    </div>
  </div>`;
});

listaProductos.innerHTML = acumulador;

const btncarro = document.querySelector(".addbtn")
btncarro.addEventListener('click', () => {
  swal.fire({
    text: 'Agregado a tu carrito',
    icon: "success"
  });
})

if (listaProductos) {
  listaProductos.addEventListener("click", agregarAlCarrito);
}

function agregarAlCarrito(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentNode;
    console.log(productoSeleccionado);

    obtenerDatos(productoSeleccionado);
  }
}
function obtenerDatos(productoCard) {
  const datosProducto = {
    nombre: productoCard.querySelector(".titleProd").textContent,
    modelo: productoCard.querySelector(".descriptionProd").textContent,
    precio: productoCard.querySelector(".priceProd").textContent,
    img: productoCard.parentNode.querySelector(".imgProd").src
  };
 
  carrito.push(datosProducto);
  console.log(carrito);
  guardarStorage();
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.querySelector("#carrito");
const mostrarCarrito = document.querySelector("#mostrar-carrito");

if (mostrarCarrito) {
  mostrarCarrito.addEventListener("click", mostrarElCarrito);
}
function mostrarElCarrito() {
  if (localStorage.length === 0) {
    const msgInicial = document.createElement("h2");
    msgInicial.innerHTML = "No hay productos en el carrito";
    contenedorCarrito.appendChild(msgInicial);
  } else {
    renderizarCarrito();
  }
}

function renderizarCarrito() {
  limpiarCarrito();
  carrito.forEach((producto) => {
    const row = document.createElement("div");
    row.classList.add("row");

    row.innerHTML += `
            <div>
                <img class="imgcarrito" src="${producto.img}"/>
            </div>
            <div class="col">
                <h2 class="">${producto.nombre}</h2>
                <h4>${producto.precio}</h4>
            </div>
            <hr/>
        `;
    contenedorCarrito.appendChild(row);
  });
}

fetch('stock.json')
  .then(response => response.json)
  .then(data => console.log(data))
  .catch(error => console.log(error))


const botonC = document.querySelector('#mostrar-carrito')
botonC.addEventListener('click', () => {
  swal.fire({
    title: 'Tu carrito esta listo',
    icon: 'success'
  })
})
const botonS = document.querySelector('#btnFinal')
botonS.addEventListener('click', () => {
  swal.fire({
    title: 'Gracias por tu compra',
    icon: 'success'
  })
})

function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  localStorage.clear();
}
