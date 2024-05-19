'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import {
  MeshReflectorMaterial,
  Plane,
  Html,
  GradientTexture,
  Text,
  MeshPortalMaterial,
  useProgress,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import * as THREE from 'three'

// function Loader() {
//   const { progress, active } = useProgress()
//   return <HTML center>{progress.toFixed(1)} % loaded</HTML>
// }

// const font = new FontLoader().parse(require('fonts/bold/blob'))
const Text3D = dynamic(() => import('@react-three/drei').then((mod) => mod.Text3D), {
  ssr: false,
})
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Dashboard() {
  const { levaStuffToGoHere } = useControls({ levaStuffToGoHere: false })
  return (
    <>
      <Leva collapsed />

      <div className='bg-slate-800'>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
          {/* jumbo */}
          <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
            <p className='w-full rounded border bg-slate-800 p-2 uppercase text-indigo-300 shadow'>
              The Future is here
            </p>
          </div>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-lime-200'>Dom and 3D are synchronized</h2>
        </div>

        <div className='relative my-12 h-96 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-5/6 sm:w-full'>
            <Suspense fallback={null}>
              <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[15, 35]} />

                <meshBasicMaterial side={2} transparent>
                  <GradientTexture
                    stops={[0, 0.3, 0.5, 1]} // As many stops as you want
                    colors={['black', 'blue', 'pink', 'lime']} // Colors need to match the number of stops
                    size={1024} // Size is optional, default = 1024
                  />
                </meshBasicMaterial>
              </mesh>
              <Html position={[0, -1, 15]}>
                <div className='bg-lime-50'></div>
              </Html>
              <Text color={'yellow'} scale={0.3} rotation={[0, 0, 0]} postion={[-3, 3, 2]}>
                Here is Text
                {'\n'}
                More text please
              </Text>
            </Suspense>
          </View>
        </div>
      </div>
    </>
  )
}
