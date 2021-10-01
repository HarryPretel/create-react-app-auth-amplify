// import React, { useRef, useEffect } from 'react'

// export const Canvas = props => {

//     const { data, title, width, height, ...rest } = props
//     const canvasRef = useRef(null)
  
//     useEffect(() => {
  
//       const canvas = canvasRef.current
//       const context = canvas.getContext('2d')
  
  
  
//       let frameCount = 0
//       let animationFrameId
  
//       const render = () => {
//         frameCount++
//         draw(context, frameCount, { data: data, title: title, width: width, height: height })
//         animationFrameId = window.requestAnimationFrame(render)
//       }
//       render()
  
//       return () => {
//         window.cancelAnimationFrame(animationFrameId)
//       }
//     }, [draw, props])
  
//     return (
//       <canvas height={height} width={width} ref={canvasRef} {...rest} />
//     )
//   }