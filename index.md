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

// check later
http://www.cs.miami.edu/home/wuchtys/CSC322-16F/Content/UNIXProgramming/UNIXThreads.shtml
http://www.thegeekstuff.com/2012/03/linux-threads-intro/
https://www.scottklement.com/rpg/socktut/nonblocking.html
http://www.kegel.com/dkftpbench/nonblocking.html

#### Old Webserver Architectures

TODO: Describe the thread/process per request webserver model (how is it called?), the memory consumption and process time overhead, iddle time,  describe the C10k problem, etc.

// Also super basic just some overview of synchronous web architectures
// Synchronous architectures
// Apache/php

[C10k problem](https://en.wikipedia.org/wiki/C10k_problem)

// check
https://www.phpclasses.org/blog/post/226-4-Reasons-Why-All-PHP-Frameworks-Suck.html
https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations
https://www.quora.com/What-causes-the-C10k-problem


#### Ryan Dahl Note on why he created Node.js
In search for a more efficient web server a brave warrior started a quest in programming land, here is his story.

http://chimera.labs.oreilly.com/books/1234000001808/pr01.html   


#### Ooook, But What the Fuck is node?
Before digging into how Node.js works lets see what are its parts.

* Runtime, what is a runtime?
* V8
* C++ and machine code
* Libuv

**TODO-01:**   
The goals of this Chapter are to explain what parts composes Node.js, what do each of this parts do, just a general overview of the node internals and what each parts is responsable of.

The reader should be able to have a superficial idea of node.js, what does it do, the parts of it and a little about why performance is better

* What is node.js?
* Node.js is a webserver and a runtime enviroment
* check webpage, explain what is a runtime
* what parts compose node.js
* c++
* JavaScript -> [Node.js] -> machine code
* Libuv

**Students Task 1:** Complete the TODO-01


First lets go to their website https://nodejs.org, the description says:

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Ok, so Node.js is a JavaScript runtime, but what the fuck is a runtime?
// a runtime is bla bla bla

// runtime is a server and a runtime enviroment http://chimera.labs.oreilly.com/books/1234000001808/ch01.html#chap5_id35941617


#### And why the fuck would i use that monstrosity?

**TODO-02:** We do not know about the Reactor model and the event loop so we can't explain exactly why Node.js is better but we can give an idea, explain here that since Node.js only have one thread there is very little idle time, is fast a have very low memory consuption, maybe some phansy images.

The idea with non-blocking I/O is to be able to handle multiple sockets without resorting to multiple threads.
The central part here is I/O de-multiplexing.

// theoretical node performance
http://blog.3rd-eden.com/post/5809079469/theoretical-nodejs-real-time-performance



#### Node.js Fundamentals and Fucking Boring Theory

**NOTE:** In this chapter we should really see the theory of what Node.js is and start our relationship with the event loop and callback pattern.

Read chapter one from the book [Node.js Design Patterns](https://www.packtpub.com/mapt/book/web-development/9781783287314)

**Students Task 2:** Do you think reading the hole chapter one in one pass is boring? How do you think we can make this easier for reader? Write possible solutions and how each one will work.


#### Lets program for the Event Loop

**Initializing Node.js**
When running a Node.js program it initializes the event loop, processes the provided input script which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

Lets take a simple example:
```
const A = 12;

setTimeout(() => { console.log('I was called from the event loop') }, 0);

console.log('Last function in the script');
```

In this script Node.js creates an Event Loop and initialize it, runs the script, the script has one asynchronous function that is inserted in the event loop, the script finish and the event loop checks for callbacks waiting to be executed, takes the function and runs it printing `Last function in the script` in the console, after finishing with that function since the event loop is totally empty our Node.js program commits suicide and close itself.


According to Node.js (docs)[https://github.com/nodejs/node/blob/master/doc/topics/event-loop-timers-and-nexttick.md] this is a simplified view of the Event Loop 😱:

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

Each phase has a FIFO queue of callbacks to execute, when the event loop enters a give phase it will perform operations specific to that phase until the queue has been exhausted or the maximum number of callbacks has executed, then it will move to the next phase.

 This phase executes callbacks scheduled by setTimeout() and setInterval().
 executes almost all callbacks with the exception of close callbacks, the ones scheduled by timers, and setImmediate().
 only used internally.
 retrieve new I/O events; node will block here when appropriate.
* __check:__ setImmediate() callbacks are invoked here.
* __close callbacks:__ e.g. socket.on('close', ...).


There is little information at this level of depth about the Event Loop, for a more in depth analysis we need to go and read the C++ Libuv, Node and V8 docs, maybe some day, but for now our idea of how this works is the next one.

After the execution of a Node.js program the event loop will make a "loop" or a "tick" this means complete one cycle of all steps:

* __timers:__ It checks if there is any timer ready to be executed, if there is one or more timers ready it executes their callbacks until it finishes or we hit some hard limit;

* __I/O callbacks:__ This phase checks if there any I/O events ready, almost all the callbacks (network, file system, etc.) end here with the exception of close callbacks, the ones scheduled by timers and setImmediate.

* __idle, prepare:__ Looks like this checks and prepare handles once per iteration, whatever this means, they are functions of libuv library that are not exposed in Node.js and apparently we do not need to know in order to use Node.

* __poll:__ This

Polling, or polled operation, in computer science, refers to actively sampling the status of an external device by a client program as a synchronous activity. Polling is most often used in terms of input/output (I/O), and is also referred to as polled I/O or software-driven I/O.
https://en.wikipedia.org/wiki/Polling_(computer_science)





#### Lets watch fucking a movie!

Read chapter three of this book http://chimera.labs.oreilly.com/books/1234000001808/ch03.html
Read chapter two of this book beginning-node-js.pdf
Read chapter 2 of node-js-the-right-way.pdf

Watch this video: https://www.youtube.com/watch?v=8aGhZQkoFbQ
Watch this video: https://www.youtube.com/watch?v=QyUFheng6J0

**Students Task 3:** Read and watch that ^

**Students Task 4:** Research all you possibly can about the Node.js Event loop and make a video about how it works since the beginning, receiving a request, processing it while other request is being received, calling the database and responding to clients, and the lines of code being executed. Its basically a movie of how node.js works in production.

// Video editors in order of ease of use:
http://www.maefloresta.com/portal/
http://www.synfig.org/cms/
http://www.blender.org/


Important Things to note abut the readings:

Node.js Design Patterns - The callback pattern
- CPS = Callback Passing Style
- CPS could be sync or async
- Async tasks beginging from the event loop so they have a fresh stack
- Closures makes trivial to maintain the context of the caller of the async function event if the callback is invoked at a different point in time and from a different location
- A sync function bnlocks until it completes its operation
- An async function returns immediately
- Non continuation-passing style callbacks are sync
- You could create an unpredictable function being sync or async
- The direct style is preffered for sync functions, this makes obvious which are sync and async
- ... Problems that could cause a sync function that you think is async ? ...
- sync i/o blocks the event loop
- deffered execution with process.nextTick()
- callbacks come last and error comes first
- in sync the error is propagated throwing, in CPS by the callback
- throwing bubble your error in the stack until is catched
- Use try/catch for functions that can throw errors
- uncaught exeptions kill the app if they reach the event loop
- we can catch uncaught exeptions directly in process

try, catch,
async, sync
errors in callbacks
stack


Call stack=>

two
one
nodejs stuff



Node: Up and running - Chapter 3, the event loop
- Node.js programs should be written in such way that no single callback ties up the event loop for extended periods of time
- Once setup has been completed, make all actions event-drive
- If you have a process that will take a long time consider using a child process
- Use named functions for async events, the call name of the function on errors will be anonymous function when not named, this makes it harder to debug






timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
I/O callbacks: executes almost all callbacks with the exception of close callbacks, the ones scheduled by timers, and setImmediate().
idle, prepare: only used internally.
poll: retrieve new I/O events; node will block here when appropriate.
check: setImmediate() callbacks are invoked here.
close callbacks: e.g. socket.on('close', ...).


setImmediate() is actually a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.







##### The callback Pattern (DEPRECATED)

// Visualize the event loop http://latentflip.com/loupe

Read the chapter named *The callback pattern* of the book [Node.js Design Patterns](https://www.packtpub.com/mapt/book/web-development/9781783287314)

**First exercise:** Create an script that runs a function that calls another function that calls another function so the stack trace size is three, prove it printing the stack trace with console.trace() or creating an error and printing the Error.stack.

**Second exercise** Create a jasmine test that proves that the first exercise works.

**Third exercise** There are two functions that where made by a newbie node.js developer, its out duty to help him to fix the errors.

The first function is on `exercises/callback-pattern/error1.js`, it is doing a synchronous calculation using CSP, but for some reason it always shows an error in the console, find out what is wrong and fix it.

The second function is on `exercises/callback-pattern/error2.js` it is doing an asynchronous calculation but for some reason it always prints undefined in the console, find out what is wrong and fix it.



// Closures and first Class objects make really easy to work with async functions, why?

Synchronous continuation-passing style

Asynchronous continuation-passing style

// A Synchronous function blocks until is finished


##### Module system

##### The observer pattern



// Check later
https://groups.google.com/forum/#!msg/nodejs/ztspFn-BKgE/qw1I9VLSG_gJ
https://github.com/nodejs/node/issues/1128


// Node.js Event loop
http://stackoverflow.com/questions/19822668/what-exactly-is-a-node-js-event-loop-tick

// Functions First class objects
http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/

There's process._ getActiveHandles() and process._ getActiveRequests().












function doSomethingAsync(callback) {
    setTimeout(function() {
        console.log('working...');
        callback(new Error('something went bad'));
    }, 1000);
}

doSomethingAsync(function(err) {
    if (err) {
        console.error('something did not work');
        return;
    }
    console.log('work finished!');
});



* The module system
// check later
http://fredkschott.com/post/2014/06/require-and-the-module-system/
https://auth0.com/blog/javascript-module-systems-showdown/

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
