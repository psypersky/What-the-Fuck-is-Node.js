const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!1');
});

myEmitter.on('event', () => {
  console.log('an event occurred!2');
});

myEmitter.on('event3', () => {
  console.log('an event occurred! 3');
});

for (let i =0; i < 100; i++) {
  myEmitter.emit('event');
}

myEmitter.emit('event2');
myEmitter.emit('event3');
myEmitter.emit('event');
