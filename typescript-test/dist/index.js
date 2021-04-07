"use strict";
var h = 'hello';
console.log(h);
var arr = [1, 3];
function sum() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return arg.reduce(function (prev, cur) { return prev + cur; }, 0);
}
console.log(sum(1, 2, 3, 4));
console.log('hello world');
//# sourceMappingURL=index.js.map