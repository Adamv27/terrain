import { colors, terrain } from '../src/settings.js'



const getFillColor = (altitude, rainfall) => {
  if (altitude < terrain.oceanDeep) return colors.ocean.deep;
  if (altitude < terrain.oceanShallow) return colors.ocean.shallow;
  if (altitude < terrain.sand) return colors.sand;
  
  if (altitude > 0.8) return colors.mountain.high;
  if (altitude > 0.6) return colors.mountain.low;


  return colors.grassland
}


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



export { getFillColor, mapToRange, hsvToRgb }
