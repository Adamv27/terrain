import { settings } from './settings.js'
import { World } from './world.js'

const canvas = document.getElementById('canvas');
canvas.width = settings.WIDTH;
canvas.height = settings.HEIGHT;
//canvas.style.transform = `translate3d(${-settings.WIDTH / 4}px, ${-settings.HEIGHT / 4}px, 0)`

const ctx = canvas.getContext('2d');

const setUp = () => {
  const rows = settings.HEIGHT / settings.TILE_SIZE;
  const columns = settings.WIDTH / settings.TILE_SIZE;
  const world = new World(columns, rows);

  world.render(ctx);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
      world.move(0, -1)
      world.render(ctx)
    } else if (e.key === 's') {
      world.move(0, 1)
      world.render(ctx)
    } else if (e.key === 'd') {
      world.move(1, 0)
      world.render(ctx)
    } else if (e.key === 's') {
      world.move(-1, 0)
      world.render(ctx)
    }
  })
}

setUp();



