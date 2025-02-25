
const ListaDeLaCompras = {
    dia: "13/01/2025",
    comprador: "Unax",
    tienda: "Fruteria",
    lista: [
        {
            producto: "Manzanas",
            cantidad: 6,
            comprado: true,
        },
        {
            producto: "Calabacín",
            cantidad: 1,
            comprado: true,
        },
        {
            producto: "Puerro",
            cantidad: 4,
            comprado: false,
        },
        {
            producto: "Melón",
            cantidad: 1,
            comprado: false,
        },
        {
            producto: "Kiwi",
            cantidad: 4,
            comprado: true,
        },
        {
            producto: "Fresa",
            cantidad: 12,
            comprado: true,
        },
        {
            producto: "Berenjena",
            cantidad: 2,
            comprado: false,
        },
        {
            producto: "Romanescu",
            cantidad: 1,
            comprado: false,
        },
        {
            producto: "Plátano",
            cantidad: 5,
            comprado: true,
        },
    ]
};
const Array_titulos_col_lista = ["producto","cantidad","comprado"];// Creo un array con las palabras calves del objeto para mejorar la iteación sobre estos
document.addEventListener('DOMContentLoaded',()=>{
    //La función de esta sentencia es que si es la primera carga(localStorage vacío) consuma el objeto que acabo de definir, y si detecta que ya existe el objeto en 
    //el LocalStorage entonces que al recargar la página consuma las copias de este y las que se van agregando.
    //ya que cada vez que cargue la página entonces va a estar consumiendo siempre el mismo objeto que tengo por defecto y no usará los modificados, así aseguro que se mantenga una consistencia
    localStorage.getItem('ListaCompras') ? "" : localStorage.setItem('ListaCompras',JSON.stringify(ListaDeLaCompras));
    
    const form = document.getElementById("formulario"); 
    GenerarNodos_Lista();// Si es la primera carga entonces muestra el objeto por defecto, pero sino entonces mostrá lo que se había guardado anteriormente en el local
    
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        form_datos = new FormData(event.target);
        form_datos.get('comprado') != 'on' ? comprado_bool = false : comprado_bool = true; //noté que el nodo checkbox retorna 'on' o 'null' en vez de true o false, asi que solo comparo y sustituyo
        const nuevos_productos = {
            producto : form_datos.get('producto'),
            cantidad : form_datos.get('cantidad'),
            comprado : comprado_bool,
        }
        Agregar_Items(nuevos_productos); //mando el nuevo objeto que construí con los datos del formulario para que se rendericen
    });
});


const GenerarNodos_Lista =()=>{
    const Lista = JSON.parse(localStorage.getItem('ListaCompras'));//traigo todos los datos del objeto almacenado en el LocalStorage
    const ComponentLista = document.getElementById('lista');
    ComponentLista.classList.add('contenedor');
    const fragment = document.createDocumentFragment();//Creo un Fragmento para que la creación y los cambios de los nodos se guarden  este, evitando así actualizar el DOM demasiadas veces
    
    //Informacion general de la lista
            //Dia
    const Lista_Dia = document.createElement('h3');
    Lista_Dia.textContent = "Dia: "+Lista.dia;
    fragment.appendChild(Lista_Dia);
            //Comprador
    const Lista_Comprador = document.createElement('h3');
    Lista_Comprador.textContent = "Comprador: "+Lista.comprador;
    fragment.appendChild(Lista_Comprador);
            //Tienda
    const Lista_Tienda = document.createElement('h3');
    Lista_Tienda.textContent = "Tienda: "+Lista.tienda;
    fragment.appendChild(Lista_Tienda);

    //Listado de productos
    const ContainerLista = document.createElement('div');
    ContainerLista.classList.add('Container_Lista');
            //Nombre de productos
    Array_titulos_col_lista.forEach(col=>{//itero sobre las palabras clave
        const Lista_Producto = document.createElement('div');
        const Titulo_cols = document.createElement('h4');
        Titulo_cols.textContent = col; //titulos de columnas
        const Rows_Lista = document.createElement('ul'); //crar el ul
        Lista_Producto.appendChild(Titulo_cols); //agrega titulo al div
        Lista.lista.map(item=>{ //itero sobre el array de objetos que se encuentra en la Lista 
            if(typeof item[col]!="boolean"){ //Si el item es un booleano entonces le asigno su logica para crear el checkbox 
                const Info_list = document.createElement('li');
                Info_list.textContent = item[col];
                Rows_Lista.appendChild(Info_list);  //agrega el li al ul
            }else{
                const Info_list = document.createElement('li');
                const check = document.createElement('input');
                check.setAttribute('type','checkbox'); // le digo que sea de tipo checkbox
                check.checked = item[col]; //Le asigno al value del checkbox, el valor que contenga el item booleano
                if(check.checked==true){ 
                    check.disabled = true; //Evito que se pueda deseleccionar
                };
                check.addEventListener('change',()=>{ //Asigno un evento para que detecte cuando marco el checkbox
                    if(check.checked==true){
                        check.disabled = true;
                    }
                    item[col] = check.value != 'on' ? false : true  ; //sobrescribo  el item booleano con el valor actual del checkbox
                    localStorage.setItem('ListaCompras',JSON.stringify(Lista)); //mando el objeto modificado al LocalStorage
                });
                Info_list.appendChild(check);  //agrega el check al li
                
                Rows_Lista.appendChild(Info_list);  //agrega el li al ul
            }
        });
        Lista_Producto.appendChild(Rows_Lista); //agrega el ul al div
        ContainerLista.appendChild(Lista_Producto); 
    });
    fragment.appendChild(ContainerLista);
    ComponentLista.appendChild(fragment);//Luego de haber creado todos los nodos los rederizo
}

    const Agregar_Items = (nuevos_productos) =>{
        const Local_lista_compras = JSON.parse(localStorage.getItem('ListaCompras')); //traigo los datos del local
        Local_lista_compras.lista.push(nuevos_productos);//meto los datos nuevos al array
        localStorage.setItem('ListaCompras',JSON.stringify(Local_lista_compras));//mando el nuevo objeto al local
        
        window.location.reload();//recargo la página para que consuma el nuevo objeto del LocalStorage
    }

