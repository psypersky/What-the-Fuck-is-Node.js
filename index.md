# What the Fuck is Node.js?

#### Expected Background
* Basic command line
* JavaScript
* HTTP

#### What are we going to accomplish with this course
In this course we are going to learn what is a webserver and create one in order to provide the API for a front end APP and serving it.

In order to understand this we need to learn a bit of how the internet works, how the bits are transferred from place to place, TCP/IP and OSI model, all this in a very superficial way but it will let us have the big picture of what is going back stage.

We are going to use Node.js as a tool to create our webserver, we are going to take a quick look at its bowels and then build a service with it.

#### NodeJS Introduction
**Installing Node.js**   
Installing Node.js does not require the use of command line anymore, there are installers for Windows and OSX that you can download from the site [https://nodejs.org/en/download/].   

**Node.js REPL and hello web world**   
Node.js gives us Real Evaluate Print Loop [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) which is pretty useful to make small tests, lets try it by typing `node ⏎` in the command line, then we should see something like
```
$node
>
```
 Each time you type something in the console and press enter Node will Read, Evaluate and print the result on the command line, then it will return to waiting for the next command, lets try some JavaScript.

 ```
 > 1+1
 2
 > true == 1
 true
 > true === 1
 false
 > 3>2>1
 false
 ```
Ok, so its not much different from the chrome or firefox consoles, we enter something and it prints the result back, except we do not have a DOM here, but we have more interesting stuff.

The console gives us some nice REPL keywords type `.help ⏎` to see them
```
> .help
break	Sometimes you get stuck, this gets you out
clear	Alias for .break
exit	Exit the repl
help	Show repl options
load	Load JS from a file into the REPL session
save	Save all evaluated commands in this REPL session to a file
```
Node prints almost anything except for functions and nested objects, I guess is for readability proposes, try this on your command line
```
> function hola() { console.log('hola'); }
undefined
> { foo: 'bar' }
{ foo: 'bar' }
> { foo: { foo2: { foo3: {} } } }
{ foo: { foo2: { foo3: {} } } }
> { foo: { foo2: { foo3: { foo4: {} } } } }
{ foo: { foo2: { foo3: [Object] } } }
```
As you can see, when creating a function it returns `undefined` and when creating an anonymous object if returns the object and in objects with depth level bigger than three it just prints [Object] instead of the nested content.

Now that we are masters of the Node.js [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) lets create what we came here for, an HTTP server.

```
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3333, 'localhost', () => console.log('Server running at localhost'));
```

If your console prints out `> Server running at localhost` it means that the server is running in our computer, lets go to our web browser and type the address `localhost:3333` we should see `Hello World` in it, congratulations you just made your first HTTP server in Node.js 🙀🤘💯

The first thing that this code does is requiring the  [http](https://nodejs.org/api/http.html) core module and store the object's reference in the http variable   

The next line uses the `createServer` factory method to create a new server, we do not store the server in a variable since we do not intend to do anything else with it, not even killing it, when closing the terminal the server will die with it, instead we use method chaining to call the `listen` method of the http server in order to tell the server to start listening for request in the port `3333` on our machine or `localhost` and we add a callback function that prints into the console after the server has initiated.

The factory function `createServer` receives an anonymous function as argument, this function is attached to the `request` event, the server is going to *call back* this function every time it gets a new connection, after receiving a connection he write the header of our HTTP response with the status code 200 and the 'Content-Type': 'text-plain' to tell the browser or whatever is requesting that we are sending just plain old text, then write to the body our `Hello World\n` text and then close the connection, we do this by using the `red.end` function with accepts an argument to write in the body before closing the connection.

At last if we want our server to listen to all IP addresses instead just our local machine lets change 'localhost' to '0.0.0.0' which tells the server to listen to incoming connections for any IP address, now we can access our server from out  browser with our local area network ip from our machine or from another machine in the same network 😎


#### How the fuck does the internet works?
* TCP/IP DNS
http://www.theshulers.com/whitepapers/internet_whitepaper/

Summing it up, the application layer sends the data to the TCP layer, the tcp layer divide your data into chunks, adds a header to the packet and it send chunks to the ip layer, the ip layer adds its own header and send the packet to the hardware.

Important stuff about this, TCP is a connection-oriented, reliable, byte stream service.

* OSI Model
http://ru6.cti.gr/bouras-old/WP_Simoneau_OSIModel.pdf

// Summing it up...

* Extras
[UUNET's map](http://www.nthelp.com/images/uunet.pdf)

#### Webserver Architectures




// Also super basic just some overview of synchronous web architectures
// Synchronous architectures
// Apache/php

#### Ryan Dahl Note on why he created Node.js
In search for a more efficient web server a brave warrior started a quest in programming land, here is his story.

http://chimera.labs.oreilly.com/books/1234000001808/pr01.html   

#### But What the Fuck is node?

* Runtime, what is a runtime?
* V8
* C++ and machine code
* Libuv




// NOTE: maybe moving this analysis a little bit down...?
// A little analysis here of what he wanted to do
// TCP buffers, IO de-multiplexing

// The idea with non-blocking I/O is to be able to handle multiple sockets without resorting to multiple threads. The central part here is I/O de-multiplexing,



// runtime is a server and a runtime enviroment http://chimera.labs.oreilly.com/books/1234000001808/ch01.html#chap5_id35941617

First lets go to their website https://nodejs.org, the description says:

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Ok, so Node.js is a JavaScript runtime, but what the fuck is a runtime?
// a runtime is bla bla bla


#### Node.js Design Fundamentals 7
Read the next chapters from this [book](https://www.packtpub.com/mapt/book/web-development/9781783287314)

* Node.js philosophy
* The Reactor Pattern and Event loop
* The callback Pattern




* The module system
* The observer pattern (EventEmitter)

#### Asynchronous control flow 3
* Plain JavaScript
* Async Library
* Promises
* Generators
// nextTick, setImmediate, setTimeout

#### Streams and Buffers 5
// Streams and buffers
// Binary Data, Character Sets, and Encodings
// Typed Arrays

#### Modules 2
* Hardcoded dependency
* Dependency injection
* Service locator
* Dependency injection containers

# npm 2

#### Core modules 2
// FileSystem
// console.log
// process.env



#### REST/SOAP 2

#### Building an API
//
// Authentication
  // Hashing and salting password
  // Login
  // JWT
  // Making routes privates


#### Deploying the app in openshift

// 6 tentativo




function bla() {
  console.log('hey');
  low();
  console.log('finished');
}

function low() {
  console.log('low');
}



$.on('button', 'click', function onClick() {
    setTimeout(function timer() {
        console.log('You clicked the button!');    
    }, 2000);
});

console.log("Hi!");

setTimeout(function timeout() {
    console.log("Click the button!");
}, 5000);

console.log("Welcome to loupe.");












// Web server based on threads in Java
http://programwebserver.blogspot.mx/2011/10/webserverjava.html

// Web server reactor pattern in Java
http://jeewanthad.blogspot.mx/2013/02/reactor-pattern-explained-part-1.html

// Server achitecture
http://berb.github.io/diploma-thesis/original/index.html
https://www.quora.com/What-are-some-good-books-about-web-server-architecture

// What every develper should now about http
https://www.amazon.com/Every-Developer-Should-OdeToCode-Programming-ebook/dp/B0076Z6VMI

// Node.js high performance
https://www.amazon.com/Node-js-High-Performance-Diogo-Resende-ebook/dp/B010T266NS/ref=sr_1_23?ie=UTF8&qid=1479263439&sr=8-23&keywords=node+js

** JavaScript **

// closures
https://developer.mozilla.org/en/docs/Web/JavaScript/Closures
