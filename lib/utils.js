import { colors } from '../src/settings.js'

const getFillColorFromValue = value => {
  let color = colors.ocean.deep 

  if (value > 0.55) {
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

  return color 
}

export { getFillColorFromValue }
