import { randomNum } from '../utils/utils';

export default class Spawner {
  constructor(scene, level, playerSpeed, stage) {
    this.scene = scene;
    // platform max and min height, as screen height ratio
    this.playerSpeed = playerSpeed;
    // Adjust oultes spawn area.
    this.offset = 8;
    // Level #
    this.level = level;
    // Name of the Stage.
    this.stage = stage;

    this.stages = [
      {
        type: 'city',
        blocks: [
          'wall',
          'wall',
          'vieja_people_moncho',
          'sedan_retenMovil',
          'sedan',
          'bus',
          'carrito_vago',
          'vieja_people',
        ],
      },
      {
        type: 'walkingLane',
        blocks: [
          'wall',
          'wall',
          'carrito_vago',
          'vieja_people_moncho',
          'vieja_people_skater',
          'vieja_people_moncho',
          'vieja_people_skater',
          'vieja_people_moncho',
        ],
      },
      {
        type: 'highway',
        blocks: [
          'wall',
          'wall',
          'sedan',
          'sedan',
          'moto_motoPaco',
          'sedan_retenMovil',
          'bus',
          'bus',
        ],
      },
      {
        type: 'protesta',
        blocks: [
          'wall',
          'wall',
          'retenMovil',
          'people',
          'people_moncho',
          'people',
          'people_moncho',
          'retenMovil',
        ],
      },
      {
        type: 'callejon',
        blocks: [
          'wall',
          'wall',
          'moto_motoPaco',
          'moto_motoPaco',
          'moto_motoPaco',
          'moto_motoPaco',
          'wall',
          'wall',
        ],
      },
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

    this.start(); // Funcion que crea los obj del Spawner.
  }

  start() {
    this.createSpawmer();
  }

  createSpawmer() {
    // Imprimo los tipos de blockes que debe producir cada outlet.
    Object.keys(this.stages).forEach((stage) => {
      if (this.stages[stage].type === this.stage) {
        Object.keys(this.stages[stage].blocks).forEach((block) => {
          console.log(this.outlet[block]);
          this.outlet[block].type = this.stages[stage].blocks[block];
        });
      }
    });

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
    // setup de los timers para dibujar
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
    // Emito una señal a GameScene para dibujar un obstaculos
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

  playerSpeedLevel() {
    return this.playerSpeed;
  }
}
