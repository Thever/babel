var fn = (num) => num + 2;
var promise = Promise.resolve('ok')
promise.then(val => console.log(val), err => console.warn(err))