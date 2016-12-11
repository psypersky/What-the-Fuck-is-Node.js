#### Streams

Streams mimic the pipe operation of Unix.

There are benefits in memory consumption and performance.

stream.Readable
stream.Writable
stream.Duplex
stream.Transform

Streams have two operating modes:

Binary mode: The data is streamed in the form of chunks, such as buffers or string.
Object mode: Data is treated as a sequence of discrete objects (allowing us to use almost any JavaScript value)

Example: gzipBuffered.js
Example: gzipStreams.js

Streams inherit from an abstract class (abstract because you shouldn't call it directly) called Stream which in turn inherits from EventEmitter.

Streams are chainable, you can pipe from a stream you can read from (Readable/Duplex/Transform) to a stream you can write to (Writable/Duplex/Transform). This function is called pipe because it mimics the behavior of the command line pipe operator, for example, cat file.txt | grep lol.

Example: consumingReadable.js

Example: writingToWritable.js

Create a readable Stream
Example: implementingReadableStream.js

Create a writable Stream
Example: implementingWritableStream.js

Summing up: Streams are composables, time efficient and memory efficent

// Explain how to start a project and install a library and use it.

Exercise: Create a readable stream that generates an x(random) quantity of sentences of with length [2, 8] using 'random-words' npm module, the x the result of each read cycle running a 10% possibiliy of send null or end-of-stream.
