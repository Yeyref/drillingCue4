class Suma {
  constructor(nombreProducto, cantidadProducto) {
    this.nombreProducto = nombreProducto;
    this.cantidadProducto = cantidadProducto;
  }
}

const presupuestoVar = document.getElementById("presupuesto");
const presupuestoBtn = document.getElementById("presupuesto-btn");
const presupuestoView = document.getElementById("muestraPresupuesto");

const gastoView = document.getElementById("muestraGasto");
const saldoView = document.getElementById("muestraSaldo");

const nombreProducto = document.getElementById("nombreGasto");
const cantidadProducto = document.getElementById("cantidadGasto");
const formulario = document.getElementById("formulario");
const añadirProducto = document.getElementById("gasto-btn");
const viewLista = document.getElementById("data");

const productos = [];
let gasto = 0;
let saldo = 0;

presupuestoBtn.addEventListener("click", function () {
  const presupuestoValor = presupuestoVar.value;
  if (validacion_campo(presupuestoValor)) {
    alert("Debe ingresar el presupuesto");
    return;
  }

  presupuestoView.innerHTML = `<b>$${presupuestoValor}</b>`;
});

añadirProducto.addEventListener("click", function () {
  if (validacion_campo(nombreProducto.value)) {
    alert("Debe ingresar Nombre");
    return;
  }

  if (validacion_campo(cantidadProducto.value)) {
    alert("Debes ingresar la cantidad del producto");
    return;
  }

  if (validacion_campo(presupuestoVar.value)) {
    alert("Debe ingresar el presupuesto");
    return;
  }

  const sumas = new Suma(nombreProducto.value, cantidadProducto.value);
  gasto += parseInt(sumas.cantidadProducto);
  saldo = parseInt(presupuestoVar.value) - gasto;

  gastoView.innerHTML = `<b>$${gasto}</b>`;
  saldoView.innerHTML = `<b>$${saldo}</b>`;

  productos.push(sumas);
  formulario.reset();
  verDatos();
});

const validacion_campo = (campo) => {
  return campo === "" || campo < 0;
};

const verDatos = function () {
  viewLista.innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    viewLista.innerHTML += `
         <tr id="fila${i}">
              <td>${productos[i].nombreProducto}</td>
              <td>$${productos[i].cantidadProducto}</td>
              <td><a href="#" onclick="eliminar(${i})"><span class="material-symbols-outlined">delete_forever</span></a></td>
        </tr>
         `;
  }
};

const eliminar = (id) => {
  const elementoEliminar = document.getElementById(`fila${id}`);
  const gastoEliminado = parseInt(productos[id].cantidadProducto);

  gasto -= gastoEliminado;
  saldo += gastoEliminado;
  elementoEliminar.remove();
  productos.splice(id, 1);
  console.log(productos);
  verDatos();

  gastoView.innerHTML = `<b>$${gasto}</b>`;
  saldoView.innerHTML = `<b>$${saldo}</b>`;
};
