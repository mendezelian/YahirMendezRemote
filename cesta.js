// Función para mostrar los productos del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenedor = document.getElementById('carritoContenedor');
    carritoContenedor.innerHTML = '';  // Limpiar el contenedor

    // Calcular el total
    let total = 0;
    carrito.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('carrito');
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <p>${producto.descripcion}</p>
            <p><strong>Precio: $${producto.precio}</strong></p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="disminuirCantidad(${producto.id_producto})">-</button> 
            <button onclick="eliminarProducto(${producto.id_producto})"><img src = "../Web-R/Icons/delet.png"  
            <style width="20" ></button>
            <button onclick="aumentarCantidad(${producto.id_producto})">+</button>
        `;

        carritoContenedor.appendChild(productoElement);

        // Calcular el total del carrito
        total += producto.precio * producto.cantidad;
    });

    // Verificación de carrito vacío
    if (total <= 0) {
        alert('No hay productos en el carrito');
        window.location.href = 'productos.html';
        }

    // Mostrar el total
    document.getElementById('totalCarrito').textContent = `$${total.toFixed(2)}`;
}

// Función para aumentar la cantidad
function aumentarCantidad(id_producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar el producto en el carrito
    let productoExistente = carrito.find(producto => producto.id_producto === id_producto);

    if (productoExistente) {
        // Validar que la cantidad sea un número positivo antes de incrementar
        if (productoExistente.cantidad > 0) {
            productoExistente.cantidad++;
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    mostrarCarrito(); // Actualizar la vista del carrito
}

// Función para disminuir la cantidad
function disminuirCantidad(id_producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar el producto en el carrito
    let productoExistente = carrito.find(producto => producto.id_producto === id_producto);

    if (productoExistente) {
        // Si la cantidad es mayor a 1, disminuirla
        if (productoExistente.cantidad > 1) {
            productoExistente.cantidad--;
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            carrito = carrito.filter(producto => producto.id_producto !== id_producto);
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    mostrarCarrito(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarProducto(id_producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    carrito = carrito.filter(producto => producto.id_producto !== id_producto); // Eliminar producto
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    mostrarCarrito();  // Actualizar la vista del carrito
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        // Confirmar antes de vaciar el carrito
        localStorage.removeItem('carrito');  // Eliminar carrito del localStorage
        mostrarCarrito();  // Actualizar la vista del carrito 
    } else {
        alert('Sigue comprando');
    }
}

// Función para finalizar la compra (puedes agregar más lógica aquí)
function finalizarCompra() {
    if (confirm('¿Estás seguro de finalizar la compra?')) {
        // Confirmar antes de vaciar el carrito
        localStorage.removeItem('carrito');  // Eliminar carrito del localStorage
        mostrarCarrito();  // Actualizar la vista del carrito 
    } else {
        alert('Compra cancelada');
    }
}


// Función para cargar todos los productos desde la API
function cargarTodosLosProductos() {
    fetch('http://localhost/productos.json')
        .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta de la API');
            return res.json();
        })
        .then(json => {
            const container = document.getElementById('productos-lista');
            if (!container) {
                console.error('Error: No se encontró el elemento con id "productos-lista"');
                return;
            }
            container.innerHTML = '';
            json.forEach(product => {
                const imgUrl = product.imagen.startsWith('http') ? product.imagen : `http://localhost/${product.imagen}`;
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="producto">
                        <img src="${imgUrl}" alt="${product.nombre}"  onclick="verProducto(${product.id})" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300?text=No+Image';">
                        <h2 style="height:55px; overflow:hidden;">${product.nombre}</h2>
                        <p><b>${product.precio}€</b></p>
                        <button >
                            <a onclick="agregarAlCarrito(${product.id}, '${product.nombre}', '${product.descripcion}', ${product.precio}, ${product.stock}, '${product.imagen}')">Añadir al carrito</a>
                        </button>
                    </div>
                    <br>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id_producto, nombre, descripcion, precio, stock, imagen) {
    const producto = {
        id_producto: id_producto,
        nombre: nombre,
        imagen: imagen,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        cantidad: 1,
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id_producto === id_producto);
    if (productoExistente) {
        
        productoExistente.cantidad += 1;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto añadido al carrito');
}

// Llamar a la función para mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarTodosLosProductos();
    mostrarCarrito();
});
