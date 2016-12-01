
function doSomething() {
  console.log(Date.now());
  process.nextTick(doSomething);
}

doSomething();

setInterval(() => console.log('every 100 ms', Date.now()), 100);
