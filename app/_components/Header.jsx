"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'


function Header() {
  const {user,isSignedIn} = useUser()
  const path=usePathname()
 
  return !path.includes('aiform') && (
   
    <div className='p-5 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <span className='font-semibold  rounded-lg '>FormCraft</span>
        {isSignedIn?
        <div className='flex items-center gap-5'>
          <Link href={"/dashboard"}><Button variant="outline">DashBoard</Button></Link>
        
        <UserButton/>
        </div>:
       <SignInButton>
         <Button>Get Started</Button>
       </SignInButton>
        
        }
      
      </div>
    </div>
  )
}

export default Header
