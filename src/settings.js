const SCALE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--scale"));

const settings = {}
settings.TILE_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tile-size"));
settings.WIDTH = (16 * settings.TILE_SIZE) * (SCALE);
settings.HEIGHT = (9 * settings.TILE_SIZE) * (SCALE);
settings.RANDOMNESS = 0.05

const colors = {
  sand: ['#F6D7B0'], // ECCCA2 E1BF92
  ocean: {
    shallow: '#7AFFE8',
    deep: '#7AEEFF'
  },
  grass: ['#BEEA41'], // A9CE21
  mountain: {
    low: ['#3A3232'], // 2d2c2c
    high: 'white'
  }
}

export { settings, colors };
