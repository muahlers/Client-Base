export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomType(
  string1, porc1, string2, porc2, string3, porc3, string4, porc4, string5,
) {
  const x = Math.random();
  // console.log('dentro de la funcion');
  if (porc1) {
    if (x > porc1 / 100) {
      return string1;
    }
    if (porc2) {
      if (x > porc2 / 100) {
        return string2;
      }
      if (porc3) {
        if (x > porc3 / 100) {
          return string3;
        }
        if (porc4) {
          if (x > porc4 / 100) {
            return string4;
          }
          return string5;
        }
        return string4;
      }
      return string3;
    }
    return string2;
  }
  return string1;
}

// Funcion para crear cookie
export function uptoCookie(player, level, road, service1level) {
  function setCookie(name, valueOne, valueTwo, valueThree, valueFour, seg) {
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + (seg * 1000));
    expires = `; expires=${date.toUTCString()}`;

    const myObject = JSON.parse(`{"username":"${valueOne}","level": "${valueTwo}","road": "${valueThree}","service1level":"${valueFour}"}`);

    document.cookie = `${name}=${JSON.stringify(myObject)}${expires}; path=/`;
  }

  setCookie('pehm', player, level, road, service1level, 7);
}
