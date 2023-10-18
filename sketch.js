//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;


//variáveis colisão raquete
/*
let esquerdaBolinha = 0;
let superiorBolinha = 0;
let inferiorBolinha = 0;
    
let direitaRaquete = 0;
let superiorRaquete = 0;
let inferiorRaquete = 0;	
*/

let colidiu = false;

//placar do jogo

let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); // 1 - Desenha o background
  mostraBolinha(); // 2 - Desenha a bolinha
  movimentaBolinha(); // 3 - Movimenta a bolinha
  verificaColisaoBorda(); // 4 - verifica colisão     
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //alterarPosicoesBolinha();
  //alterarPosicoesRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  // 5 - Volta para o início da função draw()
  
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
    xBolinha += velocidadeXBolinha; 
    /* valor dela + velocidade                               da bolinha.*/
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  
  if (xBolinha + raio > width || 
      xBolinha - raio < 0){ 
      velocidadeXBolinha *= -1;
    /*se (estiver tocando a borda) width -> largura         máxima*/ 
  }
  
  if (yBolinha + raio > height ||
      yBolinha - raio < 0){
      velocidadeYBolinha *= -1;  
      /* *= -> valor da velocidade da bolinha * -1 */

  }

}

function mostraRaquete(x,y){
      
  rect(x,y,raqueteComprimento,                    raqueteAltura);
  
}

function movimentaMinhaRaquete(){
  
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaquete = constrain(yRaquete, 10, 310);
  
}

/*
function verificaColisaoRaquete() {
  
    if (xBolinha - raio < xRaquete + raqueteComprimento && 
        yBolinha - raio < yRaquete + raqueteAltura && 
        yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
    }
}
*/

function verificaColisaoRaquete(x,y){
    
  colidiu = collideRectCircle(x, y,      raqueteComprimento, raqueteAltura, xBolinha,          yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}


function movimentaRaqueteOponente(){
    
    
  //Jogar MultiPLayer  
  /*if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }*/ 
    
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
  
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  // constrain = restringir
  
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);

}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26)
}

function marcaPonto(){
  
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }
  } else{
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 23
  }
}


/*
function  alterarPosicoesBolinha() {
 
 esquerdaBolinha = xBolinha - raio;
 superiorBolinha = yBolinha - raio;
 inferiorBolinha = yBolinha + raio;   
  
}

function alterarPosicoesRaquete() {
 
 direitaRaquete = xRaquete + raqueteComprimento;
 superiorRaquete = yRaquete;
 inferiorRaquete = yRaquete + raqueteAltura;	
  
}
*/

/*function verificaColisaoRaquete() {	
  
    if (esquerdaBolinha < direitaRaquete && 
        superiorBolinha < inferiorRaquete && 
        inferiorBolinha > superiorRaquete) {
        velocidadeXBolinha *= -1;
    }
}
*/


