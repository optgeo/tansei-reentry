import { readLines } from "https://deno.land/std/io/mod.ts";
import { Copc } from 'npm:copc'
import proj4 from 'npm:proj4'

const server = Deno.env.get('SERVER')

for await (let fn of readLines(Deno.stdin)) {
  const url = `${server}/${fn}`
  // console.error(`Processing ${fn}...`)
  const copc = await Copc.create(url)
  const min = proj4(copc.wkt).inverse(copc.header.min)
  const max = proj4(copc.wkt).inverse(copc.header.max)
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
}

