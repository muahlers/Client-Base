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
    this.city = [
      'wall',
      'wall',
      'vieja_people_moncho',
      'sedan_retenMovil',
      'sedan',
      'bus',
      'carrito_vago',
      'vieja_people',
    ];
    // stage 2
    this.walkingLane = [
      'wall',
      'wall',
      'carrito_vago',
      'vieja_people_moncho',
      'vieja_people_skater',
      'vieja_people_moncho',
      'vieja_people_skater',
      'vieja_people_moncho',
    ];
    // stage 3
    this.highway = [
      'wall',
      'wall',
      'sedan',
      'sedan',
      'moto_motoPaco',
      'sedan_retenMovil',
      'bus',
      'bus',
    ];
    // stage 4
    this.protesta = [
      'wall',
      'wall',
      'retenMovil',
      'people',
      'people_moncho',
      'people',
      'people_moncho',
      'retenMovil',
    ];
    // Stage 5
    this.callejon = [
      'wall',
      'wall',
      'moto_motoPaco',
      'moto_motoPaco',
      'moto_motoPaco',
      'moto_motoPaco',
      'wall',
      'wall',
    ];

    this.obstaculosStats = [

      {
        type: 'wall',
        platformSpawnRange: [0, 0],
        xPosition: 0,
      },

      {
        type: 'bus',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'retenMovil',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'vago',
        platformSpawnRange: [2000, 6000],
        xPosition: window.game.config.width,
      },

      {
        type: 'people',
        platformSpawnRange: [2000, 6000],
        xPosition: window.game.config.width,
      },

      {
        type: 'moto',
        platformSpawnRange: [3000, 6000],
        xPosition: window.game.config.width,
      },

      {
        type: 'motoPaco',
        platformSpawnRange: [3000, 6000],
        xPosition: window.game.config.width,
      },

      {
        type: 'sedan',
        platformSpawnRange: [1500, 5000],
        xPosition: window.game.config.width,
      },

      {
        type: 'vieja',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'moncho',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'skater',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'carrito',
        platformSpawnRange: [3000, 7000],
        xPosition: window.game.config.width,
      },

      {
        type: 'sedan_retenMovil',
        platformSpawnRange: [2500, 5000],
        xPosition: window.game.config.width,
      },

      {
        type: 'vieja_people',
        platformSpawnRange: [3000, 6500],
        xPosition: window.game.config.width,
      },

      {
        type: 'vieja_vago',
        platformSpawnRange: [3000, 6500],
        xPosition: window.game.config.width,
      },
      {
        type: 'vieja_people_moncho',
        platformSpawnRange: [3000, 6500],
        xPosition: window.game.config.width,
      },
      {
        type: 'vieja_people_skater',
        platformSpawnRange: [3000, 6500],
        xPosition: window.game.config.width,
      },
      {
        type: 'moto_motoPaco',
        platformSpawnRange: [3000, 6000],
        xPosition: window.game.config.width,
      },
      {
        type: 'carrito_vago',
        platformSpawnRange: [3000, 6000],
        xPosition: window.game.config.width,
      },
      {
        type: 'people_moncho',
        platformSpawnRange: [2000, 6000],
        xPosition: window.game.config.width,
      },
    ];

    this.outlet = [
      {
        id: 1,
        name: 'outlet1',
        pixelsWidth: window.game.config.height / 8 - 20,
        yPosition: 0 + 20,
        canDraw: true,
        on: true,
      },
      {
        id: 2,
        name: 'outlet2',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: window.game.config.height / 8 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 3,
        name: 'outlet3',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 2 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 4,
        name: 'outlet4',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 3 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 5,
        name: 'outlet5',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 4 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 6,
        name: 'outlet6',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 5 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 7,
        name: 'outlet7',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 6 + this.offset,
        canDraw: true,
        on: true,
      },
      {
        id: 8,
        name: 'outlet8',
        pixelsWidth: window.game.config.height / 8 - this.offset * 2,
        yPosition: (window.game.config.height / 8) * 7,
        canDraw: true,
        on: true,
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
    Object.keys(this.outlet).forEach((outlet) => {
      Object.keys(this.obstaculosStats).forEach((enemy) => {
        if (this.outlet[outlet].type === this.obstaculosStats[enemy].type) {
          this.outlet[outlet].platformSpawnRange = this.obstaculosStats[enemy].platformSpawnRange;
          this.outlet[outlet].xPosition = this.obstaculosStats[enemy].xPosition;
        }
      });
    });
    return true;
  }

  drawBlockFromSpawner() {
    // this.objectCreated = [];
    const timer = [];
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].canDraw && this.outlet[i].on) {
        this.outlet[i].canDraw = false;
        // Este if es para ver si es un Obstaculo o una Wall.
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
    this.scene.events.emit('spawnBlock',
      this.outlet[i].xPosition, // X position
      this.outlet[i].yPosition, // Y position
      this.outlet[i].pixelsWidth, // height
      this.outlet[i].name, // Outlet
      this.outlet[i].type);
    // Permito que el outlet vuelva a dibujar.
    this.outlet[i].canDraw = true;
  }

  turnOff() {
    Object.keys(this.outlet).forEach((outlet) => {
      this.outlet[outlet].on = false;
    });
  }

  drawEnd(i) {
    // Emito una señal a GameScene
    this.scene.events.emit('spawnBlock',
      this.outlet[i].xPosition, // X position
      this.outlet[i].yPosition, // Y position
      this.outlet[i].pixelsWidth, // height
      this.outlet[i].name, // Outlet
      'final'); // tipo
  }

  lvDistance() {
    return this.level * 80;
  }
}
