function foo() {
  function bar() {
    function foobar() {
        var axel = new Error('Axel´s Error');
        return axel.stack;
    }
    return foobar();
  }
  return bar();
}

module.exports = foo;
