import React from 'react'
import Welcome from './headerdetalist/welcome'
import Headers from './headerdetalist/headers'
import Navbar from './headerdetalist/navbar'

export default function Headersite() {
  return (
    <div className='shadow-xl'>
        <Welcome/>
        <Headers/>
        <Navbar/>
    </div>
  )
}
