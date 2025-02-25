//Listado de TODOS los productos
/*fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const container = document.getElementById('producto-container');
        container.innerHTML = '';
        json.forEach(product => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;" onclick="verProducto(${product.id})">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p><b>${product.price}€</b></p>
                </div>
                <br>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));

//Listado de todos los productos despues de hacer click en el boton de productos
function verProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            const container = document.getElementById('producto-container');
            container.innerHTML = '';
            json.forEach(product => {
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;" onclick="verProducto(${product.id})">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p><b>${product.price}€</b></p>
                </div>
                <br>
            `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

//Ver un producto en especifico
function verProducto(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const container = document.getElementById('producto-container');
            container.innerHTML = '';
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p><a class="Descripcion" style="height:200px; overflow:auto;">${product.description}</a></p>
                    <p><b>${product.price}€</b></p>
                    <button style="border : none; background-color: white;"><a onclick="AñadirCarrito(${product.id})">Añadir al carrito</a></button>
                </div>
                <br>
            `;
            container.appendChild(div);
        })
        .catch(error => console.error('Error al cargar el producto:', error));
}

//Ver todos los productos de una categoria
function verCategoria(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById('producto-container');
            container.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;" onclick="verProducto(${product.id})">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p><b>${product.price}€</b></p>
                </div>
                <br>
            `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}*/