//Vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
    alert('Carrito vaciado');
    verCarrito();
    document.getElementById('total').innerText = '0.00';
}

//Ver carrito
function verCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const container = document.getElementById('carrito-container');
    container.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        fetch(`https://fakestoreapi.com/products/${item.id}`)
            .then(response => response.json())
            .then(product => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="producto">
                        <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;">
                        <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                        <p><b>${product.price}€</b></p>
                        <p>Cantidad</p>
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        ${item.cantidad}
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                    <br>
                `;
                container.appendChild(div);
                total += product.price * item.cantidad;
                document.getElementById('total').innerText = total.toFixed(2);
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    });
}

//Cambiar cantidad de producto en el carrito
function cambiarCantidad(productId, cambiar) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === productId);
    if (index !== -1) {
        carrito[index].cantidad += cambiar;
        if (carrito[index].cantidad <= 0) {
            if (confirm('¿Desea eliminar este producto del carrito?')) {
                carrito.splice(index, 1);
                document.getElementById('total').innerText = '0.00';
            } else {
                carrito[index].cantidad = 1;
            }
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        verCarrito();
    }
}

//Añadir producto al carrito
function AñadirCarrito(productId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === productId);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id: productId, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.alert('Producto añadido al carrito');
    actualizarCarrito();
}

//Actualizar visualmente el carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoLink = document.getElementById('carritoLink');
    carritoLink.href = 'carrito.html';
    carritoLink.innerHTML = `<img src="fotos/carrito.png" alt="carrito"> (${carrito.length})`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    actualizarCarrito();
    if (document.getElementById('carrito-container')) {
        verCarrito();
    }
});

function GraciasCompra() {
    alert('Gracias por su compra');
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
    window.location.href = 'index.html';
}