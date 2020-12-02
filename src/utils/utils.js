export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomType2(string1, string2, porciento) {
  const x = Math.random();
  if (x > (porciento / 100)) {
    return string1;
  } return string2;
}

export function randomType3(string1, string2, string3, porciento1, porciento2) {
  const x = Math.random();
  if (x > (porciento1 / 100)) {
    return string1;
  }
  if (x > (porciento2 / 100)) {
    return string2;
  }
  return string3;
}

// Funcion para crear cookie
export function uptoCookie(player, level, road, service1level) {
  function setCookie(name, valueOne, valueTwo, valueThree, valueFour, seg) {
    let expires = '';
<<<<<<< HEAD
    // let now = '';
    const date = new Date();
    // date.setTime(date.getTime());
    // now = ` ${date.toUTCString()}`;
    date.setTime(date.getTime() + (seg * 1000));
    expires = `${date.toUTCString()}`;
    console.log(expires);
=======
    const date = new Date();
    date.setTime(date.getTime() + (seg * 1000));
    expires = `; expires=${date.toUTCString()}`;

    const myObject = JSON.parse(`{"username":"${valueOne}","level": "${valueTwo}","road": "${valueThree}","service 1 level":"${valueFour}"}`);
>>>>>>> 83032a2de4a297060d3ab4db516d5355cce5848a

    const myObject = JSON.parse(`{"username":"${valueOne}","level": "${valueTwo}","road": "${valueThree}"}`);

    document.cookie = `${name}=${JSON.stringify(myObject)}; expires=${expires}; path=/`;
  }
<<<<<<< HEAD
  setCookie('ppkcookie', player, level, road, 10);
=======
  setCookie('pehm', player, level, road, service1level, 7);
>>>>>>> 83032a2de4a297060d3ab4db516d5355cce5848a
}
