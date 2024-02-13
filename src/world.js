import { settings } from "../src/settings.js";
import { noise } from "../lib/perlin.js";
import { getFillColorFromValue } from "../lib/utils.js";

noise.seed(Math.random());

class World {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    
    this.rows = height / settings.TILE_SIZE;
    this.columns = width / settings.TILE_SIZE;
    this.grid = Array.from(Array(this.rows), () => new Array(this.columns).fill(0));
    this.generateNew();

    this.dragging = false;
    this.dx = 0;
    this.dy = 0;
  }

  generateNew() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let value = noise.perlin2(column * settings.RANDOMNESS, row * settings.RANDOMNESS)
        this.grid[row][column] = value;
      }
    }
  }
  
  update() {
    if (this.dx == 0 && this.dy == 0) return;
    
    /*
    const directionMagnitude = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy))
    const normalizedDx = this.dx / directionMagnitude
    const normalizedDy = this.dy / directionMagnitude
    */
    
    this.x += this.dx
    this.y += this.dy;

    if (this.dy < 0) {
      this.grid.pop()
      this.grid = [new Array(this.columns).fill(0), ...this.grid]
      this.grid[0].forEach((column, index) => {
        let xVal = (this.x + index) * settings.RANDOMNESS
        let yVal = this.y * settings.RANDOMNESS
        this.grid[0][index] = noise.perlin2(xVal, yVal)});
    } else if (this.dy > 0) {
      this.grid.shift();
      this.grid.push(new Array(this.columns).fill(0))
      this.grid[this.rows - 1].forEach((column, index) => {
        let xVal = (this.x + index) * settings.RANDOMNESS
        let yVal = (this.y + this.rows) * settings.RANDOMNESS
        this.grid[this.rows - 1][index] = noise.perlin2(xVal, yVal)});
    }
    if (this.dx > 0) {
      this.grid.forEach(row => {
        row.shift()
      })
      this.grid.forEach((row, index) => {
        let xVal = (this.x + this.columns) * settings.RANDOMNESS
        let yVal = (this.y + index) * settings.RANDOMNESS
        this.grid[index][this.columns - 1] = noise.perlin2(xVal, yVal);
      })
    } else if (this.dx < 0) {
      this.grid.forEach(row => {
        row.pop()
      })
      this.grid.forEach((row, index) => {
        let xVal = this.x * settings.RANDOMNESS
        let yVal = (this.y + index) * settings.RANDOMNESS
        this.grid[index] = [noise.perlin2(xVal, yVal), ...row]
      })
    }
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
  }
}

export { World }
