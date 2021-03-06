window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");
  const qrcode = document.querySelector("#qrcode");
  const limpar = document.querySelector("#limpar");

  //ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    checarConexao();
    let formdata = new FormData();
    formdata.append('nome', `${nome.value}`);
    formdata.append('curso', `${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
      body: formdata,
      method:"post",
      mode:'cors',
      cache:'default'
    }).then(()=>{
            alert("Registro efetuado com sucesso!");
            limparCampos();
            }
      );
  });

  //metodo que listar uma pessoa
  buscar.addEventListener("click", function(){
    checarConexao();
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method:"get",
      mode:'cors',
      cache:'default'
    }).then(response=>{
      response.json().then(data => {
        nome.value = data['nome'];
        curso.value = data['curso'];
      })
    }) 
  });

  //metodo para alterar dados dos registros
  alterar.addEventListener("click", function(){
    checarConexao();
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method:"put",
      mode:'cors',
      cache:'default',
      headers:{
        'Content-type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify({
        'nome': `${nome.value}`,
        'curso': `${curso.value}`
      }),
    }).then(()=>{
      
      alert("Registro alterado com sucesso!");
      limparCampos();
    });
  });

  //metodo para deletar um registro
  deletar.addEventListener("click", function(){
    checarConexao();
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method:"delete",
      mode:'cors',
      cache:'default',
    }).then(()=>{
      alert("Registro deletado com sucesso!");
      limparCampos();
    });
  });

  //metodo para buscar c qrcode
  qrcode.addEventListener("click", function(){
    checarConexao();
    cordova.plugins.barcodeScanner.scan(
      function (result) {
      fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${result.text}`,{
      method:"get",
      mode:'cors',
      cache:'default'
    }).then(response=>{
      response.json().then(data => {
        nome.value = data['nome'];
        curso.value = data['curso'];
      })
    })
  },
      function (error) {
          alert("Ocorreu algum erro: " + error);
      },
      {
          preferFrontCamera : false, 
          showFlipCameraButton : true, 
          showTorchButton : true,
          torchOn: true, 
          saveHistory: true, 
          prompt : "Place a barcode inside the scan area", 
          resultDisplayDuration: 500, 
          formats : "QR_CODE,PDF_417, CODE_39", 
          orientation : "landscape",
          disableAnimations : true, 
          disableSuccessBeep: true 
      }
   );
});

//metodo verificar conexao
 function checarConexao() {
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE){
      function checarConexao(buttonIndex){
        if(buttonIndex == "1"){
          sair();
        }
    }
navigator.notification.confirm(
  "Você está sem conexão, tente novamente ou volte mais tarde.",
   checarConexao,
   "Erro na Conexão!",
    ["Sair", "Tentar novamente"]);
  }
 }

//botao limpar
  limpar.addEventListener("click", function(){
    limparCampos();
  })

//metodo para sair do app
function sair(){
  navigator.app.exitApp();
}

  //metodo para limpar os campos
  function limparCampos(){
    id.value = "";
    nome.value = "";
    curso.value = "";
  }
}
