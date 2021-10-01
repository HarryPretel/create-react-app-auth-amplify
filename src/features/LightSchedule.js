import React, { useRef, useEffect } from 'react'
import {Grid, Slider, Paper, Card, Button } from '@material-ui/core'

function frac2rad(val) {
    return Math.PI*2*val
}

const internal_offset = Math.PI * 1.5

function draw_clock(ctx, frameCount, center_x, center_y, radius) {
    ctx.save()

    let d = new Date()

    //hour
    const hour_line_length = 0.6*radius
    ctx.lineWidth = 5

    let hour = (d.getHours() + (d.getMinutes() / 60)) / 24
    hour = frac2rad(hour) + internal_offset
    ctx.beginPath()
    ctx.moveTo(center_x, center_y)
    ctx.lineTo(center_x + Math.cos(hour)*hour_line_length, center_y + Math.sin(hour)*hour_line_length)
    ctx.stroke()

    //minute
    const minute_line_length = 1*radius
    ctx.lineWidth = 5
    let minute = (d.getMinutes() + (d.getSeconds() / 60)) / 60
    minute = frac2rad(minute) + internal_offset
    ctx.beginPath()
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(center_x + Math.cos(minute)*minute_line_length, center_y + Math.sin(minute)*minute_line_length)
    ctx.stroke()

    //second
    const second_line_length = 1*radius
    ctx.lineWidth = 2
    let second = (d.getSeconds() + (d.getMilliseconds() / 1000) )/ 60
    second = frac2rad(second) + internal_offset
    ctx.beginPath()
    ctx.moveTo(center_x, center_y)
    ctx.lineTo(center_x + Math.cos(second)*radius, center_y + Math.sin(second)*radius)
    ctx.strokeStyle = 'red'
    ctx.stroke()    

    // console.log("time: ", hour, minute, second)
    // console.log(d.getSeconds(), d.getMilliseconds())

}

function draw_hour_lines(ctx, frameCount, x, y, radius, lights_period, length) {
    ctx.save()
    for(let i=0; i<lights_period; i++) {
        let angle = Math.PI*2 * i / lights_period + internal_offset
        ctx.beginPath()
        ctx.moveTo(x + Math.cos(angle)*radius, y + Math.sin(angle)*radius)
        ctx.lineTo(x + Math.cos(angle)*radius*(1-length), y + Math.sin(angle)*radius*(1-length))
        ctx.stroke()
    }
    ctx.restore()
}

function draw(ctx, frameCount, state) {
    let lights_on = state.lights_on || 11
    let lights_offset = state.lights_offset || 0
    let lights_period = state.lights_period || 24
    let arc_begin = frac2rad(lights_offset / lights_period) + internal_offset
    let arc_end = frac2rad((lights_offset + lights_on) / lights_period) + internal_offset
    let center_x = ctx.canvas.width / 2
    let center_y = ctx.canvas.height / 2
    let radius = Math.min(ctx.canvas.height, ctx.canvas.width) / 2

    ctx.save()

    //daytime
    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.moveTo(center_x, center_y)
    ctx.arc(center_x, center_y, radius, arc_begin, arc_end)
    ctx.lineTo(center_x, center_y)
    ctx.fill()
  
    //nighttime
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.moveTo(center_x, center_y)
    ctx.arc(center_x, center_y, radius, arc_end, arc_begin)
    ctx.lineTo(center_x, center_y)
    ctx.fill()

    draw_hour_lines(ctx, frameCount, center_x, center_y, radius, lights_period, 0.2)
    draw_hour_lines(ctx, frameCount, center_x, center_y, radius, lights_period*5, 0.1)

    if(lights_period == 24) {
        draw_clock(ctx, frameCount, center_x, center_y, radius)
    }

    ctx.restore()
}

const Canvas = props => {

  const { data, title, width, height, lights_on, lights_offset, lights_period, ...rest } = props
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const render = () => {
      frameCount++
      draw(context, frameCount, {data: data, title: title, width: width, height: height, lights_on:lights_on, lights_offset:lights_offset, lights_period:lights_period})
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, props])

  return (
      <div>
          <canvas width={width} ref={canvasRef} {...rest} />
      </div>
  )
}

class LightSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {lights_on: 12, lights_offset: 0, lights_period: 24, configure: 1}

        this.changeVal = this.changeVal.bind(this)
    }

    changeVal(x, d) {
        if(x == "lights_on") {
            this.setState({lights_on: this.state.lights_on + d})
        } else if(x == "lights_offset") {
            this.setState({lights_offset: this.state.lights_offset + d})
        } else if(x == "lights_period") {
            this.setState({lights_period: this.state.lights_period + d})
        }
    }

    render() {
        return (
            <Grid container>
                {this.state.configure ? 
                <Grid item >
                    <Card>
                        lights_on: {this.state.lights_on} <br/>
                        <Button onClick={() => this.changeVal("lights_on", 1)}>+</Button><Button onClick={() => this.changeVal("lights_on", -1)}>-</Button> <br/>
                        lights_offset: {this.state.lights_offset} <br/>
                        <Button onClick={() => this.changeVal("lights_offset", 1)}>+</Button><Button onClick={() => this.changeVal("lights_offset", -1)}>-</Button> <br/>
                        lights_period: {this.state.lights_period} <br/>
                        <Button onClick={() => this.changeVal("lights_period", 1)}>+</Button><Button onClick={() => this.changeVal("lights_period", -1)}>-</Button> <br/>
                    </Card>
                </Grid>
                : null}
                <Grid item>
                    <Canvas data={null} title={"lights"} width="200" height="200" lights_on={this.state.lights_on} lights_offset={this.state.lights_offset} lights_period={this.state.lights_period}>

                    </Canvas>
                </Grid>
            </Grid>
        )
    }
}

export default LightSchedule