export function obstaculoData(type, playerSpeed) {
  const frames = window.game.loop.actualFps;
  let data = {};
  switch (type) {
    case 'wall':
      data = {
        id: 'wall',
        width: window.window.game.config.width,
        height: 86,
        scale: 1,
        speed: 0,
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 0,
      };
      break;
    case 'retenMovil':
      data = {
        id: 'retenMovil',
        width: 160,
        height: 84,
        scale: 1,
        speed: 350 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      };
      break;
    case 'bus':
      data = {
        id: 'bus',
        width: 180,
        height: 84,
        scale: 1,
        speed: 350 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    case 'moto':
      data = {
        id: 'moto',
        width: 80,
        height: 65,
        scale: 1.2,
        speed: 600 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      };
      break;
    case 'motoPaco':
      data = {
        id: 'motoPaco',
        width: 80,
        height: 65,
        scale: 1.2,
        speed: 650 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      };
      break;
    case 'sedan':
      data = {
        id: 'sedan',
        width: 155,
        height: 60,
        scale: 1,
        speed: 450 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    case 'sedanAlt':
      data = {
        id: 'sedanAlt',
        width: 155,
        height: 60,
        scale: 1,
        speed: 450 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    case 'camioneta':
      data = {
        id: 'camioneta',
        width: 195,
        height: 85,
        scale: 1,
        speed: 400 * (playerSpeed / 160) * (40 / frames), // 220
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    // Sprites Estaticos:
    case 'people':
      data = {
        id: 'people',
        width: 100,
        height: 75,
        scale: 1.2,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 15,
        offsetY: 20,
        yCorrection: 20,
        speedVar: 0,
      };
      break;
    case 'carpa':
      data = {
        id: 'carpa',
        width: 142,
        height: 74,
        scale: 1,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: -18,
        speedVar: 0,
      };
      break;
    case 'carpaAlt':
      data = {
        id: 'carpaAlt',
        width: 142,
        height: 74,
        scale: 1,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: -18,
        speedVar: 0,
      };
      break;
    case 'vago':
      data = {
        id: 'vago',
        width: 74,
        height: 24,
        scale: 1.5,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: -30,
        speedVar: 0,
      };
      break;
    case 'algodon':
      data = {
        id: 'algodon',
        width: 92,
        height: 85,
        scale: 1,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 0,
      };
      break;
    case 'telefono':
      data = {
        id: 'telefono',
        width: 32,
        height: 70,
        scale: 1.3,
        speed: 120 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 5,
      };
      break;
    // Sprites Avanzando contre el fondo.
    case 'vieja':
      data = {
        id: 'vieja',
        width: 50,
        height: 60,
        scale: 1.3,
        speed: 70 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      };
      break;
    case 'moncho':
      data = {
        id: 'moncho',
        width: 30,
        height: 60,
        scale: 1.3,
        speed: 70 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      };
      break;
    // Sprites Avanzando mas rapido que el fondo.
    case 'skater':
      data = {
        id: 'skater',
        width: 40,
        height: 56,
        scale: 1.3,
        speed: 200 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      };
      break;
    case 'carrito':
      data = {
        id: 'carrito',
        width: 72,
        height: 50,
        scale: 1.3,
        speed: 150 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 10,
      };
      break;
    case 'oficinista':
      data = {
        id: 'oficinista',
        width: 48,
        height: 70,
        scale: 1.3,
        speed: 150 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 10,
      };
      break;
    case 'perro':
      data = {
        id: 'perro',
        width: 32,
        height: 24,
        scale: 1.3,
        speed: 160 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: -15,
        speedVar: 5,
      };
      break;
    case 'moneda':
      data = {
        id: 'moneda',
        width: 30,
        height: 30,
        scale: 1.5,
        speed: 110 * (playerSpeed / 160) * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: -20,
        speedVar: 5,
      };
      break;
    case 'final':
      data = {
        id: 'final',
        width: 52,
        height: 84,
        scale: 1.3,
        speed: 80 * (40 / frames),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 0,
      };
      break;
    default: data = {};
  }
  return data;
}

export function s() { return s; }
