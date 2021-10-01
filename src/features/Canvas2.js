import React, { useRef, useEffect } from 'react'
import { Grid, Slider, Paper, Card, FormControl, InputLabel, Select } from '@material-ui/core'

let slider = 0


function getAYearOfData(start_date, intervals, ceiling, n) {

  let ret = {}
  for (let i = 0; i < intervals.length; i++) {
    ret[intervals[i]] = []
    for (let j = 0; j < n; j++) {
      ret[intervals[i]].push({ timestamp: j * intervals[i] / n, value: Math.floor(Math.random() * ceiling) })
    }
  }
  return ret
}


function get_max_min_value_timestamp(data) {
  // console.log(data)
  let min_val = data[0].value
  let max_val = min_val
  let min_time = data[0].timestamp
  let max_time = min_time

  for (let i = 0; i < data.length; i++) {
    min_val = Math.min(min_val, data[i].value)
    max_val = Math.max(max_val, data[i].value)
    min_time = Math.min(min_time, data[i].timestamp)
    max_time = Math.max(max_time, data[i].timestamp)
  }

  return [max_val, min_val, max_time, min_time]
}






let canvasX, canvasY
function draw_timestamped_line_graph(ctx, frameCount, state) {

  ctx.save()

  // scale to dimensions of widget
  ctx.scale(ctx.canvas.width / state.width, ctx.canvas.height / state.height)

  // clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#000000'

  // compute maximums and minimums
  let [max_y, offset_y, max_x, offset_x] = get_max_min_value_timestamp(state.data)
  let range_x = max_x - offset_x
  let range_y = max_y - offset_y

  // box around canvas
  ctx.beginPath()
  ctx.rect(1, 1, state.width - 2, state.height - 2)
  ctx.stroke()

  // draw points
  for (let i = 0; i < state.data.length; i++) {
    let x = state.data[i].timestamp
    x -= offset_x
    x *= state.width
    x /= range_x

    let y = state.data[i].value
    y -= offset_y
    y *= state.height
    y /= range_y

    ctx.beginPath()
    ctx.arc(x, y, 1, 0, Math.PI * 2)
    ctx.stroke()

  }

  // draw line plot
  ctx.beginPath()
  for (let i = 0; i < state.data.length; i++) {
    let x = state.data[i].timestamp
    x -= offset_x
    x *= state.width
    x /= range_x

    let y = state.data[i].value
    y -= offset_y
    y *= state.height
    y /= range_y

    ctx.lineTo(x, y)

  }
  ctx.stroke()

  ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);


  ctx.canvas.addEventListener("mousemove", function (e) {
    var cRect = ctx.canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    // context.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
  });


  // vertical line
  ctx.beginPath()
  ctx.moveTo(canvasX, 0)
  ctx.lineTo(canvasX, state.height)
  ctx.stroke()

  // horizontal line
  ctx.beginPath()
  ctx.moveTo(0, canvasY)
  ctx.lineTo(state.width, canvasY)
  ctx.stroke()

  ctx.restore()
}


function draw(ctx, frameCount, state) {
  draw_timestamped_line_graph(ctx, frameCount, state)
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

function unitletter2millis(unit) {
  if (unit == "H") return 60 * 60 * 1000
  if (unit == "D") return 24 * 60 * 60 * 1000
  if (unit == "W") return 7 * 24 * 60 * 60 * 1000
  if (unit == "M") return 4 * 7 * 24 * 60 * 60 * 1000
  if (unit == "Y") return 12 * 4 * 7 * 24 * 60 * 60 * 1000
  return 0

}

class TimeGraph extends React.Component {
  constructor(props) {
    super(props)
    let units = ["D", "W", "M", "Y"]
    let intervals = units.map(v => unitletter2millis(v))
    let data = getAYearOfData(0, intervals, 100, 100)
    let u = "D"
    let props_data = data[unitletter2millis(u)]
    console.log(data)
    this.state = { data: props_data, all_data: data, title: props.title, width: props.width, height: props.height, amount: 1, unit: u, units: units }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
    let props_data = this.state.all_data[unitletter2millis(this.state.unit)]
    this.setState({ data: props_data })
  };

  render() {

    return (
        <Grid container>
          <Grid item>
            {/* <FormControl>
              <InputLabel htmlFor="age-native-simple"></InputLabel>
              <Select
                native
                value={this.state.unit}
                onChange={this.handleChange}
                inputProps={{
                  name: 'unit',
                  id: 'unit-native-simple',
                }}
              >
                {this.state.value}
                {this.state.units.map((value) => {
                  return <option value={value}>{value}</option>
                }
                )}
              </Select>
            </FormControl> */}
          </Grid>

          <Grid item>
            <Canvas data={this.state.data} title={this.state.title} width={this.state.width} height={this.state.height} />
          </Grid>
        </Grid>
    )
  }
}

export default TimeGraph 