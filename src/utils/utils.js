export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomType(string1, string2, porciento) {
  const x = Math.random();
  if (x > (porciento / 100)) {
    return string1;
  } return string2;
}
