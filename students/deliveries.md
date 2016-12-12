Isaac
Miguel
Axel
Olegario
Sara

## 08/Dic/2016

### Implementing Readable/Writable Stream
__Isaac__   
__Miguel__   
__Axel__   
__Olegario__   

### Serving Static file   
__Axel__   
__Isaac__   
__Miguel__   
__Olegario__


### Base Server with form (studens/name/http/webServerAuth)

__Isaac__   
Comments:
* Its better to have ROUTE-METHOD separated, instead of using the same if
  for a nested POST/GET
  if (url === '/login' && method === 'POST') { ... }
  if (url === '/login' && method === 'GET') { ... }
  it gives more clarity to the code
* request.client is not documented, apparently in some version in 2012 the socket was
  called 'client' and they are still maintaining compatibility with it,
  the official name is Socket and the constructor function is called like that
  you can prove that they are the same doing request.client === request.socket
  and you can check the constructor function name by doing request.client.constructor.name
* Attaching data to the socket in HTTP is a __BIG__ error, HTTP 1.1 uses persistent tcp
  connections by default, this means that instead of using one TCP connection per
  HTTP request it maintains the connection open to use in multiple HTTP requests,
  read about it in https://en.wikipedia.org/wiki/HTTP_persistent_connection.

__Miguel__   
  Comments:
* When parsing the body of the post you are parsing an specific case, what if the
  body not only contains two members? Parsing data should be generalized.
* Same thing than Isaac about separating each ROUTE-METHOD
* Why the FUCK are you using an immediately invoked function wrapping your hole script?
  Your script is a module and has its own scope what are your trying to not pollute? This is not the browser.
* You are using find to set a flag, this is not the way to use find, find returns
  the first element that their function returns true, your are discarding that,
  you can use the returned user inside the if to know if there is an user, e.g.

This is your code:
```javascript
  let flag = false;
  usersDB.find(function(elem){
    if (elem.userName === user && elem.password === pass) {
      flag = true;
    }
    return flag;
  });
  if (flag) {
```

You can do this:
```javascript

const user =  usersDB.find((elem) =>
  (elem.userName === user && elem.password === pass));

if (user) {/*...*/}
if (!user) {/*...*/}

```

__Axel__   
Comments:
* You don't have home page x.X  laaazzyyy motherfucker!
* The word "finded" does not exists, i think you mean "found"
* Same mistake than Miguel in using the find function to flag and discard the result
* Really bad practice here
```javascript
data.forEach(function(element){
    userPass.push(element.split("="));
});

user = userPass[0][1];
pass = userPass[1][1];
```
What if the data is not in that order?, you should create a map(Object)
of the data sent, not an Array of Arrays


__Olegario__   
Comments:
* "a" is not an useful name for a variable, names should represent what the variable holds
* Use Array.prototype.find instead of Array.prototype.findIndex

## 08/Dic/2016

### Server With Cookies Authentication (studens/name/http/webServerAuthCookiesRegister)

__Isaac__
* If you are in a module you don't need to create closures to not pollute your scope,
  you already have a module with its own scope, use singleton class instead
* If you have findUserByUsername and findUserByEmail create a function
  findUserBy(name, property) that you use like findUserBy('Ruben', 'name')
* Why in hell are you still injecting stuff on the socket???, why do you think we
  use cookies for?, you are generating a 'random' token but you are not verifying it
