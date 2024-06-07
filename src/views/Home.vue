<template>
  <div class="home">
    <canvas ref="canvasRef" width="100" height="100"></canvas>
  </div>
</template>

<style scoped>
.home {
  height: 100%;
}
</style>

<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import Delaunator from 'delaunator'

// const getRandomPoints = (numPoints: number, x: number, y: number) => {
//   let points = []
//   const maxX = x + 1,
//     maxY = y + 1
//   for (let i = 0; i < numPoints; i++) {
//     let x = Math.floor(Math.random() * maxX)
//     let y = Math.floor(Math.random() * maxY)
//     points.push([x, y])
//   }
//   return points
// }

// const points = getRandomPoints(10000, 1024, 768) // 随机生成1w个节点
// const delaunay = Delaunator.from(points)
// const canvasRef = ref()

// onMounted(() => {
//   const canvas = canvasRef.value as HTMLCanvasElement
//   var ctx = canvas.getContext('2d') as CanvasRenderingContext2D

//   var minX = Infinity
//   var minY = Infinity
//   var maxX = -Infinity
//   var maxY = -Infinity
//   for (var i = 0; i < points.length; i++) {
//     var x = points[i][0]
//     var y = points[i][1]
//     if (x < minX) minX = x
//     if (y < minY) minY = y
//     if (x > maxX) maxX = x
//     if (y > maxY) maxY = y
//   }

//   var padding = 5
//   var w = 1024
//   var h = ((w - 2 * padding) * (maxY - minY)) / (maxX - minX) + 2 * padding

//   canvas.style.width = w + 'px'
//   canvas.style.height = h + 'px'

//   canvas.width = w
//   canvas.height = h

//   if (window.devicePixelRatio >= 2) {
//     canvas.width = w * 2
//     canvas.height = h * 2
//     ctx.scale(2, 2)
//   }

//   var ratio = (w - 2 * padding) / Math.max(maxX - minX, maxY - minY)

//   ctx.lineJoin = 'round'
//   ctx.lineCap = 'round'

//   var updated = true

//   // canvas.onmousemove = function (e) {
//   //     points.push([
//   //         (e.layerX - padding) / ratio + minX,
//   //         (e.layerY - padding) / ratio + minY
//   //     ]);
//   //     console.time('delaunay');
//   //     delaunay = Delaunator.from(points);
//   //     console.timeEnd('delaunay');
//   //     updated = true;
//   // }

//   function getX(i: number) {
//     return padding + ratio * (points[i][0] - minX)
//   }
//   function getY(i: number) {
//     return padding + ratio * (points[i][1] - minY)
//   }

//   function frame() {
//     requestAnimationFrame(frame)
//     draw()
//   }
//   frame()

//   function draw() {
//     if (!updated) return
//     updated = false

//     ctx.clearRect(0, 0, w, h)

//     var triangles = delaunay.triangles

//     ctx.beginPath()
//     for (var i = 0; i < triangles.length; i += 3) {
//       var p0 = triangles[i]
//       var p1 = triangles[i + 1]
//       var p2 = triangles[i + 2]
//       ctx.moveTo(getX(p0), getY(p0))
//       ctx.lineTo(getX(p1), getY(p1))
//       ctx.lineTo(getX(p2), getY(p2))
//       ctx.closePath()
//     }
//     ctx.strokeStyle = 'rgba(0,200,0,1)'
//     ctx.lineWidth = 0.5
//     ctx.stroke()
//     // ctx.fillStyle = 'rgba(255,255,0,0.1)'
//     // ctx.fill()

//     ctx.beginPath()
//     for (const i of delaunay.hull) {
//       ctx.lineTo(getX(i), getY(i))
//     }
//     ctx.closePath()
//     ctx.lineWidth = 1
//     ctx.strokeStyle = 'red'
//     ctx.stroke()

//     ctx.fillStyle = 'black'
//     ctx.beginPath()
//     for (var i = 0; i < points.length; i++) {
//       ctx.rect(getX(i) - 1.5, getY(i) - 1.5, 3, 3)
//     }
//     ctx.fill()
//   }
// })
</script>
