import { noise } from "../lib/perlin.js";
import { settings } from "./settings.js";
import { mapToRange, hsvToRgb } from "../lib/utils.js";

const button = document.getElementById('generate-example') 
const canvas = document.getElementById('perlin-example');

const WIDTH = 100;
const HEIGHT = 100;

canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d')


const generatePerlin = () => {
  noise.seed(Math.random());
  
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const perlinValue = noise.perlin2(i * settings.RANDOMNESS, j * settings.RANDOMNESS);
      let value = mapToRange(perlinValue, -1, 1, 0, 1);

      const rgbColor = hsvToRgb(0, 0, value);
      ctx.fillStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      ctx.fillRect(j, i, 1, 1) ;
    }
  }
}

generatePerlin();

button.addEventListener('click', () => {
  generatePerlin();
})
