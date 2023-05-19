let pregunta_id;
function register() {
  let invoto = document.getElementById('regvoto');
  invoto.addEventListener('click', capvoto);
}

function capvoto() {
  let selectedOption = document.querySelector('input[name="voto"]:checked');
  pregunta_id = document.getElementById("pregunta_id").value;
  if (selectedOption) {
    console.log("ID de la opción seleccionada:", selectedOption.value);
    console.log("ID de la pregunta:", pregunta_id);
    /* acá va a ir la validación de la cookie para luego para obtener el "asistencia:id único del asociado" */
  } else {
    alert("Por favor, selecciona una opción de voto");
  }
}

window.addEventListener("load",register);