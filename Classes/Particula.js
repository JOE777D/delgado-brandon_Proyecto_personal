class Particula {
  constructor(_x, _y, _tamanoInicial) {
    this.pos = createVector(_x, _y);
    this.tamanoInicial = _tamanoInicial;
    this.tamano = _tamanoInicial;
    this.colorcir = random(10); // Valor inicial para el ruido del color
    this.Opacidad = 255; // Opacidad inicial
    this.isAlive = true;
    this.deathTime = 150; // Tiempo de muerte
    this.subparticulas = [];
  }

  update() {
    // Escalado y opacidad
    if (this.Opacidad > 0) {
      this.Opacidad -= 2;
      this.tamano *= 1.05;
    }

    // Crear nuevas subpartículas
    if (frameCount % 10 === 0 && this.subparticulas.length < 5 && this.Opacidad > this.deathTime) {
      let nuevaSubparticula = createVector(this.pos.x + random(-20, 20), this.pos.y + random(-20, 20));
      this.subparticulas.push(new Subparticula(nuevaSubparticula.x, nuevaSubparticula.y));
    }

    // Actualizar subpartículas
    for (let i = this.subparticulas.length - 1; i >= 0; i--) {
      this.subparticulas[i].update();
      if (!this.subparticulas[i].isAlive) {
        this.subparticulas.splice(i, 1);
      }
    }

    // Verificar muerte de la partícula
    if (this.Opacidad <= 0) {
      this.isAlive = false;
    }
  }

  display() {
    // Modificar el color utilizando noise() dentro de un rango determinado
    let r = noise(this.colorcir) * 150 + 50;
    let g = noise(this.colorcir + 5) * 150 + 50;
    let b = noise(this.colorcir + 10) * 150 + 50;

    fill(r, g, b, this.Opacidad);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.tamano);

    // Dibujar subpartículas
    for (let i = 0; i < this.subparticulas.length; i++) {
      this.subparticulas[i].display();
    }
  }
}

class Subparticula {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.isAlive = true;
  }

  update() {
    // Lógica de actualización de subpartícula
    // ...

    // Simulación de muerte aleatoria de subpartículas
    if (random(1) < 0.1) {
      this.isAlive = false;
    }
  }

  display() {
    // Dibujar subpartícula
    // ...
  }
}