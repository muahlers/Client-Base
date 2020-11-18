import { randomNum } from '../utils/utils';

export default class Spawner {
  constructor(scene, level, playerSpeed, stage) {
    this.scene = scene;
    // platform speed range, in pixels per second
    this.speedRange = [200, 250];
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    this.spawnRange = [3000, 7000];
    // platform width range, in pixels
    this.platformSizeRange = [100, 1600];
    // platform max and min height, as screen height ratio
    this.playerSpeed = playerSpeed;
    this.offset = 8;
    this.numberOfOutlets = 8;
    this.level = level;
    this.stage = stage;

    // stage 1
    this.city = ['wall', 'wall', 'people', 'sedan', 'sedan', 'bus', 'grass', 'people'];
    // stage 2
    this.walkingLane = ['wall', 'wall', 'people', 'vieja', 'people', 'people', 'vieja', 'people'];
    // stage 3
    this.highway = ['wall', 'wall', 'sedan', 'sedan', 'moto', 'retenMovil', 'bus', 'bus'];
    // stage 4
    this.protesta = ['wall', 'wall', 'retenMovil', 'people', 'people', 'people', 'people', 'retenMovil'];
    // Stage 5
    this.callejon = ['wall', 'wall', 'moto', 'moto', 'moto', 'moto', 'wall', 'wall'];

    this.wall = {
      type: 'wall',
      platformSpawnRange: [0, 0],
      xPosition: 0,
    };

    this.bus = {
      type: 'bus',
      platformSpawnRange: [3000, 7000],
      xPosition: window.game.config.width,
    };

    this.car = {
      type: 'retenMovil',
      platformSpawnRange: [3000, 7000],
      xPosition: window.game.config.width,
    };

    this.grass = {
      type: 'grass',
      platformSpawnRange: [2000, 4000],
      xPosition: window.game.config.width,
    };

    this.people = {
      type: 'people',
      platformSpawnRange: this.spawnRange.map((x) => x - (this.level * 250)),
      xPosition: window.game.config.width,
    };

    this.moto = {
      type: 'moto',
      platformSpawnRange: [2000, 4000],
      xPosition: window.game.config.width,
    };

    this.sedan = {
      type: 'sedan',
      platformSpawnRange: [1500, 4000],
      xPosition: window.game.config.width,
    };

    this.vieja = {
      type: 'vieja',
      platformSpawnRange: [3000, 5000],
      xPosition: window.game.config.width,
    };

    this.outlet = [
      {
        id: 1,
        name: 'outlet1',
        pixelsWidth: window.game.config.height / 8 - 20,
        yPosition: 0 + 20,
        canDraw: true,
      },
      {
        id: 2,
        name: 'outlet2',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: window.game.config.height / 8 + this.offset,
        canDraw: true,
      },
      {
        id: 3,
        name: 'outlet3',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 2 + this.offset,
        canDraw: true,
      },
      {
        id: 4,
        name: 'outlet4',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 3 + this.offset,
        canDraw: true,
      },
      {
        id: 5,
        name: 'outlet5',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 4 + this.offset,
        canDraw: true,
      },
      {
        id: 6,
        name: 'outlet6',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 5 + this.offset,
        canDraw: true,
      },
      {
        id: 7,
        name: 'outlet7',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 6 + this.offset,
        canDraw: true,
      },
      {
        id: 8,
        name: 'outlet8',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 7,
        canDraw: true,
      },
    ];

    this.start(); // Funcion que queda corriendo y crea los obj del Spawner.
  }

  start() {
    this.createSpawmer();
  }

  createSpawmer() {
    // Imprimo los tipos de blockes que debe producir cada outlet.
    for (let i = 0; i < this.numberOfOutlets; i++) {
      switch (this.stage) {
        case 'city':
        {
          this.outlet[i].type = this.city[i];
          break;
        }
        case 'walkingLane':
        {
          this.outlet[i].type = this.walkingLane[i];
          break;
        }
        case 'highway':
        {
          this.outlet[i].type = this.highway[i];
          break;
        }
        case 'protesta':
        {
          this.outlet[i].type = this.protesta[i];
          break;
        }

        case 'callejon':
        {
          this.outlet[i].type = this.callejon[i];
          break;
        }
        default: return null;
      }
    }

    // Relleno los oultes con las carecteristicas de los bloques.
    for (let i = 0; i < this.outlet.length; i++) {
      switch (this.outlet[i].type) {
        case 'wall':
        {
          this.outlet[i].platformSpawnRange = this.wall.platformSpawnRange;
          this.outlet[i].xPosition = this.wall.xPosition;
          break;
        }
        case 'bus':
        {
          this.outlet[i].platformSpawnRange = this.bus.platformSpawnRange;
          this.outlet[i].xPosition = this.bus.xPosition;
          break;
        }
        case 'retenMovil':
        {
          this.outlet[i].platformSpawnRange = this.car.platformSpawnRange;
          this.outlet[i].xPosition = this.car.xPosition;
          break;
        }
        case 'people':
        {
          this.outlet[i].platformSpawnRange = this.people.platformSpawnRange;
          this.outlet[i].xPosition = this.people.xPosition;
          break;
        }
        case 'grass':
        {
          this.outlet[i].platformSpawnRange = this.grass.platformSpawnRange;
          this.outlet[i].xPosition = this.grass.xPosition;
          break;
        }
        case 'moto':
        {
          this.outlet[i].platformSpawnRange = this.moto.platformSpawnRange;
          this.outlet[i].xPosition = this.moto.xPosition;
          break;
        }

        case 'sedan':
        {
          this.outlet[i].platformSpawnRange = this.sedan.platformSpawnRange;
          this.outlet[i].xPosition = this.sedan.xPosition;
          break;
        }

        case 'vieja':
        {
          this.outlet[i].platformSpawnRange = this.vieja.platformSpawnRange;
          this.outlet[i].xPosition = this.vieja.xPosition;
          break;
        }

        default: return null;
      }
    }
    return null;
  }

  drawBlockFromSpawner() {
    // this.objectCreated = [];
    const timer = [];
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].canDraw) {
        this.outlet[i].canDraw = false;
        // Este if es para ver si es un Obstaculo o una Wall
        if (this.outlet[i].platformSpawnRange[0] > 0) {
          timer[i] = this.scene.time.addEvent({
            delay: randomNum(
              this.outlet[i].platformSpawnRange[0],
              this.outlet[i].platformSpawnRange[1],
            ),
            callback: this.reset,
            callbackScope: this,
            repeat: 0,
            args: [i],
          });
        } else {
          // Emito Señal a GameScene. Este else es para dibujar las walls
          this.scene.events.emit('spawnBlock',
            this.outlet[i].xPosition, // X position
            this.outlet[i].yPosition, // Y position
            this.outlet[i].pixelsWidth, // height
            this.outlet[i].name, // Outlet
            this.outlet[i].type);
        }
      }
    }
  }

  reset(i) {
    // Emito una señal a GameScene
    console.log(this.outlet[i]);
    this.scene.events.emit('spawnBlock',
      this.outlet[i].xPosition, // X position
      this.outlet[i].yPosition, // Y position
      this.outlet[i].pixelsWidth, // height
      this.outlet[i].name, // Outlet
      this.outlet[i].type);
    // Permito que el outlet vuelva a dibujar.
    this.outlet[i].canDraw = true;
  }

  lvDistance() {
    return this.level * 200;
  }
}
