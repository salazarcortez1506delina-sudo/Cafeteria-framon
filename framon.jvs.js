
// ========================================
// CAFETERÍA FRAMON - SISTEMA JAVASCRIPT
// ========================================

// CAMBIAR POR EL WHATSAPP REAL DE LA CAFETERÍA
// Formato Bolivia: 591 seguido del número.
const numeroWhatsApp = "591XXXXXXXXX";

// ========================================
// LISTA DE PRODUCTOS
// ========================================

const productos = [
    {
        id: 1,
        nombre: "Masaco de plátano",
        precio: 15,
        categoria: "comida",
        imagen: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
    },
    {
        id: 2,
        nombre: "Masaco de yuca",
        precio: 15,
        categoria: "comida",
        imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
    },
    {
        id: 3,
        nombre: "Empanadas",
        precio: 8,
        categoria: "comida",
        imagen: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
    },
    {
        id: 4,
        nombre: "Sándwich",
        precio: 12,
        categoria: "comida",
        imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500"
    },
    {
        id: 5,
        nombre: "Café caliente",
        precio: 8,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
    },
    {
        id: 6,
        nombre: "Café con leche",
        precio: 10,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 7,
        nombre: "Jugo natural",
        precio: 10,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500"
    },
    {
        id: 8,
        nombre: "Refresco",
        precio: 7,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=500"
    }
];

// ========================================
// CARRITO DE COMPRAS
// ========================================

let carrito = [];

// ELEMENTOS HTML

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// ========================================
// MOSTRAR PRODUCTOS
// ========================================

function mostrarProductos(categoria = "todos") {

    productGrid.innerHTML = "";

    const filtrados = categoria === "todos"
        ? productos
        : productos.filter(p => p.categoria === categoria);

    filtrados.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "producto";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.loading = "lazy";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = "Bs " + producto.precio.toFixed(2);

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        tarjeta.append(imagen, nombre, precio, boton);

        productGrid.appendChild(tarjeta);
    });
}

// ========================================
// FILTRAR COMIDAS Y BEBIDAS
// ========================================

document.querySelectorAll(".filter-btn").forEach(boton => {

    boton.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        boton.classList.add("active");

        mostrarProductos(boton.dataset.filter);
    });

});

// ========================================
// AGREGAR PRODUCTOS
// ========================================

function agregarAlCarrito(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    const existente = carrito.find(p => p.id === id);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

// ========================================
// MOSTRAR CARRITO
// ========================================

function mostrarCarrito() {

    cartItems.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        cartItems.innerHTML = "<p>Tu carrito está vacío. Agrega tus productos favoritos.</p>";

    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        const elemento = document.createElement("div");

        elemento.className = "cart-item";

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = "Precio: Bs " + producto.precio.toFixed(2);

        const cantidad = document.createElement("p");
        cantidad.textContent = "Cantidad: " + producto.cantidad;

        const subtotalTexto = document.createElement("p");
        subtotalTexto.textContent = "Subtotal: Bs " + subtotal.toFixed(2);

        const menos = document.createElement("button");
        menos.textContent = "-";
        menos.addEventListener("click", () => {
            cambiarCantidad(producto.id, -1);
        });

        const mas = document.createElement("button");
        mas.textContent = "+";
        mas.addEventListener("click", () => {
            cambiarCantidad(producto.id, 1);
        });

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        elemento.append(
            titulo,
            precio,
            cantidad,
            subtotalTexto,
            menos,
            mas,
            eliminar
        );

        cartItems.appendChild(elemento);
    });

    cartTotal.textContent = "Bs " + total.toFixed(2);
}

// ========================================
// CAMBIAR CANTIDAD
// ========================================

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    mostrarCarrito();
}

// ========================================
// ELIMINAR PRODUCTO
// ========================================

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    mostrarCarrito();
}

// ========================================
// CALCULAR TOTAL
// ========================================

function calcularTotal() {

    return carrito.reduce((total, producto) => {

        return total + producto.precio * producto.cantidad;

    }, 0);
}

// ========================================
// ENVIAR PEDIDO POR WHATSAPP
// ========================================

function enviarPedido() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío. Agrega algún producto.");

        return;
    }

    if (!/^591\d{8}$/.test(numeroWhatsApp)) {

        alert("Primero debes configurar el número de WhatsApp de la cafetería en el JavaScript.");

        return;
    }

    let mensaje = "¡Hola! Cafetería Framon, deseo realizar el siguiente pedido:\n\n";

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        mensaje +=
            producto.nombre + "\n" +
            "Cantidad: " + producto.cantidad + "\n" +
            "Subtotal: Bs " + subtotal.toFixed(2) + "\n\n";
    });

    mensaje += "TOTAL: Bs " + calcularTotal().toFixed(2);

    mensaje += "\n\n¡Gracias!";

    const enlace = "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}

// ========================================
// INICIAR PÁGINA
// ========================================

mostrarProductos();
mostrarCarrito();


