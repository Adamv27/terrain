import { colors, terrain } from '../src/settings.js'



const getFillColor = (altitude, temperature, percipitation) => {
  if (altitude < terrain.oceanDeep) {
    return colors.ocean.deep
  } else if (altitude < terrain.oceanShallow) {
    return colors.ocean.shallow
  }
  
  // Remap perlin values to whittaker values
  temperature = interpolate(temperature, -1, 1, -10, 45)
  percipitation = interpolate(percipitation, -1, 1, -10, 450);
  
  if (temperature < 0 && percipitation > 100) {
    percipitation = 100
  } else if (temperature < 10 && percipitation > 300) {
    percipitation = 300
  } else if (temperature < 20 && percipitation > 400) {
    percipitation = 400
  }
  
  const color = colors.grassland

  if (percipitation < 100) {
    if (temperature < 0) {
      return colors.tundra
    } else if (temperature < 20) {
      return colors.grassland
    } else if (temperature < 35) {
      return colors.desert
    }
  } else if (percipitation < 225) {
    if (temperature < 35 && temperature > 20) {
      return colors.savanna
    }
  } else if (percipitation < 300) {
    if (temperature < 20) {
      return colors.forest 
    } else if (temperature < 35) {
      return colors.rainforest 
    }
  } else {
    if (temperature < 20 && temperature > 10) {
      return colors.swamp 
    } else {
      return colors.rainforest 
    }
  }

  return color; 
  //console.log(`TEMP: ${temperature} RAIN: ${percipitation}`)
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
