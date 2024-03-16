import { colors } from '../src/settings.js'



const getFillColor = (altitude, temperature, percipitation) => {
  if (altitude < -0.25) {
    return colors.ocean.shallow 
  }

  temperature = mapToRange(temperature, -1, 1, -10, 35)
  percipitation = mapToRange(percipitation, -1, 1, 0, 425);
}


const getFillColorFromValue = value => {
  let color;

  if (value > 0.55) {
    color = colors.mountain.high;
  } else if (value >= 0.3) {
    color = colors.mountain.low[(Math.floor(Math.random() * colors.mountain.low.length))];
  } else if (value >= 0.05) {
    color = colors.grass[1];
  } else if (value >= -0.17) {
    color = colors.grass[0]
  } else if (value >= -0.25) {
    color = colors.sand[(Math.floor(Math.random() * colors.sand.length))]
  } else if (value >= -0.4) {
    color = colors.ocean.shallow
  } else {
    color = colors.ocean.deep 
  }

  return color 
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



export { getFillColorFromValue, getFillColor, mapToRange, hsvToRgb }
