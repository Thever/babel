//  webpack入口处引入polyfill.js
import './polyfill.js';
var promise = Promise.resolve('ok');
console.log(promise);
promise.then(val => console.log('promise执行成功', val))