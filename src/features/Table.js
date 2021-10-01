import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from '@react-three/fiber'
import { Suspense } from "react";
export function Table(props) {
    const materials = useLoader(MTLLoader, '/texturedMesh.mtl')
    const obj = useLoader(OBJLoader, '/texturedMesh.obj', loader => {
        materials.preload()
        loader.setMaterials(materials)
    })
    // Rotate mesh every frame, this is outside of React without overhead
    
    return (
            <primitive object={obj} />
    )
}