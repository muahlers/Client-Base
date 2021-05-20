import * as Phaser from 'phaser';
import Player from '../classes/Player';
import Spawner from '../classes/Spawner';
import Obstaculo from '../classes/Obstaculo';
import PowerUp from '../classes/PowerUp';
import { randomNumber, uptoCookie } from '../utils/utils';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
  }

  create() {
    this.physics.world.setBounds(0, 0, window.game.config.width, window.game.config.height);
    // [1/2 stage, 1 stage, end]
    this.flags = [true, true, true];
    this.frames = window.game.loop.actualFps;

    const timer = this.time.addEvent({
      delay: 400,
      callback: this.updateFrame,
      args: [],
      callbackScope: this,
      loop: true,
    });

    this.backPast = 0;

    this.createGroups();
    this.createMusic();
    this.createBackground();
    this.createAnime();
    this.createPlayers();
    this.setupEventListener();
    this.createBlocks();
    this.createDestroyer();
    this.createInput();
    this.addCollision();
  }

  update() {
    this.updateStage();
    this.updatePlayer();
    this.updateBlocks();
    this.updateBackground();
  }

  // Funciones Metodo Create()

  createGroups() {
    this.walls = this.physics.add.group();
    this.blocks = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.finals = this.physics.add.group();
  }

  createMusic() {
    this.music = this.sound.add('battle');
    const configMusic = {
      mute: false,
      volume: 0.3,
      detune: 1,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.music.play(configMusic);
  }

  createBackground() {
    this.bg0 = this.add.tileSprite(0, 0, window.game.config.width, window.game.config.width, 'background0');
    this.bg0.setOrigin(0);
    this.bg0.setScale(1.94, 1.67);
    this.bg0.setScrollFactor(0);

    this.bg1 = this.add.tileSprite(0, 0, window.game.config.width, window.game.config.width, 'background1');
    this.bg1.setOrigin(0);
    this.bg1.setScale(1.94, 1.67);
    this.bg1.setScrollFactor(0);

    this.bg2 = this.add.tileSprite(0, 0, window.game.config.width, window.game.config.height, 'background2');
    this.bg2.setOrigin(0);
    this.bg2.setScale(1.94, 1.67);
    this.bg2.setScrollFactor(0);
  }

  createAnime() {
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('powerUp', {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'grey',
      frames: this.anims.generateFrameNumbers('powerUp', {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'bikeGoing',
      frames: this.anims.generateFrameNumbers('bike', {
        start: 0,
        end: 7,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'bikeDown',
      frames: this.anims.generateFrameNumbers('bike', {
        start: 9,
        end: 17,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'bikeUp',
      frames: this.anims.generateFrameNumbers('bike', {
        start: 18,
        end: 26,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'bikeJump',
      frames: this.anims.generateFrameNumbers('bike', {
        start: 45,
        end: 51,
      }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: 'bikeCrush',
      frames: this.anims.generateFrameNumbers('bike', {
        start: 27,
        end: 31,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // Animación Enemigos
    this.anims.create({
      key: 'retenMovil',
      frames: this.anims.generateFrameNumbers('retenMovil', {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'bus',
      frames: this.anims.generateFrameNumbers('bus', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'people',
      frames: this.anims.generateFrameNumbers('people', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'moto',
      frames: this.anims.generateFrameNumbers('moto', {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'vago',
      frames: this.anims.generateFrameNumbers('vago', {
        start: 0,
        end: 0,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'sedan',
      frames: this.anims.generateFrameNumbers('sedan', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'sedanAlt',
      frames: this.anims.generateFrameNumbers('sedanAlt', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'vieja',
      frames: this.anims.generateFrameNumbers('vieja', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'moncho',
      frames: this.anims.generateFrameNumbers('moncho', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'skater',
      frames: this.anims.generateFrameNumbers('skater', {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'carrito',
      frames: this.anims.generateFrameNumbers('carrito', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'motoPaco',
      frames: this.anims.generateFrameNumbers('motoPaco', {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'algodon',
      frames: this.anims.generateFrameNumbers('algodon', {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'carpa',
      frames: this.anims.generateFrameNumbers('carpa', {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'carpaAlt',
      frames: this.anims.generateFrameNumbers('carpaAlt', {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'oficinista',
      frames: this.anims.generateFrameNumbers('oficinista', {
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'perro',
      frames: this.anims.generateFrameNumbers('perro', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'telefono',
      frames: this.anims.generateFrameNumbers('telefono', {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'camioneta',
      frames: this.anims.generateFrameNumbers('camioneta', {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'moneda',
      frames: this.anims.generateFrameNumbers('items', {
        start: 0,
        end: 3,
      }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: 'final',
      frames: this.anims.generateFrameNumbers('final', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'final2',
      frames: this.anims.generateFrameNumbers('final2', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createBlocks() {
    // Extraigo en que nivel va el jugador
    const playerData = JSON.parse(localStorage.getItem('myPlayerData'));
    this.blockSpwaner = new Spawner(
      this,
      playerData.level,
      this.playerBaseLevelSpeed,
      playerData.nextLevel,
    );
    // Podria Sacar lv Distance a una clase de Etapas.
    this.levelDistance = this.blockSpwaner.lvDistance();
    this.blockSpwaner.drawBlockFromSpawner();
  }

  createDestroyer() {
    this.destroyer = this.add.tileSprite(-window.game.config.width / 2, window.game.config.height / 2, 2, window.game.config.height, 'items', 0);
    this.physics.world.enable(this.destroyer);
    this.destroyer.body.setImmovable();
  }

  createPlayers() {
    const playerData = JSON.parse(localStorage.getItem('myPlayerData'));

    // Meto la info del juego al objeto Jugador.
    this.player = new Player(
      this,
      playerData.x,
      playerData.y,
      'bike',
      0,
      playerData.distance,
      playerData.velocity,
      playerData.jumps,
      playerData.propina,
      playerData.termo,
      playerData.totalHeat,
    );

    this.playerBaseLevelSpeed = playerData.velocity;
    this.coinValues = playerData.coinValues;
  }

  createInput() {
    this.keybord = true;
    this.keyA = this.input.keyboard.addKey('A');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyS = this.input.keyboard.addKey('S');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyZ = this.input.keyboard.addKey('Z');
    this.keyX = this.input.keyboard.addKey('X');
    this.cursor = this.input.keyboard.createCursorKeys(); // Creo un objeto que escucha el teclado!!
  }

  addCollision() {
    this.physics.add.collider(this.blocks, this.blocks);
    this.blocksCollide = this.physics.add.collider(this.player, this.blocks);
    this.physics.add.collider(this.blocks, this.destroyer, this.destroyBlock, null, this);
    this.physics.add.collider(this.powerUps, this.blocks);
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.blocks, this.crush, null, this);
    this.physics.add.overlap(this.player, this.finals, this.endStage, null, this);
    this.physics.add.overlap(this.player, this.coins, this.getCoin, null, this);
  }

  // Funciones Metodo Update()

  updatePlayer() {
    this.player.update(this.cursor);

    // Mensaje para la UI
    if (this.flags[1]) this.player.distance += (this.player.velocity / 1000) * (40 / this.frames);
    // Envio infromación para UISCcene.
    this.events.emit('updatePlayer',
      this.player.velocity,
      Math.floor(this.player.distance),
      this.levelDistance,
      this.player.propina,
      this.blockSpwaner.level,
      this.player.jumps,
      this.player.name,
      this.player.heat);
    // Player is Death.
    if (this.player.x < 0) {
      console.log('Dead');

      const playerData = JSON.parse(localStorage.getItem('myPlayerData'));
      let adnRoad = '';
      for (let i = 0; i < playerData.road.length; i++) {
        adnRoad += playerData.road[i];
      }

      // Creo Cookie para manadar a base de Datos.
      uptoCookie(this.player.name, playerData.level, adnRoad, playerData.level1Service);
      alert(document.cookie);

      // Apago Señales y Musica.
      this.cutScene(); // Si muero no debiera ganar propina.
      // TODO:
      // window.location.href = 'endstage.php';
      this.scene.start('Death');
    }
  }

  updateStage() {
    // Powers Up
    if (this.player.distance > this.levelDistance / 2 && this.flags[0]) {
      console.log('powerUp');
      this.flags[0] = false;

      const powerUp = new PowerUp(
        this,
        randomNumber(0, window.game.config.width),
        randomNumber(80, window.game.config.height - 80),
      );
      this.powerUps.add(powerUp);
      powerUp.drawPowerUp();
    }

    // Finish Level
    if (this.player.distance > this.levelDistance && this.flags[1]) {
      this.flags[1] = false;
      // Jugardo deja de enfriar la hamburguesa.
      this.player.playerEndStage();
      const playerData = JSON.parse(localStorage.getItem('myPlayerData'));
      // Mido Servicio en nivel 1 para entender performance de distintos pc's.
      if (playerData.level === 1) {
        playerData.level1Service = this.player.heat;
      }

      // Grabo el Heat para Kiosko y Tomo distancia acumulada.
      playerData.totalHeatLS = this.player.heat - 1;
      playerData.totalDistance += this.levelDistance;

      // Guardo la info del jugador para la proxima etápa
      localStorage.setItem('myPlayerData', JSON.stringify(playerData));

      // Inicio el fin de la Etapa.
      // Apago Spawner.
      this.blockSpwaner.turnOff();
      // Ejecuto el fin de la etapa con un retraso.
      console.log('Call first delay');
      this.time.delayedCall(15000, this.toEndStage, null, this);
    }
  }

  updateBlocks() {
    this.blockSpwaner.drawBlockFromSpawner();
  }

  updateBackground() {
    // Extraigo Velocidad de jugador para acelerar los movimientos de fondo. No es muy eficiente!
    if (this.flags[2]) {
      this.bg0.tilePositionX += (15 / this.frames) * (this.playerBaseLevelSpeed / 160);
      this.bg1.tilePositionX += (30 / this.frames) * (this.playerBaseLevelSpeed / 160);
      this.bg2.tilePositionX += (60 / this.frames) * (this.playerBaseLevelSpeed / 160);
      this.backPast += (60 / this.frames) * (this.playerBaseLevelSpeed / 160);
      // console.log(`frames : ${this.frames}, delata Px: ${this.backPast} , Dist: ${this.player.distance}`);
    }
  }

  updateFrame() {
    this.frames = window.game.loop.actualFps;
  }

  // Funciones Auxiliares Juego.

  destroyBlock(destroyer, block) {
    this.blocks.remove(block, true, true);
  }

  pickPowerUp(player, powerUp) {
    // powerUp.disableBody(true, true);
    this.powerUps.remove(powerUp, true, true);
    // Elimino Collaide entre jugador y Bloques.
    this.blocksCollide.active = false;
    player.playerChangeSpeed(100);

    this.tweens.add({
      targets: player,
      alpha: 0.3,
      scaleX: 0.2,
      scaleY: 0.2,
      duration: 3500,
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        // Restablezco Collaide entre jugador y Bloques.
        this.blocksCollide.active = true;
        player.playerChangeSpeed(-100);
      },
      callbackScope: this,
    });
  }

  getCoin(player, coin) {
    this.coins.remove(coin, true, true);
    // const coinValue = 25;
    player.getPropinaStreet(this.coinValues);
  }

  // Funciones para cerrar Escena.

  toEndStage() {
    console.log('Draw Finale');
    // Dibujo final en row 2
    this.blockSpwaner.drawEnd(2);
    this.time.delayedCall(7000, this.stopBackground, null, this);
  }

  endStage() {
    // Apago Señales y Musica.
    this.cutScene();
    this.scene.start('Kiosko');
  }

  stopBackground() {
    this.flags[2] = false;
  }

  cutScene() {
    const playerData = JSON.parse(localStorage.getItem('myPlayerData'));
    // Pago propina
    playerData.propina = this.player.propina;
    // Aumento el nivel de la etapa.
    playerData.level += 1;

    if (this.player.heat > 80) {
      playerData.propina += 600;
      playerData.propinaLS = 600;
    } else if (this.player.heat > 60) {
      playerData.propina += 400;
      playerData.propinaLS = 400;
    } else if (this.player.heat > 40) {
      playerData.propina += 300;
      playerData.propinaLS = 300;
    } else if (this.player.heat > 20) {
      playerData.propina += 100;
      playerData.propinaLS = 100;
    } else {
      playerData.propinaLS = 0;
    }

    // Remuevo el arreglo de etapas para dar una mayor variedad al momento de jugar
    const sacoEtapa = playerData.levels.shift();

    // ELigo una Etapa al azar.
    const lastStage = playerData.nextLevel;
    // Reviso que la nueva etapa no se repita.
    while (lastStage === playerData.nextLevel) {
      playerData.nextLevel = playerData.levels[randomNumber(0, playerData.levels.length)];
    }

    console.log(`next stage: ${playerData.nextLevel}`);
    // Agrego la etapa que Saque!
    playerData.levels.push(sacoEtapa);

    // Creo un string con todas las etapas que el jugador ha pasado.
    switch (playerData.nextLevel) {
      case 'city':
      {
        playerData.road[playerData.road.length] = 'c';
        break;
      }
      case 'walkingLane':
      {
        playerData.road[playerData.road.length] = 'w';
        break;
      }
      case 'highway':
      {
        playerData.road[playerData.road.length] = 'h';
        break;
      }
      case 'protesta':
      {
        playerData.road[playerData.road.length] = 'p';
        break;
      }
      case 'callejon':
      {
        playerData.road[playerData.road.length] = 'j';
        break;
      }
      default: break;
    }

    localStorage.setItem('myPlayerData', JSON.stringify(playerData));
    //  Apago las señales.
    this.events.off('spawnBlock');
    this.events.off('playerJump');
    this.events.off('playerFinishJump');

    this.music.stop();
    this.scene.stop('Ui');
  }

  // Funcion que gatilla Spawner y Player

  setupEventListener() {
    // Event Listener: spawnBlock.
    this.events.on('spawnBlock', (x, y, height, outlet, type) => {
      // const block = this.add.tileSprit(x, y, width, height, key, frame);
      const block = new Obstaculo(
        this,
        x,
        y,
        height,
        outlet,
        type,
        this.playerBaseLevelSpeed,
      );
      // Pongo el bloque en su grupo.
      if (type === 'wall') {
        this.walls.add(block);
      } else if (type === 'final') {
        this.finals.add(block);
        block.stopObstaculo(7000);
      } else if (block.type === 'moneda') {
        this.coins.add(block);
      } else this.blocks.add(block);
      // Dibujo el Bloque en la Escena de Juego.
      block.drawObstaculo();
    });

    // Event Listener: Player Jump.
    this.events.on('playerJump', () => {
      // El Jugador no puede chocar
      this.blocksCollide.active = false;

      this.tweens.add({
        targets: this.player,
        alpha: 0.5,
        scaleX: 1,
        scaleY: 1,
        duration: 500,
        repeat: 0,
        yoyo: true,
        onComplete: () => {
          // No hago nada
        },
        callbackScope: this,
      });
    });

    // Event Listener: Player Finish Jump.
    this.events.on('playerFinishJump', () => {
      // Permito que el jugador pueda chocar de nuevo.
      this.blocksCollide.active = true;
    });
  }
}
