const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  this.emit('event0');
}

const myEmitter = new MyEmitter();
myEmitter.on('event0', () => {
  console.log('an event occurred!1');
});

this.emit('event0');
