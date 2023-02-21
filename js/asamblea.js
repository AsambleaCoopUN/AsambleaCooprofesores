function consultar(){
    let confirmar = document.getElementById('btnconfirmar')
    confirmar.addEventListener('click', registrar)
}

function registrar(){
    alert("Registro satisfactorio")
}

window.addEventListener("load",consultar)