"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Home, LibraryBig, MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import CreateForm from '../dashboard/_components/CreateForm'

function Header() {
  const { user, isSignedIn } = useUser()
  const path = usePathname()

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle menu on mobile screens
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return !path.includes('aiform') && (
    <div className='p-5 border-b shadow-sm bg-transparent backdrop-blur-lg'>
      <div className='flex items-center justify-between w-full'>
        {/* Logo and Site Name */}
        <span className='font-semibold text-3xl sm:text-4xl'>FormCraft</span>

        {/* Mobile Hamburger Button */}
        <div className='flex flex-row gap-4'>
      

        {/* Sign In Button for Mobile */}
        <div className="sm:hidden">
          {!isSignedIn ? (
            <SignInButton>
              <Button className="w-full">Get Started</Button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>

        <button 
          className="sm:hidden text-2xl bg-[#FFF9C4]"
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
       
        </div>

        {/* Desktop Navigation Links */}
        <div className='hidden sm:flex items-center gap-5'>
          {isSignedIn ? (
            <>
              <Link href={"/"}><Button variant="outline" className="hover:bg-black hover:text-white"><Home /> Home</Button></Link>
              <Link href={"/dashboard"}><Button variant="outline" className="hover:bg-black hover:text-white"><LibraryBig /> My Forms</Button></Link>
              <Link href={"/dashboard/responses"}><Button variant="outline" className="hover:bg-black hover:text-white"><MessagesSquare /> Responses</Button></Link>
              <CreateForm />
              <UserButton />
            </>
          ) : (
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu (visible when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 space-y-4">
          {isSignedIn ? (
            <>
              <Link href={"/"}><Button variant="outline" className="hover:bg-black hover:text-white w-full mb-2"><Home /> Home</Button></Link>
              <Link href={"/dashboard"}><Button variant="outline" className="hover:bg-black hover:text-white w-full mb-2"><LibraryBig /> My Forms</Button></Link>
              <Link href={"/dashboard/responses"}><Button variant="outline" className="hover:bg-black hover:text-white w-full"><MessagesSquare /> Responses</Button></Link>
              <CreateForm />
            </>
          ) : (
            <SignInButton>
              <Button className="w-full">Get Started</Button>
            </SignInButton>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
