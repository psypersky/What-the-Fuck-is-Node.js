Isaac
Miguel
Axel
Olegario
Sara

## 08/Dic/2016

Implementing Readable/Writable Stream
Isaac
Miguel
Axel
Olegario

Serving Static file
Isaac
Miguel
Olegario


Base Server with form (studens/name/http/webServerAuth)

Isaac
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

  Miguel
  Comments:
* When parsing the body of the post you are parsing an specific case, what if the
  body not only contains two members? Parsing data should be generalized.
* Same thing than Isaac about separating each ROUTE-METHOD
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
