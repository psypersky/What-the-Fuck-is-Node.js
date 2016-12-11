const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    console.log('emitting event0');
    process.nextTick(() => this.emit('event0'));
  }
}

function MyEmitter() {
  EventEmitter.call(this);
  //our constructor
}



util.inherits(MyEmitter, EventEmitter);




const myEmitter = new MyEmitter();

console.log('registering a listener for event0');

myEmitter.on('event0', () => {
  console.log('an event occurred!1');
});
