// VARIABLES GLOBALES
let estado = -1; // Estado de la escena actual

// Imagenes
let imgEscena1,
    imgEscena2,
    protadurmiendo,
    huellasImg,
    imgMuerteViejo,
    cuchilloImg,
    sangreGif,
    puerta,
    policia,
    tablas,
    succes,
    imgEscena10;

// Texto
let textoIntro =
  "En la penumbra de una casa silenciosa, un hombre se consume en su propia obsesión. No es el dinero lo que lo atormenta, ni un agravio antiguo, sino la presencia de un ojo: un ojo pálido, frío, que parece mirarlo sin cesar. Día tras día, la idea crece en su mente, transformando la calma en desvelo. Convencido de que no hay descanso posible mientras ese ojo exista, trama en secreto la forma de liberarse. \nCada noche, en el mismo instante, abre con cuidado la puerta del anciano, avanza con sigilo y se detiene, conteniendo la respiración, hasta que la penumbra lo envuelve por completo. \nHoy, finalmente, la decisión está tomada: es la hora de entrar";
let textoMostrado = "";
let indiceTexto = 0;

// Escena 1
let textoEscena1 = 
  "La puerta cruje en la penumbra… sé que duerme,\n" +
  "pero siento su ojo abierto aún en sueños.\n" +
  "¿Debo entrar ahora? ¿O esperar una noche más?";
let textoMostrado1 = "";
let indiceTexto1 = 0;

// Escena 2
let textoEscena2 = 
  "Durante la primera hora no moví un músculo. \n Entonces, un ruido sordo y apagado, imposible de ignorar, alcanzó mis oídos: era el latido del corazón del anciano. Al principio tenue, luego cada vez más fuerte y rápido, me produjo un terror indecible, tenía que pararlo.";
let textoMostrado2 = "";
let indiceTexto2 = 0;
let tiempoInicioEscena2 = 0;

// Escena 4
let textoEscena4 = 
  "El silencio se rompe en un instante:\n" +
  "mi mano desciende, y su ojo ya no volverá a mirarme.";
let textoMostrado4 = "";
let indiceTexto4 = 0;

// Escena 5
let textoEscena5 = "Al fin cesó el latido. El anciano yacía rígido; apoyé mi mano sobre su pecho unos segundos. Su ojo ya no me atormentaba.";
let textoMostrado5 = "";
let indiceTexto5 = 0;
let tiempoInicioEscena5 = 0;

// Escena 6
let textoEscena6 = 
  "Llamaron a la puerta. ¿Qué podía temer ya? Tres oficiales entraron. Un vecino había escuchado un grito; la sospecha los trajo hasta aquí.";
let textoMostrado6 = "";
let indiceTexto6 = 0;

// Escena 9
let textoEscena9 = 
  "¡No podía soportar más el latido! Cada golpe resonaba en mi cabeza, consumiéndome por completo.\n\n—¡Miserables! —exclamé—. No disimuléis más tiempo; confieso el crimen. ¡Arrancad esas tablas; ahí está, ahí está! ¡Es el latido de su espantoso corazón!";
let textoMostrado9 = "";
let indiceTexto9 = 0;
let tiempoInicioEscena9 = 0;

// Máscara
let mascaraescena2;

// Sonido
let corazonAudio, golpeAudio, sodaAudio, typewriterAudio;

// Ojos
let ojosGlobo = [];      // Ojos del globo de pensamiento
let ojosEscena8 = [];    // Ojos flotantes en escena 8

// Fade
let fadeAlpha = 0;
let fadeActive = false;

// Escena 7
let tiempoInicioEscena7 = 0;

// Control de audio typewriter
let typewriterStarted = false;
let typewriterStopped = false;

// PRELOAD
function preload() {
  imgEscena1 = loadImage("puertaviejo.jpeg");
  imgEscena2 = loadImage("viejodurmiendo.jpg");
  protadurmiendo = loadImage("protadurmiendo.png");
  huellasImg = loadImage("huellas.png");
  imgMuerteViejo = loadImage("muerteviejo.png");
  cuchilloImg = loadImage("cuchillo.png");
  sangreGif = loadImage("sangre.gif");
  puerta = loadImage("puerta.png");
  policia = loadImage("policias.png");
  tablas = loadImage("tablas.jpg");
  succes = loadImage("succes.jpg");
  imgEscena10 = loadImage("creditos.png");
}

// SETUP
function setup() {
  createCanvas(600, 400);
  noStroke();
  textFont("Courier New");
  textSize(16);

  // Mascara linterna
  mascaraescena2 = createGraphics(width, height);

  // Ojos escena 8
  for (let i = 0; i < 100; i++) {
    ojosEscena8.push({
      x: random(width),
      y: random(height),
      t: random(20, 50),
    });
  }

  // Audio desde HTML
  corazonAudio = document.getElementById('corazonAudio');
  golpeAudio = document.getElementById('golpeAudio');
  sodaAudio = document.getElementById('sodaAudio');
  typewriterAudio = document.getElementById('typewriterAudio');
}

// DRAW
function draw() {
  background(0);

  if (estado === -1) dibujarEscenaMenos1();
  else if (estado === 0) dibujarEscena0();
  else if (estado === 1) dibujarEscena1();
  else if (estado === 2) dibujarEscena2();
  else if (estado === 3) dibujarEscena3();
  else if (estado === 4) dibujarEscena4();
  else if (estado === 5) dibujarEscena5();
  else if (estado === 6) dibujarEscena6();
  else if (estado === 7) dibujarEscena7();
  else if (estado === 8) dibujarEscena8();
  else if (estado === 9) dibujarEscena9();
  else if (estado === 10) dibujarEscena10();
}

// INTERACCIONES
function mousePressed() {
  if (estado === -1) {
    estado = 0;
    if (!typewriterStarted) {
      typewriterAudio.play();
      typewriterStarted = true;
    }
  }

  // Escena 0
  if (estado === 0) {
    // Botón SKIP
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
    mouseY > height - 40 && mouseY < height - 10) {
      textoMostrado = textoIntro;
      indiceTexto = textoIntro.length;
    }

    // Botón ojo
    if (indiceTexto >= textoIntro.length) {
      if (mouseX > width / 2 - 35 && mouseX < width / 2 + 35 &&
          mouseY > height / 2 - 35 && mouseY < height / 2 + 35) {
        estado = 1;
        indiceTexto1 = 0;
        textoMostrado1 = "";
      }
    }

  // Escena 1
  } else if (estado === 1) {
    if (mouseX > 210 && mouseX < 250 && mouseY > 210 && mouseY < 270) estado = 2;
    if (mouseX > width - 100 && mouseX < width - 20 && mouseY > height - 100 && mouseY < height - 20) estado = 3;
    indiceTexto4 = 0;
    textoMostrado4 = "";

  // Escena 2
  } else if (estado === 2) {
    if (mouseX > 235 && mouseX < 275 && mouseY > 195 && mouseY < 235) estado = 4;

  // Escena 3
  } else if (estado === 3) {
    if (mouseX > 350 - 80 && mouseX < 350 + 80 && mouseY > 100 - 50 && mouseY < 100 + 50) estado = 2;
    if (mouseX > 100 && mouseX < 160 && mouseY > 160 && mouseY < 220) fadeActive = true;

  // Escena 4
  } else if (estado === 4) {
    if (mouseX > 360 && mouseX < 410 && mouseY > 170 && mouseY < 210) {
      estado = 5;
      tiempoInicioEscena5 = millis();
      indiceTexto5 = 0;
      textoMostrado5 = "";
    }

  // Escena 5
  } else if (estado === 5) {
    if (mouseX > 70 && mouseX < 200 && mouseY > 360 && mouseY < 390) estado = 6;
    if (mouseX > 430 && mouseX < 560 && mouseY > 360 && mouseY < 390) estado = 7;

  // Escena 6
  } else if (estado === 6) {
    golpeAudio.play();
    if (indiceTexto6 >= textoEscena6.length) {
      if (mouseX > 200 && mouseX < 400 && mouseY > 150 && mouseY < 250) estado = 8; 
    }

  // Escena 7
  } else if (estado === 7) {
    if (tiempoInicioEscena7 === 0) tiempoInicioEscena7 = millis();
    if (millis() - tiempoInicioEscena7 > 5000) estado = 10;

  // Escena 8
  } else if (estado === 8) {
    if (mouseX > 150 && mouseX < 300 && mouseY > 180 && mouseY < 210) estado = 7;
    if (mouseX > 320 && mouseX < 470 && mouseY > 180 && mouseY < 210) estado = 9;

  // Escena 9
  } else if (estado === 9) {
    estado = 10;

  // Escena 10
  } else if (estado === 10) {
    let bx = width / 2;
    let by = height / 2 + 110;
    let bw = 200;
    let bh = 40;
    if (mouseX > bx - bw / 2 && mouseX < bx + bw / 2 &&
        mouseY > by - bh / 2 && mouseY < by + bh / 2) {
      // Reiniciar escena 0
      estado = -1;
      indiceTexto = 0;
      textoMostrado = "";
      fadeAlpha = 0;
      fadeActive = false;
      ojosGlobo = [];
      typewriterStarted = false;
      typewriterStopped = false;
      sodaAudio.pause();
      sodaAudio.currentTime = 0;
    }
  }
}

// FUNCIONES

// Dibuja un ojo
function dibujarOjo(x, y, tamaño) {
  push();
  translate(x, y);
  fill(240, 240, 210);
  ellipse(0, 0, tamaño * 1.4, tamaño);
  for (let r = tamaño * 0.35; r > 0; r--) {
    let inter = map(r, tamaño * 0.35, 0, 1, 0);
    fill(lerpColor(color(180, 220, 255), color(30, 60, 100), inter));
    ellipse(0, 0, r * 2, r * 2);
  }
  fill(0);
  let pupila = tamaño * 0.1 + sin(frameCount * 0.02) * 3;
  ellipse(0, 0, pupila * 2);
  pop();
}

// Dibuja globo de pensamiento
function dibujarGloboPensamiento(x, y) {
  push();
  fill(255, 80);
  ellipse(x, y, 150, 100);
  ellipse(x - 60, y + 40, 40, 30);
  ellipse(x - 90, y + 70, 20, 15);
  pop();

  if (frameCount % 30 === 0) {
    let ox = x + random(-50, 50);
    let oy = y + random(-30, 30);
    let tam = random(10, 25);
    ojosGlobo.push({x: ox, y: oy, t: tam});
  }

  for (let o of ojosGlobo) {
    dibujarOjo(o.x, o.y, o.t);
  }
}

// ESCENAS

function dibujarEscenaMenos1() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Hacé click para comenzar", width / 2, height / 2);

  if (frameCount % 60 < 30) {
    rect(width / 2 - 5, height / 2 + 30, 10, 10);
  }
}

function dibujarEscena0() {
  // Texto animado letra por letra
  if (frameCount % 2 == 0 && indiceTexto < textoIntro.length) {
    textoMostrado += textoIntro[indiceTexto];
    indiceTexto++;
  }

  fill(255);
  textAlign(CENTER, CENTER);
  text(textoMostrado, 50, 50, 500, 300);

  // Ojo aparece cuando termina el texto
  if (indiceTexto >= textoIntro.length) {
    dibujarOjo(width / 2, height / 2, 70);
    if (!typewriterStopped) {
      typewriterAudio.pause();
      typewriterStopped = true;
    }
  }

  // Botón SKIP
  fill(0, 150);
  rect(width/2 - 50, height - 40, 100, 30, 5);
  push();
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("SALTAR TEXTO", width/2, height - 25);
  pop();
}




// Escena 1: Puerta habitación viejo
function dibujarEscena1() {
  image(imgEscena1, 0, 0, width, height);
  
  // Texto que aparece letra por letra
  if (frameCount % 2 == 0 && indiceTexto1 < textoEscena1.length) {
    textoMostrado1 += textoEscena1[indiceTexto1];
    indiceTexto1++;
  }
  fill(255);
  textAlign(CENTER, TOP);
  textSize(12);
  text(textoMostrado1, 50, 10, 500, 150);

  // mouse over estas coordenadas dibuja el ojo
  if (mouseX > 210 && mouseX < 250 && mouseY > 210 && mouseY < 270) {
    dibujarOjo(230, 240, 30);
  }

  // imagen huellas
  image(huellasImg, width - 100, height - 100, 80, 80);
}

// Escena 2: Mascara linterna. Viejo durmiendo
function dibujarEscena2() {

  let ojoX = 255, ojoY = 215, tamaño = 20;
  let capa = createGraphics(width, height);
  capa.image(imgEscena2, 0, 0, width, height);

  // Ojo dibujado
  capa.push();
  capa.translate(ojoX, ojoY);
  capa.fill(240, 240, 210);
  capa.noStroke();
  capa.ellipse(0, 0, tamaño * 1.4, tamaño);
  for (let r = tamaño * 0.35; r > 0; r--) {
    let inter = map(r, tamaño * 0.35, 0, 1, 0);
    capa.fill(lerpColor(color(180, 220, 255), color(30, 60, 100), inter));
    capa.ellipse(0, 0, r * 2, r * 2);
  }
  let pupila = tamaño * 0.1 + sin(frameCount * 0.01) * 3;
  capa.fill(0);
  capa.ellipse(0, 0, pupila * 2);
  capa.pop();

  // Linterna
  mascaraescena2.clear();
  mascaraescena2.fill(255);
  mascaraescena2.noStroke();
  mascaraescena2.ellipse(mouseX, mouseY, 180, 180);

  let aplicarMascara = capa.get();
  aplicarMascara.mask(mascaraescena2);
  image(aplicarMascara, 0, 0, width, height);
  
    // Texto animado letra por letra
  if (frameCount % 2 == 0 && indiceTexto2 < textoEscena2.length) {
    textoMostrado2 += textoEscena2[indiceTexto2];
    indiceTexto2++;
    if (indiceTexto2 === 1) tiempoInicioEscena2 = millis();
  }

  fill(255);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(textoMostrado2, 0, 300, 580, 100);

  // Reproducir corazonAudio 
  if (tiempoInicioEscena2 > 0 && millis() - tiempoInicioEscena2 > 3000 && corazonAudio.paused) {
    corazonAudio.play();
  }
}

// Escena 3: Protagonista durmiendo
function dibujarEscena3() {
  image(protadurmiendo, 0, 0, width, height);
  dibujarGloboPensamiento(350, 100);
  
  // interruptor
  push();
  stroke(139, 69, 19);
  strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    line(0, -5 - i * 5, 0, -10 - i * 5);
    ellipse(122, 212 - i * 5, 3, 3);
  }
  pop();

  // Fade out
  if (fadeActive) {
    fadeAlpha += 1;   
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    if (fadeAlpha >= 255) estado = 10;
  }
}



// Escena 4: Ataque
function dibujarEscena4() {
  image(imgMuerteViejo, 0, 0, width, height);
  dibujarOjo(375, 195, 40);
  
    // TEXTO letra por letra
  if (frameCount % 2 == 0 && indiceTexto4 < textoEscena4.length) {
    textoMostrado4 += textoEscena4[indiceTexto4];
    indiceTexto4++;
  }

  // Texto en rojo
  fill(200, 0, 0);
  textAlign(CENTER, TOP);
  textSize(18);
  text(textoMostrado4, 50, 20, 500, 100);

  // mouse over estas coordenadas dibuja el cuchillo
  if (mouseX > 360 && mouseX < 410 && mouseY > 170 && mouseY < 210) {
    imageMode(CENTER);
    image(cuchilloImg, mouseX, mouseY, 80, 60);
    imageMode(CORNER);
  }

    corazonAudio.play();
  
}

// Escena 5: Muerte
function dibujarEscena5() {
  image(imgMuerteViejo, 0, 0, width, height);
  image(sangreGif, 0, 0, width, height);
  image(sangreGif, 200, 0, width, height);

  // Texto letra por letra
  if (frameCount % 2 == 0 && indiceTexto5 < textoEscena5.length) {
    textoMostrado5 += textoEscena5[indiceTexto5];
    indiceTexto5++;
  }

  fill(255);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(textoMostrado5, 50, 250, 500, 100);

  // Botones 5 segundos después de entrar en escena 5
  if (millis() - tiempoInicioEscena5 > 7000) {
    push();
    fill(0);
    noStroke();
    rect(70, 360, 130, 30, 10); 
    rect(430, 360, 130, 30, 10);
    pop();

    fill(255); 
    textSize(12);
    textAlign(CENTER, CENTER);
    text("ESCONDER CADAVER", 135, 360 + 30/2); 
    text("DESCUARTIZARLO", 500, 360 + 30/2);
  }
}


// Escena 6: Puerta
function dibujarEscena6() {
  image(puerta, 0, 0, width, height);

  // Texto animado letra por letra
  if (frameCount % 2 === 0 && indiceTexto6 < textoEscena6.length) {
    textoMostrado6 += textoEscena6[indiceTexto6];
    indiceTexto6++;
  }

  // Texto inferior
  fill(255);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(textoMostrado6, 0, 300, 550, 100);

  // Mostrar botón SOLO cuando terminó el texto
  if (indiceTexto6 >= textoEscena6.length) {
    let rectX = width/2 - 80;
    let rectY = height/2 + 20;
    let rectW = 160;
    let rectH = 30;

    // Opción: dibujar un texto adicional arriba
    fill(255, 200);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("ABRIR LA PUERTA", width / 2, height / 2);
  }
}

// Escena 7: Te saliste con la tuya
function dibujarEscena7() {
  sodaAudio.play();
  
  background(0);
  image(succes, 0, 0, width, height);
  
  // Guardar el inicio de la escena si aún no está guardado
  if (tiempoInicioEscena7 === 0) {
    tiempoInicioEscena7 = millis();
  }

  // Después de 5 segundos, cambiar a escena 10
  if (millis() - tiempoInicioEscena7 > 5000) {
    estado = 10;
    tiempoInicioEscena7 = 0; // reset para cuando se vuelva a escena 7
  }
}

// Escena 8: Policias en la puerta
function dibujarEscena8() {
  image(policia, 0, 0, width, height);
  
  corazonAudio.play();

  // --- OJOS flotando en el medio ---
  for (let o of ojosEscena8) {
    dibujarOjo(o.x, o.y, o.t);
  }

  // --- SUPERPOSICIÓN DE SANGRE ---
  push();
  tint(255, 180); // semitransparente
  image(sangreGif, 0, 0, width, height);
  image(sangreGif, 200, 0, width, height);
  pop();
  
  fill(0, 100); 
  rect(150, 180, 150, 30); // Quedarse callado 
  rect(320, 180, 150, 30); // Confesar
  
  fill(255); 
  textSize(16); 
  text("Quedarse callado", 225, 200); 
  text("Confesar", 395, 200);
}

// Escena 9: Confesión
function dibujarEscena9() {
  image(tablas, 0, 0, width, height);
  
  corazonAudio.play();
  
    // Texto animado letra por letra
  if (frameCount % 2 === 0 && indiceTexto9 < textoEscena9.length) {
    textoMostrado9 += textoEscena9[indiceTexto9];
    indiceTexto9++;
    if (indiceTexto9 === 1) tiempoInicioEscena9 = millis();
  }

  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(textoMostrado9, 50, 50, 500, 300);

  // Cambiar a escena 10 despuues de 15 segundos
  if (tiempoInicioEscena9 > 0 && millis() - tiempoInicioEscena9 > 17000) {
    estado = 10;
    textoMostrado9 = "";
    indiceTexto9 = 0;
  }

}

// Escena 10: créditos
function dibujarEscena10() {
  image(imgEscena10, 0, 0, width, height);
  
  sodaAudio.play();
  
  fill(255);
  textSize(16);
  text("REINICIAR", width / 2, height / 2 + 110);
}
