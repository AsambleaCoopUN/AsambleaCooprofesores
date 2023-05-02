const login =document.querySelector("#btnregistrar");

login.addEventListener("click",()=>{
  const asamblea = document.querySelector("#asambleaId").value;
  const delegado = document.querySelector("#delegadoId").value;
  const alterno = document.querySelector("#calterno").value;

  if (asamblea!=""||delegado!=""||alterno!=""){
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    document.cookie = `calterno=${asamblea};${delegado};${alterno};${ipAddress}`;
    document.location.href="/";
  }else{
    alert("no se encuentran datos para registrar");
  }
});