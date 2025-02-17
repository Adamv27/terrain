const SCALE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--scale"));

const settings = {}
settings.TILE_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tile-size"));
settings.WIDTH = (16 * settings.TILE_SIZE) * (SCALE);
settings.HEIGHT = (9 * settings.TILE_SIZE) * (SCALE);
settings.FREQUENCY = 0.05
settings.ALTITUDE_FREQ = 0.02
settings.PERCIPITATION_FREQ = 0.02
settings.TILE_SIZE = 5


const terrain = {
  sand: -0.12, 
  oceanShallow: -0.25,
  oceanDeep: -0.5,
  forest: 0.15,
  mountainLow: 0.4,
  mountainHigh: 0.55,
  snow: 0.7
}

const colors = {
  forest: '#22932A',
  grassland: '#52A434',
  sand: ['#F6D7B0'],
  ocean: {
    shallow: '#62BCDE',
    deep: '#5996C6'
  },
  mountain: {
    low: '#3A3232', // 2d2c2c
    high: '#2d2c2c',
    snow: '#FFFFFF'
  }
}

export { settings, colors, terrain };
