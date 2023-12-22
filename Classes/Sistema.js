let sistema;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sistema = new Sistema();
}

function draw() {
  background(255, 20);
  sistema.update();
  sistema.display();
}

class Sistema {
  constructor() {
    this.particulas = [];
  }

  update() {
    // Lógica de actualización del sistema
    for (let i = 0; i < this.particulas.length; i++) {
      this.particulas[i].update();
      if (!this.particulas[i].isAlive) {
        this.particulas.splice(i, 1);
      }
    }

    // Crear nuevas partículas
    if (frameCount % 60 === 0) {
      let nuevaParticula = createVector(random(width), random(height));
      this.particulas.push(new Particula(nuevaParticula.x, nuevaParticula.y, 10));
    }
  }

  display() {
    // Dibujar partículas del sistema
    for (let i = 0; i < this.particulas.length; i++) {
      this.particulas[i].display();
    }
  }
}
