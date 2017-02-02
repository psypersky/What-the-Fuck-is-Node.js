
const fs = require('fs');
fs.writeFile('./file', Buffer.alloc(1024*1024*60, 'Hello World', 'utf8'));
