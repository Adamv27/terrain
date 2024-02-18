import { colors } from '../src/settings.js'

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

export { getFillColorFromValue }
