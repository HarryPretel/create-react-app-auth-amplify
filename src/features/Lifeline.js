import React from 'react'
import { Card } from '@material-ui/core'
import { Canvas, useFrame } from '@react-three/fiber'
import {Box} from './Box'
import {Table} from './Table'
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

class Lifeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas> 
            <Canvas>
                <OrbitControls></OrbitControls>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
                <Suspense fallback={null}>
              <Table />
                </Suspense>
            </Canvas>
            
            </Card>
        )
    }
}

export default Lifeline