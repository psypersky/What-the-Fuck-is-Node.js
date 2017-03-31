"use strict";

var Stream = require('stream').Readable;
var util = require('util');
const pokemon = require('pokemon');

function RandomPokemon(){
    // this.objectMode = true;
    Stream.call(this);
}

util.inherits(RandomPokemon, Stream);

RandomPokemon.prototype._read = function(){
  // if (Math.random() >= 0.1){
    this.push(pokemon.random());
  // }
  // else{
  //   this.push(null);
  // }
};

let pok=new RandomPokemon();
console.log(pok._read());
