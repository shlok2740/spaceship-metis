import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'

import { useStore } from '../state/useStore'

// THREE components
import Ship from './Ship'
import Ground from './Ground'
import Skybox from './Skybox'
import Cubes from './Cubes'
import Walls from './Walls'
import SpaceTunnel from './SpaceTunnel'
import Effects from './Effects'

// State/dummy components
import KeyboardControls from './KeyboardControls'
import GameState from './GameState'
import GlobalColor from './GlobalColor'

// HTML components
import Overlay from './html/Overlay'
import Hud from './html/Hud'
import GameOverScreen from './html/GameOverScreen'


export default function SpaceShip({ color, bgColor }) {
  const directionalLight = useStore((s) => s.directionalLight)

  return (
    <>
      <Canvas gl={{ antialias: false, alpha: false }} mode="concurrent" dpr={[1, 1.5]} style={{ background: `${bgColor}` }}>
        <Suspense fallback={null}>
          <GameState />
          <Skybox />
          <directionalLight
            ref={directionalLight}
            intensity={3}
            position={[0, Math.PI, 0]}
          />
          <ambientLight intensity={0.1} />
          <Ship>
            {directionalLight.current && <primitive object={directionalLight.current.target} />}
          </Ship>
          <Walls />
          <Cubes />
          <SpaceTunnel />
          <Ground groundColor={bgColor} />
          <KeyboardControls />
          <Effects />
          <GlobalColor />
          <Preload all />
        </Suspense>
      </Canvas>
      <Hud />
      <GameOverScreen />
      <Overlay />
    </>
  )
}

