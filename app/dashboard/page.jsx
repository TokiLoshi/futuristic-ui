'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
impor { Roboto } from 'next/font/google'
import { Text3D, FontLoader } from '@react-three/drei'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

const Text3D = dynamic(() => import('@react-three/drei').then((mod) => mod.Text3D), {
  ssr: false,
})
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
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
  return (
    <>
      <div className='bg-slate-800'>
        <h1>Dashboard to go here</h1>
        <Text3D font={font}>Please Render</Text3D>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
          {/* jumbo */}
          <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
            <p className='w-full rounded border bg-slate-800 p-2 uppercase text-indigo-200 shadow'>Testing testing</p>
            <h1 className='my-4 rounded bg-lime-200 p-2 text-5xl font-bold leading-tight shadow'>
              Dashboard should go here
            </h1>
          </div>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
          <p className='mb-8 text-gray-600'>
            3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
            tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
            have multiple views with a single, performant canvas. These views will follow their tracking elements,
            scroll along, resize, etc.
          </p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
        </div>
        <div>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}></Suspense>
          </View>
        </div>
      </div>
    </>
  )
}
