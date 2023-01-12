import { readLines } from "https://deno.land/std/io/mod.ts"
import { Copc } from 'npm:copc'
import proj4 from 'npm:proj4'
import { sleep } from "https://deno.land/x/sleep/mod.ts"

const SLEEP = 90
const server = Deno.env.get('SERVER')

for await (let fn of readLines(Deno.stdin)) {
  const url = `${server}/${fn}`
  console.error(`${new Date()}: Processing ${fn}...`)
  let copc = false
  let min, max
  try {
    copc = await Copc.create(url)
    min = proj4(copc.wkt).inverse(copc.header.min)
    max = proj4(copc.wkt).inverse(copc.header.max)
  } catch (e) {
    // console.error(e)
    console.error(`${new Date()}: Exception in processsing ${url}.`)
    console.error(`${new Date()}: deno sleeping ${SLEEP} seconds.`)
    await sleep(SLEEP)
    continue
  }
  const f = {
    type: 'Feature',
    properties: {
      grid: fn.replace('.copc.laz', '').toLowerCase(),
      min: min[2],
      max: max[2]
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [min[0], max[1]],
        [min[0], min[1]],
        [max[0], min[1]],
        [max[0], max[1]],
        [min[0], max[1]]
      ]]
    }
  }
  console.log(JSON.stringify(f))
  console.error(`${new Date()}: deno sleeping ${SLEEP} seconds.`)
  await sleep(SLEEP)
}

