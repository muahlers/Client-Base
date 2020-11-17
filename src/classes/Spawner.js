// import * as Phaser from 'phaser';

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
    this.city = ['wall', 'wall', 'people', 'retenMovil', 'retenMovil', 'bus', 'grass', 'people'];
    // stage 2
    this.walkingLane = ['wall', 'wall', 'people', 'people', 'people', 'people', 'people', 'people'];
    // stage 3
    this.highway = ['wall', 'wall', 'retenMovil', 'bus', 'moto', 'retenMovil', 'retenMovil', 'bus'];
    // stage 4
    this.protesta = ['wall', 'wall', 'retenMovil', 'people', 'people', 'people', 'people', 'retenMovil'];

    this.wall = {
      type: 'wall',
      key: 'items',
      frame: 5,
      platformSpeedRange: [0, 0],
      platformSpawnRange: [0, 0],
      platformBlockHeight: [0, 2],
      xPosition: 0,
    };

    this.bus = {
      type: 'bus',
      key: 'bus',
      frame: 1,
      platformSpeedRange: [300 + 25 * this.level, 400 + 25 * this.level],
      platformSpawnRange: [3000, 7000],
      platformBlockHeight: [0, 2],
      xPosition: window.game.config.width,
    };

    this.car = {
      type: 'retenMovil',
      key: 'retenMovil',
      frame: 1,
      platformSpeedRange: [300, 400],
      platformSpawnRange: [3000, 7000],
      platformBlockHeight: [0, 2],
      xPosition: window.game.config.width,
    };

    this.grass = {
      type: 'grass',
      key: 'grass',
      frame: 1,
      platformSpeedRange: [160, 160],
      platformSpawnRange: [2000, 4000],
      platformBlockHeight: [0, 2],
      xPosition: window.game.config.width,
    };

    this.people = {
      type: 'people',
      key: 'people',
      frame: 1,
      platformSpeedRange: [180, 220],
      platformSpawnRange: this.spawnRange.map((x) => x - (this.level * 250)),
      platformBlockHeight: [0, 2],
      xPosition: window.game.config.width,
    };

    this.moto = {
      type: 'moto',
      key: 'moto',
      frame: 1,
      platformSpeedRange: [500, 600],
      platformSpawnRange: [1500, 4000],
      platformBlockHeight: [0, 2],
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
    this.setupEventListener();
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
        default: return null;
      }
    }

    // Relleno los oulters con las carecteristicas de los bloques.
    for (let i = 0; i < this.outlet.length; i++) {
      switch (this.outlet[i].type) {
        case 'wall':
        {
          this.outlet[i].frame = this.wall.frame;
          this.outlet[i].key = this.wall.key;
          this.outlet[i].platformSpeedRange = this.wall.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.wall.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.wall.platformBlockHeight;
          this.outlet[i].xPosition = this.wall.xPosition;
          break;
        }
        case 'bus':
        {
          this.outlet[i].frame = this.bus.frame;
          this.outlet[i].key = this.bus.key;
          this.outlet[i].platformSpeedRange = this.bus.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.bus.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.bus.platformBlockHeight;
          this.outlet[i].xPosition = this.bus.xPosition;
          break;
        }
        case 'retenMovil':
        {
          this.outlet[i].frame = this.car.frame;
          this.outlet[i].key = this.car.key;
          this.outlet[i].platformSpeedRange = this.car.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.car.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.car.platformBlockHeight;
          this.outlet[i].xPosition = this.car.xPosition;
          break;
        }
        case 'people':
        {
          this.outlet[i].frame = this.people.frame;
          this.outlet[i].key = this.people.key;
          this.outlet[i].platformSpeedRange = this.people.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.people.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.people.platformBlockHeight;
          this.outlet[i].xPosition = this.people.xPosition;
          break;
        }
        case 'grass':
        {
          this.outlet[i].frame = this.grass.frame;
          this.outlet[i].key = this.grass.key;
          this.outlet[i].platformSpeedRange = this.grass.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.grass.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.grass.platformBlockHeight;
          this.outlet[i].xPosition = this.grass.xPosition;
          break;
        }
        case 'moto':
        {
          this.outlet[i].frame = this.moto.frame;
          this.outlet[i].key = this.moto.key;
          this.outlet[i].platformSpeedRange = this.moto.platformSpeedRange;
          this.outlet[i].platformSpawnRange = this.moto.platformSpawnRange;
          this.outlet[i].platformBlockHeight = this.moto.platformBlockHeight;
          this.outlet[i].xPosition = this.moto.xPosition;
          break;
        }

        default: return null;
      }
    }
    return console.log('Spawner Creado');
  }

  setupEventListener() {
    this.scene.events.on('updateSpawners', (name) => {
      // Activo el Oultet.
      for (let i = 0; i < this.outlet.length; i++) {
        if (this.outlet[i].name === name) this.outlet[i].canDraw = true;
      }
    });
  }

  drawBlockFromSpawner() {
    // this.objectCreated = [];
    const timer = [];
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].canDraw) {
        this.outlet[i].canDraw = false;

        if (this.outlet[i].platformSpawnRange[0] > 0) {
          timer[i] = this.scene.time.addEvent({
            delay: this.randomNum(
              this.outlet[i].platformSpawnRange[0],
              this.outlet[i].platformSpawnRange[1],
            ),
            callback: this.reset,
            callbackScope: this,
            repeat: 0,
            args: [i],
          });
        } else {
          this.scene.events.emit('spawnBlock',
            this.outlet[i].xPosition, // X position
            this.outlet[i].yPosition, // Y position
            this.outlet[i].pixelsWidth, // height
            'items', // key
            this.outlet[i].frame, // frame
            this.randomNum(
              this.outlet[i].platformSpeedRange[0],
              this.outlet[i].platformSpeedRange[1],
            ), // Speed,
            this.outlet[i].name,
            // Outlet
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
      this.outlet[i].key, // key
      this.outlet[i].frame, // frame
      this.randomNum(
        this.outlet[i].platformSpeedRange[0],
        this.outlet[i].platformSpeedRange[1],
      ), // Speed,
      this.outlet[i].name, // Outlet
      this.outlet[i].type);
    // Permito que el outlet vuelva a dibujar.
    this.outlet[i].canDraw = true;
  }

  randomNum(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  speedUpSpawner() {
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].platformSpeedRange[0] > 0) {
        this.outlet[i].platformSpeedRange[0] += 100;
        this.outlet[i].platformSpeedRange[1] += 100;
      }
    }
  }

  speedDownSpawner() {
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].platformSpeedRange[0] > 100) {
        this.outlet[i].platformSpeedRange[0] -= 100;
        this.outlet[i].platformSpeedRange[1] -= 100;
      }
    }
  }

  decreaseBlockFreq() {
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].platformSpawnRange[0] > 500) {
        this.outlet[i].platformSpawnRange[1] -= 250;
        this.outlet[i].platformSpawnRange[1] -= 500;
      }
    }
  }

  increaseBlockFreq() {
    for (let i = 0; i < this.outlet.length; i++) {
      if (this.outlet[i].platformSpawnRange[0] > 0) {
        this.outlet[i].platformSpawnRange[1] += 250;
        this.outlet[i].platformSpawnRange[1] += 500;
      }
    }
  }

  lvDistance() {
    return this.level * 200;
  }
}
