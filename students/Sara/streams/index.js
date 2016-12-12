"use strict";
var Stream = require('stream');
var util = require('util');
const pokemon = require('pokemon');

function RandomPokemon(){
    Stream.Readable.call(this);

    this._readableState.objectMode = false;
    this._writableState.objectMode = true;
}
util.inherits(RandomPokemon, Stream.Transform);

RandomPokemon.prototype._read = function(obj, encoding, cb){
    this.push(obj);
    cb();
};

var pikachu = pokemon.random();

var rs = new Stream.Readable({ objectMode: true });
rs.push(pikachu);
rs.push(null);

rs.pipe(new RandomPokemon()).pipe(process.stdout);
