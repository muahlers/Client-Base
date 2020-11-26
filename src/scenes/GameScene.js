import * as Phaser from 'phaser';
import Player from '../classes/Player';
import Spawner from '../classes/Spawner';
import Obstaculo from '../classes/Obstaculo';
import { randomNumber } from '../utils/utils';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
  }

  create() {
    this.physics.world.setBounds(0, 0, window.game.config.width, window.game.config.height);

    this.walls = this.physics.add.group();
    this.blocks = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.finals = this.physics.add.group();

    this.flags = [true, true, true];

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
  createMusic() {
    this.music = this.sound.add('battle');
    const configMusic = {
      mute: false,
      volume: 0.5,
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
      key: 'final',
      frames: this.anims.generateFrameNumbers('carrito', {
        start: 0,
        end: 7,
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
      playerData.velocity,
      playerData.nextLevel,
    );
    // Podria Sacar lvDistance a una clase de Etapas.
    this.levelDistance = this.blockSpwaner.lvDistance();
    this.drawBlock(this.blockSpwaner);
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
  }

  // Funciones Metodo Update()

  updatePlayer() {
    this.player.update(this.cursor);

    const playerData = JSON.parse(localStorage.getItem('myPlayerData'));

    // Mensaje para la UI
    if (this.flags[1]) this.player.distance += this.player.velocity / 1000;

    this.events.emit('updatePlayer',
      Math.floor(this.player.x),
      Math.floor(this.player.y),
      this.player.velocity,
      Math.floor(this.player.distance),
      this.levelDistance,
      this.player.propina,
      playerData.level,
      this.player.jumps,
      this.player.name,
      this.player.heat);

    if (this.player.x < 0) {
      this.scene.start('Title');
      console.log('Dead');

      let adnRoad = '';
      for (let i = 0; i < playerData.road.length; i++) {
        adnRoad += playerData.road[i];
      }
      console.log(adnRoad);
      this.uptoCookie(this.player.name, playerData.level, adnRoad);

      // Apago Señales y Musica.
      this.cutScene();

      window.location.href = 'hiscore.php';
    }
  }

  updateStage() {
    // Powers Up
    if (this.player.distance > this.levelDistance / 2 && this.flags[0]) {
      console.log('powerUp');
      this.flags[0] = false;
      const powerUp = this.physics.add.sprite(16, 16, 'powerUp');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 80, window.game.config.width, window.game.config.height - 80);

      if (Math.random() > 0.5) {
        powerUp.play('red');
      } else {
        powerUp.play('grey');
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(0.8);
    }
    // Finish Level
    if (this.player.distance > this.levelDistance && this.flags[1]) {
      this.flags[1] = false;
      this.player.playerEndStage();
      const playerData = JSON.parse(localStorage.getItem('myPlayerData'));
      playerData.level += 1;

      if (this.player.heat >= 81) {
        playerData.propina += 600;
        playerData.propinaLS = 600;
      } else if (this.player.heat >= 61) {
        playerData.propina += 400;
        playerData.propinaLS = 400;
      } else if (this.player.heat >= 41) {
        playerData.propina += 300;
        playerData.propinaLS = 300;
      } else {
        playerData.propina += 100;
        playerData.propinaLS = 100;
      }

      playerData.totalHeatLS = this.player.heat - 1;
      playerData.totalDistance += this.levelDistance;

      // Remuevo el arreglo de etapas para dar una mayor variedad al momento de jugar
      const sacoEtapa = playerData.levels.shift();

      playerData.nextLevel = playerData.levels[randomNumber(0, playerData.levels.length)];

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
      console.log(playerData.road);
      // Agrego la etapa que Saque!
      playerData.levels.push(sacoEtapa);

      // Guardo la info del jugador para la proxima etápa
      localStorage.setItem('myPlayerData', JSON.stringify(playerData));

      // Me voy a las siguiente Escena.
      console.log(this.blocks);
      this.blockSpwaner.turnOff();

      this.time.delayedCall(7000, this.toEndStage, null, this);
    }
  }

  updateBlocks() {
    this.drawBlock(this.blockSpwaner);
  }

  updateBackground() {
    // Extraigo Velocidad de jugador para acelerar los movimientos de fondo. No es muy eficiente!
    this.bg0.tilePositionX += 0.375 * (this.player.velocity / 160);
    this.bg1.tilePositionX += 0.750 * (this.player.velocity / 160);
    this.bg2.tilePositionX += 1.500 * (this.player.velocity / 160);
  }

  // Funciones Auxiliares Juego.

  drawBlock(spawner) {
    spawner.drawBlockFromSpawner();
  }

  destroyBlock(destroyer, block) {
    this.blocks.remove(block, true, true);
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    // Elimino Collaide entre jugador y Bloques.
    this.blocksCollide.active = false;
    player.playerChangeSpeed(40);

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
        player.playerChangeSpeed(-40);
      },
      callbackScope: this,
    });
  }

  crush(player) {
    // player.playerHitObstacle();
  }

  endStage() {
    // Apago Señales y Musica.
    this.cutScene();
    this.scene.start('Kiosko');
  }

  toEndStage() {
    this.blockSpwaner.drawEnd(4);
  }

  // Funcion que gatilla Spawner
  setupEventListener() {
    // Event Listener: spawnBlock.
    this.events.on('spawnBlock', (x, y, height, outlet, type) => {
      // const block = this.add.tileSprit(x, y, width, height, key, frame);
      const block = new Obstaculo(this, x, y, height, outlet, type, this.player.velocity);
      if (type === 'wall') {
        this.walls.add(block);
      } else if (type === 'final') {
        this.finals.add(block);
      } else this.blocks.add(block);

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

  cutScene() {
    //  Apago las señales.
    this.events.off('spawnBlock');
    this.events.off('playerJump');
    this.events.off('playerFinishJump');

    this.music.stop();
  }

  // Funcion para crear cookie
  uptoCookie(player, level, road) {
    function setCookie(name, valueOne, valueTwo, valueThree, seg) {
      let expires = '';
      let now = '';
      if (seg) {
        const date = new Date();
        date.setTime(date.getTime());
        now = ` ${date.toUTCString()}`;
        date.setTime(date.getTime() + (seg * 1000));
        expires = `; expires=${date.toUTCString()}`;
      }
      const myObject = JSON.parse(`{"username":"${valueOne}","level": "${valueTwo}","road": "${valueThree}","deathTime":"${expires}"}`);

      document.cookie = `${name}=${JSON.stringify(myObject)}${expires}; path=/`;
    }
    setCookie('ppkcookie', player, level, road);
  }
}
