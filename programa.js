let posicaoX = 0; // Posicao jogador
let posicaoY = 9; // posicao jogador
let idJogador ; 
let id ;
let divJogador ;   // div do jogador
let boxVencedor ;  // box com mensagem vencedor
let chegouFinal = false;    // travar o movimento quando chegar ao final
  



const map = [
     "WWWWWWWWWWWWWWWWWWWWW",
     "W   W     W     W W W",
     "W W W WWW WWWWW W W W",
     "W W W   W     W W   W",
     "W WWWWWWW W WWW W W W",
     "W         W     W W W",
     "W WWW WWWWW WWWWW W W",
     "W W   W   W W     W W",
     "W WWWWW W W W WWW W F",
     "S     W W W W W W WWW",
     "WWWWW W W W W W W W W",
     "W     W W W   W W W W",
     "W WWWWWWW WWWWW W W W",
     "W       W       W   W",
     "WWWWWWWWWWWWWWWWWWWWW",
 ];



// cria os boxs e botao
function criaBox(){
     //Cria main, caixa principal jogo*****************
     let main = document.createElement("div");
     main.id = "idmain";
     document.body.appendChild(main);
     //************************************************ */

     //Cria box do labirinto*********************
     let boxLabirinto = document.createElement("div");
          boxLabirinto.id = "idBoxLabirinto";
          main.appendChild(boxLabirinto);
     //******************************************** */

     //cria box com mensagem vencedor
     boxVencedor = document.createElement("div");
     boxVencedor.id = "idBoxVencedor";
     main.appendChild(boxVencedor)

     //cria botao reinicio************
     let resetButton = document.createElement("button");
      resetButton.innerText = "Reiniciar";
      resetButton.id = "idReset";
      main.appendChild(resetButton);
     //************************ */
     resetButton = document.getElementById("idReset");
     resetButton.addEventListener("click", reset);
}


function reset(){
     posicaoX = 0;
     posicaoY = 9;
     id = "l" + posicaoY + "c" + posicaoX;
     idJogador = document.getElementById(id);
     idJogador.appendChild(divJogador); 
     boxVencedor.innerText = ""

     chegouFinal = false // destravar a movimentacao do jogador

}

function criaLabirinto(){
     divJogador = document.createElement('div') ;   // div do jogador
        
     
     for (let i=0 ; i<map.length ; i++){
 
          let linha = document.createElement("div");  //cria cada linha do labirinto
          idBoxLabirinto.appendChild(linha);
         //document.body.appendChild(linha);
          linha.id ="linha" + i;                      // um ID para cada linha
          linha.className = "linhas";

          for(let j=0 ; j<map[i].length ; j++ ){
               let celula = document.createElement("div");
               linha.appendChild(celula);

               if (map[i][j] == "W"){
                    celula.id = "l" + i + "c" + j ;
                    celula.className = "parede";
               }
               if (map[i][j] == " "){
                    celula.id = "l" + i + "c" + j;
                    celula.className = "caminho";
               }

               //posiçao de inicio do jogador
               if (map[i][j] == "S"){     
                    celula.id = "l" + i + "c" + j;
                    celula.className = "caminho";
                    //**Cria jogador posicao inicial */
                    id = "l" + posicaoY + "c" + posicaoX;
                    divJogador.className = "jogador";
                    idJogador = document.getElementById(id);
                    idJogador.appendChild(divJogador); 

                   
               }
               if (map[i][j] == "F"){
                    celula.id = "l" + i + "c"+j;
                    celula.className = "chegada";
               }
          }
     }
}
 
function moveJogador(){

     document.addEventListener('keydown',(evento) => { //keydown-> precionar a tecla          
          const tecla = evento.key;                     // armazena a tecla precionada
          
          if (chegouFinal == false) { // caso chegue ao final do jogo, recebe true e trava o movimento do jogador
               switch (tecla){
                    case "ArrowDown": 
                         //let idBotao = event.currentTarget.getAttribute("id"); // lê o id  
                         posicaoY++;
                         if (map [posicaoY][posicaoX] == "W"){posicaoY--;}
                    break;

                    case "ArrowUp":     
                         posicaoY--;
                         if (map [posicaoY][posicaoX] == "W"){posicaoY++;}
                    break;

                    case "ArrowRight":  
                         posicaoX++;
                         if (map [posicaoY][posicaoX] == "W"){posicaoX--;}
                         //vencedor
                         if (map [posicaoY][posicaoX] == "F"){
                              boxVencedor.innerText = "Você Encontrou a Saída !!!"
                              chegouFinal = true;
                         } 
                    break;

                    case "ArrowLeft":  
                         posicaoX--;
                         if (map [posicaoY][posicaoX] == "W" || posicaoX<0){posicaoX++;}  // || posicaoX<0 não permite sair do labirinto na entrada
                    break;    
               }
          }


          
          id = "l" + posicaoY + "c" + posicaoX;
          idJogador = document.getElementById(id);
          idJogador.appendChild(divJogador); 
     });
}

function reinicio(){

}


function funcMain(){
     criaBox();              // cria os boxs do jogo e botao
     criaLabirinto();
     moveJogador();
}
funcMain();


