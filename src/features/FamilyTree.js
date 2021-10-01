
import { Grid, Slider, Paper, Card, Button } from '@material-ui/core'

import React, { useRef, useEffect } from 'react'

function tree_height(root) {
    let q = [[root, 1]]
    let max = 0
    while (q.length > 0) {
        let cur = q.pop()
        let depth = cur[1]
        max = Math.max(depth, max)
        if (cur[0].children) {
            for (let i = 0; i < cur[0].children.length; i++) {
                q.push([cur[0].children[i], depth + 1])
            }
        }
    }
    return max
}

function tree_width(root) {
    let q = [[root, 0]]
    let right = 0, left = 0
    while (q.length > 0) {
        let arr = q.pop()
        let side = arr[1]
        console.log(side)
        let cur = arr[0]
        left = Math.min(side, left)
        right = Math.max(side, right)

        if (cur.children) {
            let side_next = side + 1
            cur.children.forEach(function (child) {
                q.push([child, side_next])
            })
        }

        for (let i = 0; cur.children && i < cur.children.length; i++) {
            let side_next = side + i - 1
            q.push([cur.children.pop(), side_next])
        }

    }
    return right - left + 1
}

function draw(ctx, frameCount, state) {
    let root = state.data.root
    let width = tree_width(root)
    let height = tree_height(root)
    console.log('tree width: ', width)
    console.log('tree height: ', height)

    let box_size = 10

    let q = [root]
    let spacingx = ctx.canvas.width / (width + 1)
    let spacingy = ctx.canvas.height / (height + 1)
    while (q.length) {
        let cur = q.pop()
        let x = ctx.canvas.width / 2
        let y = ctx.canvas.height / 2
        ctx.fillText(String(cur.value), x, y)
    }

    // ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.fill()
}

const Canvas = props => {

    const { data, title, width, height, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')



        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(context, frameCount, { data: data, title: title, width: width, height: height })
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, props])

    return (
        <canvas height={height} width={width} ref={canvasRef} {...rest} />
    )
}

class FamilyTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth / 3, height: window.innerHeight,
            data: {
                root: {
                    value: 22,
                    children: [
                        { value: 10 },
                        { value: 20 },
                        { value: 30 },
                        { value: 40 },
                    ],
                }
            }
        }
    }
    render() {
        return (
            <Paper>
                <Canvas data={this.state.data} title={this.state.title} width={this.state.width} height={this.state.height}>

                </Canvas>
            </Paper>
        )
    }
}

export default FamilyTree