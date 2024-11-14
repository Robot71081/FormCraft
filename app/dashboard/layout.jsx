"use client"
import { SignedIn } from '@clerk/clerk-react'
import React from 'react'
import Sidenav from './_components/Sidenav'

function layout({children}) {
  return (
    <SignedIn>
    <div>
       <div className='md:w-64 fixed'>
        <Sidenav/>
       </div>
       <div className='md:ml-64'>
       {children}
       </div>
      
     
    </div>
    </SignedIn>
     
  )
}

export default layout

