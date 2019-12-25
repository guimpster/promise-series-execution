const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetch = (msg, timeout) => async () => wait(timeout).then(() => {
  process.stdout.write(msg + ' ')
  console.timeLog('time')
  return Promise.resolve()
})

const executePlan = arr => arr.reduce((acc, next) => acc.then(() => executeParallel(next)), Promise.resolve())

const executeParallel = next => Array.isArray(next) ? Promise.all(next.map(func => func())) : next()

const main = () => executePlan([
  () => console.time('time'),
  fetch('A', 2000), 
  [fetch('B0', 3000), fetch('B1', 1000), fetch('B2', 3000)], 
  fetch('C', 1000)
])

main()
