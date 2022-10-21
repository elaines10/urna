
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname,'img')));
const candidatos = [];
const cliente = [];
const votos = [];

function contador(x){
  let contador = 0;
  for(let e = 0; e < votos.length; e++){
    let voto = votos[e];
    if(voto.candidatoId == x.candidatoId){
      contador++
    }
  }
return contador;
};

  // o post esta criando o cliente
  /**
   * request seria quando voce faz um pedido
   * e o response a resposta
   * na const voce esta pedindo o nome e o sobrenome no caso name e username no insomia 
   */
app.post("/cliente", (request, response)=> {
  const{name, username}= request.body;
  const usuarioJaexiste = cliente.find((usuario) => usuario.username === username);
  if(usuarioJaexiste){
    return response.status(400).json({error:"usuario ja existe!"})
}
const user ={
  name,
   username
}
cliente.push(user)
return response.status(200).json(user);
})
// o post cria os candidatos
app.post("/candidato", (request, response) => {
  const {candidateId,candidateName,partyld,partyName,imageUrl} = request.body;
  const candidatojaexiste = candidatos.find((candidato) => candidato.candidateId === candidateId);
 if(candidatojaexiste){
  return response.status(400).json({error:"candidato ja existe!"})
 }
 
const candidato = {
candidateId,
candidateName,
partyld,
partyName,
imageUrl,
}
candidatos.push(candidato);
return response.status(200).json(candidato);


})
//o get busca os candidatos
app.get("/candidates/:candidateId",(request,response)=> {
  const {username } =request.headers;
  const {candidateId} =request.params;

  const candidatojaexiste = candidatos.find((candidato) => candidato.candidateId == candidateId);
  if (candidatojaexiste == null){
    return response.status(400).json({error:"candidato nao encontrado"})
  }
  /*const clientes = cliente.find((user) => user.username === username);
 if (clientes){
  return response.status(400).json({error:"cliente nao encontrado"})
 }*/
 return response.json(candidatojaexiste);
})

//voto
app.post ("/votos/:candidateId", (request, response)=> {
  const {username } = request.headers;  
  const {candidateId} = request.params;
  const{candidateName, partyName} = request.body;

  const candidatojaexiste = candidatos.find((candidato) => candidato.candidateId === candidateId);
 if(candidatojaexiste == null){
const voto = {
"candidateId": null,
"partyld": null,
"partyName": null,
}
votos.push(voto);
contador(voto);
return response.json(voto);
 
 }else{
  const voto ={
    "candidateId": candidatos.candidateId,
    "partyld": candidatos.partyld,
    "partyName": candidatos.partyName,
  }
  votos.push(voto);
  contador(voto);
  return response.json(voto);
}

});
app.listen(8888);