// Variables con datos de ejemplo proporcionados
// Cargar datos con fetch desde el servidor
let datos = {};
fetch('http://localhost/estadisticas.json')
    .then(response => response.json())
    .then(data => {
        datos = data;
    })
    .catch(error => console.error('Error al cargar datos:', error));

// Función para mostrar datos en el div de estadísticas
const mostrarEstadistica = (titulo, descripcion) => {
    document.getElementById('tituloEstadistica').textContent = titulo;
    document.getElementById('descripcionEstadistica').innerHTML = descripcion;
};

// Función principal que gestiona la selección de la estadística
const gestionarSeleccion = () => {
    const seleccion = document.getElementById('estadisticaSelector').value;
    switch(seleccion) {
        case 'gananciasTotales':
            mostrarEstadistica('Total de Ganancias', `Total: €${datos.ganancias_total.ganancias}`);
            break;
        case 'productosBajoStock':
            const bajoStock = datos.p_stock_menor_cinco.map(p => `${p.nombre} (Stock: ${p.stock})`).join('<br>');
            mostrarEstadistica('Productos con stock bajo', bajoStock);
            break;
        case 'clientesMasPedidos':
            const maxPedidos = Math.max(...datos.U_mas_pedidos.map(u => u.pedidos));
            const clientes = datos.U_mas_pedidos.filter(u => u.pedidos === maxPedidos).map(u => `${u.nombre} (Pedidos: ${u.pedidos})`).join('<br>');
            mostrarEstadistica('Clientes con más pedidos', clientes);
            break;
        case 'gananciasPorMes':
            const gananciasMes = datos.anio_mes_ganancias.map(g => `${g["Fecha-Mes"]}: €${g.ganancia}`).join('<br>');
            mostrarEstadistica('Ganancias por Mes', gananciasMes);
            break;
        case 'productosNuncaComprados':
            const nuncaComprados = datos.p_sin_pedidos.map(p => p.nombre).join('<br>');
            mostrarEstadistica('Productos Nunca Comprados', nuncaComprados);
            break;
        case 'productosMasGanancia':
            const masGanancia = datos.p_mayor_a_quinientos.map(p => `${p.nombre} (€${p.ganancia})`).join('<br>');
            mostrarEstadistica('Productos con más de 500€ de ganancia', masGanancia);
            break;
        default:
            mostrarEstadistica('Selecciona una estadística', '');
    }
};

// Evento para detectar cambios en el selector
document.getElementById('estadisticaSelector').addEventListener('change', gestionarSeleccion);
