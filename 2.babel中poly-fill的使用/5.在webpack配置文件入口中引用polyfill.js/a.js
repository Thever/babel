var promise = Promise.resolve('ok');
console.log(promise);
promise.then(val => console.log('promise执行成功', val))