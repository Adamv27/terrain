import { settings } from "./settings.js";
import { noise } from "./perlin.js";

noise.seed(Math.random());

class World {
  constructor(columns, rows) {
    this.x = 0;
    this.y = 0;
    
    this.rows = rows;
    this.columns = columns;
    this.grid = Array.from(Array(rows), () => new Array(columns).fill(0));
    this.generateNew();
  }
  generateNew() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let value = noise.perlin2(column * settings.RANDOMNESS, row * settings.RANDOMNESS)
        this.grid[row][column] = value;
      }
    }
  } 

  setFillFromGridValue(ctx, value) {
    let colors = settings.COLORS;
    let color = colors.ocean.deep;

    if (value >= 0.55) {
      color = colors.mountain.high;
    } else if (value >= 0.3) {
      color = colors.mountain.low[(Math.floor(Math.random() * colors.mountain.low.length))];
    } else if (value >= 0) {
      color = colors.grass[(Math.floor(Math.random() * colors.grass.length))]
    } else if (value >= -0.08) {
      color = colors.sand[(Math.floor(Math.random() * colors.sand.length))]
    } else if (value >= -0.15) {
      color = colors.ocean.shallow
    }
    ctx.fillStyle = color;
  }
  
  move(dx, dy) {
    this.y += dy;
    this.x += dx;
    console.log(this.x);
    if (dy < 0) {
      this.grid.pop()
      this.grid = [new Array(this.columns).fill(0), ...this.grid]
      this.grid[0].forEach((column, index) => {
        let xVal = (index) * settings.RANDOMNESS
        let yVal = this.y * settings.RANDOMNESS
        this.grid[0][index] = noise.perlin2(xVal, yVal)});
    } else if (dy > 0) {
      this.grid.shift();
      this.grid.push(new Array(this.columns).fill(0))
      this.grid[this.rows - 1].forEach((column, index) => {
        let xVal = (this.x + index) * settings.RANDOMNESS
        let yVal = (this.y + this.rows) * settings.RANDOMNESS
        this.grid[this.rows - 1][index] = noise.perlin2(xVal, yVal)});
    }
    if (dx > 0) {
      this.grid.forEach(row => {
        row.shift()
      })
      console.log(this.grid[0]);
      this.grid.forEach((row, index) => {
        let xVal = (this.x + this.columns) * settings.RANDOMNESS
        let yVal = (this.y + index) * settings.RANDOMNESS
        this.grid[index][this.columns - 1] = noise.perlin2(xVal, yVal);
      })
    }
  }


  render(ctx) {
    this.grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        this.setFillFromGridValue(ctx, column)       
        const x = columnIndex * settings.TILE_SIZE
        const y = rowIndex * settings.TILE_SIZE
        ctx.fillRect(x, y, settings.TILE_SIZE, settings.TILE_SIZE)
      })
    })
  }
}

export { World }
