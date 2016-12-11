const A = 12;

setTimeout(() => { console.log('I was called from the event loop') }, 0);

console.log('Last function in the script');
