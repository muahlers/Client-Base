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
          ['wall', 'parado'],
          ['wall', 'parado'],
          ['vieja_76_people_46_moncho_36_perro_6_moneda', 'gente'],
          ['sedan_46_retenMovil_5_moneda', 'autos'],
          ['sedan_46_camioneta_5_moneda', 'autos'],
          ['bus_6_moneda', 'normal'],
          ['carrito_76_vago_66_algodon_36_carpa_6_moneda', 'gente'],
          ['vieja_61_people_51_oficinista_6_moneda', 'gente'],
        ],
      },
      {
        type: 'walkingLane',
        blocks: [
          ['wall', 'parado'],
          ['wall', 'parado'],
          ['carrito_76_vago_66_algodon_36_carpa_6_moneda', 'gente'],
          ['vieja_61_people_51_oficinista_15_skater_6_moneda', 'gente'],
          ['vieja_76_people_61_skater_36_telefono_6_moneda', 'gente'],
          ['vieja_76_people_46_moncho_36_perro_6_moneda', 'gente'],
          ['vieja_76_people_71_skater_36_telefono_6_moneda', 'gente'],
          ['vieja_61_people_51_oficinista_15_moncho_6_moneda', 'gente'],
        ],
      },
      {
        type: 'highway',
        blocks: [
          ['wall', 'parado'],
          ['wall', 'parado'],
          ['sedan_46_camioneta_5_moneda', 'autos'],
          ['sedan_46_camioneta_5_moneda', 'autos'],
          ['moto_36_motoPaco_5_moneda', 'veloz'],
          ['sedan_46_retenMovil_5_moneda', 'autos'],
          ['bus_6_moneda', 'normal'],
          ['bus_6_moneda', 'normal'],
        ],
      },
      {
        type: 'protesta',
        blocks: [
          ['wall', 'parado'],
          ['wall', 'parado'],
          ['retenMovil_5_moneda', 'normal'],
          ['people_30_perro_9_moncho_6_moneda', 'gente'],
          ['people_15_perro_11_moncho_6_moneda', 'gente'],
          ['people_30_perro_9_moncho_6_moneda', 'gente'],
          ['people_15_perro_11_moncho_6_moneda', 'gente'],
          ['retenMovil_5_moneda', 'normal'],
        ],
      },
      {
        type: 'callejon',
        blocks: [
          ['wall', 'parado'],
          ['wall', 'parado'],
          ['moto_30_motoPaco_5_moneda', 'veloz'],
          ['moto_30_motoPaco_5_moneda', 'veloz'],
          ['moto_30_motoPaco_5_moneda', 'veloz'],
          ['moto_30_motoPaco_5_moneda', 'veloz'],
          ['wall', 'parado'],
          ['wall', 'parado'],
        ],
      },
    ];

    this.obstaculosStats = [

      {
        type: 'parado',
        platformSpawnRange: [0, 0],
        xPosition: 0,
      },
      {
        type: 'normal',
        platformSpawnRange: [3000, 7000].map((x) => x - (this.level * 75)),
        xPosition: window.game.config.width,
      },
      {
        type: 'veloz',
        platformSpawnRange: [2500, 5000].map((x) => x - (this.level * 75)),
        xPosition: window.game.config.width,
      },
      {
        type: 'gente',
        platformSpawnRange: [3000, 5000].map((x) => x - (this.level * 90)),
        xPosition: window.game.config.width,
      },
      {
        type: 'autos',
        platformSpawnRange: [3000, 5000].map((x) => x - (this.level * 75)),
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
          this.outlet[block].type = this.stages[stage].blocks[block];
        });
      }
    });

    // Relleno los oultes con las carecteristicas de los bloques.
    Object.keys(this.outlet).forEach((outlet) => {
      Object.keys(this.obstaculosStats).forEach((enemy) => {
        if (this.outlet[outlet].type[1] === this.obstaculosStats[enemy].type) {
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
            this.outlet[i].type[0]);
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
      this.outlet[i].type[0]);
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
    return (this.level * 90) + 100;
  }
}
