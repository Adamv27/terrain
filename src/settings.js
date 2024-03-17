const SCALE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--scale"));

const settings = {}
settings.TILE_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tile-size"));
settings.WIDTH = (16 * settings.TILE_SIZE) * (SCALE);
settings.HEIGHT = (9 * settings.TILE_SIZE) * (SCALE);
settings.FREQUENCY = 0.05


const terrain = { 
  maxSandHeight: -0.12, 
  maxOceanHeight: -0.2,
  oceanShallow: -0.15,
  oceanDeep: -0.3,
}

const colors = {
  tundra: '#9BE1E5',
  desert: '#FFD668',
  savanna: '#656600',
  swamp: '#343300',
  rainforest: '#5FCB6F',
  forest: '#22932A',
  grassland: '#52A434',

  grass: ['#BEEA41', '#A9CE21'], // A9CE21

  ocean: {
    shallow: '#62BCDE',
    deep: '#5996C6'
  },
  sand: ['#F6D7B0'], // ECCCA2 E1BF92
  mountain: {
    low: ['#3A3232'], // 2d2c2c
    high: 'white'
  }
}

export { settings, colors, terrain };
