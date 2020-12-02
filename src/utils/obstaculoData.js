export function obstaculoData(type, playerSpeed) {
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
        speed: 350 * (playerSpeed / 160),
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
        speed: 400 * (playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    case 'people':
      data = {
        id: 'people',
        width: 100,
        height: 75,
        scale: 1.2,
        speed: playerSpeed + 20, // 200
        offsetX: 15,
        offsetY: 20,
        yCorrection: 20,
        speedVar: 20,
      };
      break;
    case 'vago':
      data = {
        id: 'vago',
        width: 74,
        height: 24,
        scale: 1.5,
        speed: playerSpeed, // 160
        offsetX: 0,
        offsetY: 0,
        yCorrection: -30,
        speedVar: 0,
      };
      break;
    case 'moto':
      data = {
        id: 'moto',
        width: 80,
        height: 65,
        scale: 1.2,
        speed: 650 * (playerSpeed / 160),
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
        speed: 650 * (playerSpeed / 160),
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
        speed: 500 * (playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      };
      break;
    case 'vieja':
      data = {
        id: 'vieja',
        width: 50,
        height: 60,
        scale: 1.3,
        speed: playerSpeed - 80, // 220
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
        speed: playerSpeed - 80, // 220
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      };
      break;
    case 'skater':
      data = {
        id: 'skater',
        width: 40,
        height: 56,
        scale: 1.3,
        speed: playerSpeed + 40, // 220
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
        speed: playerSpeed - 20, // 220
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 20,
      };
      break;
    case 'final':
      data = {
        id: 'final',
        width: 72,
        height: 50,
        scale: 1.3,
        speed: 20, // 220
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 0,
      };
      break;
    default: data = {};
  }
  return data;
}

export function s() { return s; }
