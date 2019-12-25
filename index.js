const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetch = (msg, timeout) => async (params = 0) => wait(timeout).then(() => {
  const gen = parseInt(Math.random(4)*10)
  process.stdout.write(`${msg} gen ${gen} and received ${params} `)
  console.timeLog('at')
  return gen
})

const executePlan = arr => arr.reduce((acc, next) => acc.then(res => executeParallel(next, res)), Promise.resolve())

const executeParallel = (next, res) => Array.isArray(next) ? Promise.all(next.map(func => func(res))) : next(res)

const main = () => executePlan([
  () => console.time('at'),
  fetch('A', 2000), 
  [fetch('B0', 3000), fetch('B1', 1000), fetch('B2', 3000)], 
  fetch('C', 1000)
])

main()
