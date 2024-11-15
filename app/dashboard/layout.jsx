"use client"
import { SignedIn } from '@clerk/clerk-react'
import React from 'react'


function layout({children}) {
  return (
    <SignedIn>
    <div>
       
       
       {children}
       
      
     
    </div>
    </SignedIn>
     
  )
}

export default layout

