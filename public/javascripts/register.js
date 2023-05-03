document.addEventListener("DOMContentLoaded", function() {
  function register(){
    let login = document.getElementById('btnregistrar');
    console.log(login);
    login.addEventListener('click', regcookie);
  }

  function regcookie(){
    const asamblea = document.getElementById("asambleaId").value;
    const delegado = document.getElementById("delegadoId").value;
    const alterno = document.getElementById("calterno").value;

    if (asamblea!=""||delegado!=""||alterno!=""){
      const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
      document.cookie = `calterno=${asamblea};${delegado};${alterno};${ipAddress}`;
      document.location.href="/";
    }else{
      alert("no se encuentran datos para registrar");
    }
  }

  window.addEventListener("load",register);
});