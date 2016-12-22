const crypto = require('crypto');

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};

function saltHashPassword(userpassword) {
    var salt = 'f7590c806009f82e61252769424724d24cf3d924708e99b064abd28aa7b1790bfcbd277ada51d01fcaa8517b8b0e8b5762bcb64466abd7f68b50e32ce59360d8';
    return sha512(userpassword, salt);
}

module.exports = saltHashPassword;
