import { noise } from "../lib/perlin.js";
import { settings } from "./settings.js";
import { mapToRange, hsvToRgb } from "../lib/utils.js";

const WIDTH = 150;
const HEIGHT = 150;
const PIXEL_SIZE = 5;

const perlinCanvas = document.getElementById('perlin-example');
const perlinCtx = perlinCanvas.getContext('2d')
perlinCanvas.width = WIDTH;
perlinCanvas.height = HEIGHT;

const randomCanvas = document.getElementById('random-example')
const randomCtx = randomCanvas.getContext('2d')
randomCanvas.width = WIDTH;
randomCanvas.height = HEIGHT;

const terrainCanvas = document.getElementById('basic-terrain')
const terrainCtx = terrainCanvas.getContext('2d')
terrainCanvas.width = WIDTH;
terrainCanvas.height = HEIGHT;

const generatePerlin = () => {
  noise.seed(Math.random());
  
  for (let i = 0; i < HEIGHT; i += PIXEL_SIZE) {
    for (let j = 0; j < WIDTH; j += PIXEL_SIZE) {
      const perlinValue = noise.perlin2(i * settings.FREQUENCY, j * settings.FREQUENCY);
      const value = mapToRange(perlinValue, -1, 1, 0, 1);

      const rgbColor = hsvToRgb(0, 0, value);
      perlinCtx.fillStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      perlinCtx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
}


const generateRandom = () => {
  for (let i = 0; i < HEIGHT; i += PIXEL_SIZE) {
    for (let j = 0; j < WIDTH; j += PIXEL_SIZE) {
      const value = Math.random();
      const rgbColor = hsvToRgb(0, 0, value);
      randomCtx.fillStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      randomCtx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
}


const getFillColor = value => {
  if (value >= 0.5) {
    return '#BEEA41'
  } else if (value >= 0.4) {
    return '#F6D7B0'
  } else {
    return '#7AEEFF'
  }
}


const generateTerrain = () => {
  noise.seed(Math.random()) 
  for (let i = 0; i < HEIGHT; i += PIXEL_SIZE) {
    for (let j = 0; j < WIDTH; j += PIXEL_SIZE) {
      const perlinValue = noise.perlin2(i * settings.FREQUENCY, j * settings.FREQUENCY);
      terrainCtx.fillStyle = getFillColor(mapToRange(perlinValue, -1, 1, 0, 1));
      terrainCtx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
}


generateRandom();
generatePerlin();
generateTerrain();

const randomButton = document.getElementById('generate-random-example');
randomButton.addEventListener('click', () => {
  generateRandom();
})

const perlinButton = document.getElementById('generate-example');
perlinButton.addEventListener('click', () => {
  generatePerlin();
})

const terrainButton = document.getElementById('generate-terrain');
terrainButton.addEventListener('click', () => {
  generateTerrain();
})
