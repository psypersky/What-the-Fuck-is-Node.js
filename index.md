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

> What is exactly Node.js? (longer description)

JavaScript is an event-driven language, and Node uses this to its advantage to produce highly scalable servers. Using an architecture called an event loop, Node makes programming highly scalable servers both easy and safe. There are various strategies that are used to make servers performant. Node has chosen an architecture that performs very well but also reduces the complexity for the application developer. This is an extremely important feature. Programming concurrency is hard and fraught with danger. Node sidesteps this challenge while still offering impressive performance. 
To support the event-loop approach, Node supplies a set of “nonblocking” libraries. In essence, these are interfaces to things such as the filesystem or databases, which operate in an event-driven way. When you make a request to the filesystem, rather than requiring Node to wait for the hard drive to spin up and retrieve the file, the nonblocking interface simply notifies Node when it has access, in the same way that web browsers notify your code about an onclick event. This model simplifies access to slow resources in a scalable way that is intuitive to JavaScript programmers and easy to learn for everyone else.


> Why you should use Node.js

Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node are free from worries of dead-locking the process, since there are no locks. Almost no function in Node directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node.

Node is similar in design to, and influenced by, systems like Ruby's Event Machine or Python's Twisted. Node takes the event model a bit further, it presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node there is no such start-the-event-loop call. Node simply enters the event loop after executing the input script. Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user.

HTTP is a first class citizen in Node, designed with streaming and low latency in mind. This makes Node well suited for the foundation of a web library or framework.

Just because Node is designed without threads, doesn't mean you cannot take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores.


> Node.js as a web server

Unlike some languages, such as PHP, that run inside a server such as Apache, Node itself acts as the web server, providing an http module which can be used to create an HTTP client of a server. Following is the bare minimum structure of the HTTP server which listens at 8081 port.

> Node.js Runtime

One of the things that’s often hard to understand about Node.js is that, in addition to being a server, it’s also a runtime environment in the same way that Perl, Python, and Ruby are. So, even though we often refer to Node.js as “server-side JavaScript,” that doesn’t really accurately describe what Node.js does. One of the best ways to come to grips with Node.js is to use Node REPL (“Read-Evaluate-Print-Loop”), an interactive Node.js programming environment. It’s great for testing out and learning about Node.js. You can try out any of the snippets in this book using Node REPL. In addition, because Node is a wrapper around V8, Node REPL is an ideal place to easily try out JavaScript. However, when you want to run a Node program, you can use your favorite text editor, save it in a file, and simply run node filename.js. REPL is a great learning and exploration tool, but we don’t use it for production code.


Ok, so Node.js is a JavaScript runtime, but what the fuck is a runtime?

A runtime is a lapse of time in which a computer program is running on an OS.
This lapse starts when the program gets into the main memory, and the OS starts to
execute the program instructions. And ends when the program sends to the OS an ending
instruction, being this a normal ending instruction, when the program executed all of its
instructions succesfully, or an anormal ending instruction, when the program result in
an error and the OS must end the program execution.

// runtime is a server and a runtime enviroment http://chimera.labs.oreilly.com/books/1234000001808/ch01.html#chap5_id35941617

Ok, so, it's time to know a little more about the parts of node.js, GO!!!

-Runtime: So, like we already see, a runtime it's the lapse in which a computer program is running in a OS, starts when the program gets into the main memory, and ends when the OS receives from the program an ending instruction.


-V8: Well we haven't see it at this point but we will get to it soon, at this point you only need to know that is the JavaScript execution environment created by Google. It is written in C ++ and compiles JavaScript source code into machine code in place of interpreting it in real time.

-Libuv: This is a library used by Node to handle asynchronous events libuv is an abstraction layer for network features and file system functionality on some Operative Systems.

Technical details

The Node.js base operations body is written in JavaScript with support methods written in C ++.


V8

V8 is the JavaScript execution environment created by Google. It is written in C ++ and compiles JavaScript source code into machine code in place of interpreting it in real time, in others words, V8 API allows you to compile and run JavaScript code at low level.

Libuv

Node.js uses libuv to handle asynchronous events. Libuv is an abstraction layer for network features and file system functionality on both Windows and POSIX-based systems like Linux, Mac OS X, OSS on NonStop and Unix.

The core functionality of Node.js resides in a JavaScript library. The Node.js bindings, written in C++, connect these technologies to each other and to the operating system, for this reason Node.js is very fast.


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


#### Lets watch fucking a movie!

Read chapter three of this book http://chimera.labs.oreilly.com/books/1234000001808/ch03.html
Read chapter two of this book beginning-node-js.pdf
Read chapter 2 of node-js-the-right-way.pdf

Watch this video: https://www.youtube.com/watch?v=8aGhZQkoFbQ
Watch this video: https://www.youtube.com/watch?v=QyUFheng6J0

**Students Task 3:** Read and watch that ^

**Students Task 4:** Research all you possibly can about the Node.js Event loop and make a video about how it works since the beginning, receiving a request, processing it while other request is being received, calling the database and responding to clients, and the lines of code being executed.

// Video editors in order of ease of use:
http://www.maefloresta.com/portal/
http://www.synfig.org/cms/
http://www.blender.org/


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
