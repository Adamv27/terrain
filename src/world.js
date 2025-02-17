import { settings } from "../src/settings.js";
import { noise } from "../lib/perlin.js";
import { getFillColor } from "../lib/utils.js";


class World {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.zoom = 0

    this.rows = height / settings.TILE_SIZE;
    this.columns = width / settings.TILE_SIZE;
    console.log(this.rows, this.columns);
    this.heightMap = Array.from(Array(this.rows), () => new Array(this.columns).fill(0));
    this.percipitationMap = Array.from(Array(this.rows), () => new Array(this,this.columns).fill(0));

    this.heightSeed = Math.random();
    this.percipitationSeed = Math.random();
    
    this.cache = new Map();

    this.generate();

    this.dragging = false;
  }

  seedCache() {
    for (let i = -500; i < 500; i++) {
      for (let j = -500; j < 500; j++) {
        const strFormat = `${j},${i}`
        const value = noise.simplex2(j * settings.FREQUENCY, i * settings.FREQUENCY)
        this.cache.set(strFormat, value)
      }
    }
  }

  generate() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const xVal = column + this.x
        const yVal = row + this.y
        let altitude;
        let percipitation;

        const cacheKey = `${xVal},${yVal}`
        const cacheValue = this.cache.get(cacheKey);
        if (cacheValue) {
          [altitude, percipitation] = cacheValue;
        } else {
          noise.seed(this.heightSeed);
          const altitude = this.elevation(xVal, yVal);
           
          let frequency = settings.PERCIPITATION_FREQ
          noise.seed(this.percipitationSeed);
          const percipitation = noise.simplex2(xVal * frequency, yVal * frequency);
          
          this.cache.set(cacheKey, [altitude, percipitation])
        }
        
        this.heightMap[row][column] = altitude;
        this.percipitationMap[row][column] = percipitation;
      }
    }
  }

  elevation(x, y) {
    let frequency = settings.ALTITUDE_FREQ;

    let e = 1 * noise.simplex2(x * frequency, y * frequency) 
      + 0.5 * noise.simplex2(2 * frequency * x, 2 * frequency * y) 
      + 0.25 * noise.simplex2(4 * frequency * x, 4 * frequency * y);

    e = e / (1 + 0.5 + 0.25);

    return e;
  }

  
  
  update() {
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
        else if (event.key == 'e') this.zoom += 0.01;
        else if (event.key == 'q' && this.zoom > 0.01) this.zoom -= 0.01;
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
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let altitude = this.heightMap[row][column];
        let percipitation = this.percipitationMap[row][column];

        ctx.fillStyle = getFillColor(altitude, percipitation);
        const x = column * settings.TILE_SIZE;
        const y = row * settings.TILE_SIZE;
        ctx.fillRect(x, y, settings.TILE_SIZE, settings.TILE_SIZE);
        ctx.fillStyle = '#FFF'
      }
    }
    ctx.font = "24px serif"
    ctx.fillStyle = "#FFF"
    ctx.fillText(`(${this.x}, ${this.y})`, 15, 35)
  }
}

export { World }
