"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var node_events_1 = require("node:events");
var NS_PER_SEC = 1e9;
var NS_PER_MS = 1e6;
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startTime = 0;
        return _this;
    }
    Timer.prototype.start = function () {
        this.startTime = process.hrtime();
        console.log('starting...emit');
        this.emit('start');
    };
    Timer.prototype.stop = function () {
        console.log('about to emit stop');
        var diff = process.hrtime(this.startTime);
        this.emit('stop', (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MS);
    };
    return Timer;
}(node_events_1["default"]));
var tasks = new Timer();
tasks.start();
tasks.on('start', function () {
    console.log('started...');
    var res = 1;
    for (var i = 1; i < 1000000000; i++) {
        res *= i;
    }
    tasks.stop();
});
tasks.on('stop', function (time) {
    console.log("Task completed in ".concat(time, "ms"));
});
