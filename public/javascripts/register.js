function register(){
    let invoto = document.getElementById('regvoto');
    /* console.log(invoto); */
    invoto.addEventListener('click', capvoto);
  }

  function capvoto(){
    const pregunta_id = document.getElementById("pregunta_id").value;
    const pregEnunciado = document.getElementById("pregEnunciado").value;
    /* const cookieValue = req.cookies.calterno; // Obtener el valor de la cookie
    const cookieData = JSON.parse(cookieValue); // Analizar el valor de la cookie como un objeto JSON
    const alterno = cookieData.alterno; */

    console.log(pregunta_id);
    console.log(pregEnunciado);
    /* console.log(alterno); */
    

    /* if (asamblea!=""||delegado!=""||alterno!=""){
      const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
      document.cookie = `calterno=${asamblea};${delegado};${alterno};${ipAddress}`;
      document.location.href="/";
    }else{
      alert("no se encuentran datos para registrar");
    } */
  }

window.addEventListener("load",register);