import { noise } from "../lib/perlin.js";
import { settings } from "./settings.js";

const button = document.getElementById('generate-example') 
const canvas = document.getElementById('perlin-example');

const WIDTH = 100;
const HEIGHT = 100;

canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d')


function interpolate(value, minInput, maxInput, minOutput, maxOutput) {
    return minOutput + (maxOutput - minOutput) * (value - minInput) / (maxInput - minInput);
}

function mapToRange(value, minInput, maxInput, minOutput, maxOutput) {
    // Map value from input range to [0, 1]
    const normalizedValue = (value - minInput) / (maxInput - minInput);
    // Interpolate within the output range
    return interpolate(normalizedValue, 0, 1, minOutput, maxOutput);
}

function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


const generatePerlin = () => {
  noise.seed(Math.random())
  
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const perlinValue = noise.perlin2(i * settings.RANDOMNESS, j * settings.RANDOMNESS)
      let value = mapToRange(perlinValue, -1, 1, 0, 1)
      const rgbColor = hsvToRgb(0, 0, value);
      ctx.fillStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      ctx.fillRect(j, i, 1, 1) 
    }
  }
}

generatePerlin();

button.addEventListener('click', () => {
  generatePerlin();
})
