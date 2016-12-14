/**
 *  Generate a 30 char string with random characters from
 * charcode 33 to 126
 **/
function generateToken() {
  let str = '';
  for (let i = 0; i < 30; i++) {
    const charcode = Math.floor(Math.random() * 94) + 33;
    str += String.fromCharCode(charcode);
  }

  return str;
}

function generateId () {
  return generateToken();
}

module.exports = {
  generateId,
  generateToken,
};
