import { settings } from './settings.js'
import { World } from './world.js'


class Engine {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = settings.WIDTH;
    this.canvas.height = settings.HEIGHT;
    this.ctx = canvas.getContext('2d')

    this.world = new World(settings.WIDTH, settings.HEIGHT);
    
    this.events = [];
    this.eventLoop();
  }

  eventLoop() {
    window.requestAnimationFrame(() => this.eventLoop()) 
    
    this.events.forEach(event => {
      this.world.handleEvent(event)
    })

    this.events = []
    this.world.update();
    this.world.render(this.ctx);
  }

  enqueueEvent(key) {
    this.events.push(key)
  }
}


const engine = new Engine();

document.addEventListener('keydown', e => engine.enqueueEvent(e));
document.addEventListener('keyup', e => engine.enqueueEvent(e));
document.addEventListener('mousedown', e => engine.enqueueEvent(e));
document.addEventListener('mousemove', e => engine.enqueueEvent(e));
document.addEventListener('mouseup', e => engine.enqueueEvent(e));
