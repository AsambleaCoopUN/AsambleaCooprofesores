let pregunta_id;
let message;

function register() {
  let invoto = document.getElementById('regvoto');
  invoto.addEventListener('click', capvoto);
}

function capvoto() {
  let selectedOption = document.querySelector('input[name="voto"]:checked');
  pregunta_id = document.getElementById("pregunta_id").value;
  cookieValue = document.cookie;

  if (selectedOption) {
    console.log("ID de la opción seleccionada:", selectedOption.value);
    console.log("ID de la pregunta:", pregunta_id);

    // Realizar la solicitud HTTP al servidor
    fetch('/registroVoto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedOption: selectedOption.value,
        pregunta_id: pregunta_id
      })
    })
      .then(response => {
        console.log(response); // Manejar la respuesta del servidor
        message = "Voto registrado satisfactoriamente";
        if(confirm(message)){
          window.location.href='/'
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert("Por favor, selecciona una opción de voto");
  }
}

window.addEventListener("load", register);
