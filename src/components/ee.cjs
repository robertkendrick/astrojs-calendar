
//import EventEmitter from 'node:events';
var EventEmitter = require('events')

const NS_PER_SEC = 1e9
const NS_PER_MS = 1e6

class Timer extends EventEmitter {
    startTime = 0
    constructor() {
      super()
    }

    // emit(ev) {
    //   super.emit(ev)
    // }

    start() {
        this.startTime = process.hrtime()
        console.log('starting...emit')
        this.emit('start')
    }
    stop(res) {
        console.log('about to emit stop')
        const diff = process.hrtime(this.startTime)
        this.emit(
            'stop',
            (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MS, 
            res
        )
    }
}
//---------------------------------------------------------------------------------------

const tasks = new Timer()

tasks.on('start', () => {
  console.log('started...')
  let res =1
  for(let i = 1; i < 100; i++) {
    console.log(res, i)
    res *= i
  }
  tasks.stop(res)
})

tasks.on('stop', (time, res) => {
  console.log(`Task completed in ${time}ms and res=${res}`)
})

tasks.on('error', (err) => {     
    console.error('Error occurred:', err); 
  });  
  
  // tasks.emit('error', new Error('Something went wrong'));
  
  tasks.start()
