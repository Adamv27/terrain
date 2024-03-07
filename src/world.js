import { settings } from "../src/settings.js";
import { noise } from "../lib/perlin.js";
import { getFillColorFromValue } from "../lib/utils.js";


class World {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;

    this.rows = height / settings.TILE_SIZE;
    this.columns = width / settings.TILE_SIZE;
    this.grid = Array.from(Array(this.rows), () => new Array(this.columns).fill(0));
    
    this.cache = new Map();
    
    this.seed = Math.random();
    this.generate();

    this.dragging = false;
  }

  seedCache() {
    for (let i = -500; i < 500; i++) {
      for (let j = -500; j < 500; j++) {
        const strFormat = `${j},${i}`
        const value = noise.perlin2(j * settings.RANDOMNESS, i * settings.RANDOMNESS)
        this.cache.set(strFormat, value)
      }
    }
  }

  generate() {
    noise.seed(this.seed);

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const xVal = column + this.x
        const yVal = row + this.y
        const strFormat = `${xVal},${yVal}`
        let value;
        if (this.cache.has(strFormat)) {
          value = this.cache.get(strFormat)
        } else {
          value = noise.perlin2(xVal * settings.RANDOMNESS, yVal * settings.RANDOMNESS)
          this.cache.set(strFormat, value)
        }
        this.grid[row][column] = value;
      }
    }
  }
  
  update() {
    if (this.dx == 0 && this.dy == 0) return;
    this.x += this.dx
    this.y += this.dy;
    this.generate()
  }

  handleEvent(event) {
    switch (event.type) {
      case 'keydown':
        if (event.key == 'w') this.dy = -1;
        else if (event.key == 's') this.dy = 1;
        else if (event.key == 'a') this.dx = -1;
        else if (event.key == 'd') this.dx = 1;
        break;
      case 'keyup':
        if (event.key == 'w' || event.key == 's') this.dy = 0;
        else if (event.key == 'a' || event.key == 'd') this.dx = 0;
        break; 
      case 'mousedown':
        if (!this.dragging) this.dragging = true;
        break;
      case 'mouseup':
        if (this.dragging) this.dragging = false;
        break;
      case 'mousemove':
        if (this.dragging) console.log('drag');
        break;
    }
  }

  render(ctx) {
    this.grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        ctx.fillStyle = getFillColorFromValue(column)
        const x = columnIndex * settings.TILE_SIZE
        const y = rowIndex * settings.TILE_SIZE
        ctx.fillRect(x, y, settings.TILE_SIZE, settings.TILE_SIZE)
      })
    })
    ctx.font = "24px serif"
    ctx.fillStyle = "#FFF"
    ctx.fillText(`(${this.x}, ${this.y})`, 10, 25)
  }
}

export { World }
