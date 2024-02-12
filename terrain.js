import { settings } from './settings.js'
import { noise } from './perlin.js'

const canvas = document.getElementById('canvas');
canvas.width = settings.WIDTH;
canvas.height = settings.HEIGHT;
const ctx = canvas.getContext('2d');


const setUp = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(10, 10, 1000, 1000);
  
  const rows = settings.HEIGHT / settings.TILE_SIZE;
  const columns = settings.WIDTH / settings.TILE_SIZE;
  
  noise.seed(Math.random());

  const grid = Array.from(Array(rows), () => new Array(columns).fill(0));
  const SCALE = 0.05;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let value = noise.perlin2(i * SCALE, j * SCALE);
      grid[i][j] = value;
    }
  }
  console.log(grid);
  drawGrid(grid);
}


const setCtx = value => {
  if (value >= 0.5) {
    ctx.fillStyle = 'white'
  } else if (value >= 0.3) {
    ctx.fillStyle = 'grey'
  } else if (value >= 0.1) {
    ctx.fillStyle = 'green' 
  } else if (value >= -0.08) {
    ctx.fillStyle = '#C2B280'
  } else if (value >= -0.15){
    ctx.fillStyle = '#51ACC2'
  } else {
    ctx.fillStyle = '#006992'
  }
}

const drawGrid = grid => {
  const colors = ['blue', 'green', 'red'];

  grid.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      setCtx(column)
      const x = columnIndex * settings.TILE_SIZE
      const y = rowIndex * settings.TILE_SIZE
      ctx.fillRect(x, y, settings.TILE_SIZE, settings.TILE_SIZE)
    })
  })
}


setUp();


