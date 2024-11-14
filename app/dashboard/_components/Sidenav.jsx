import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LibraryBig, MessageSquare, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Sidenav = () => {
    const path =usePathname()
    useEffect(()=>{
        // console.log(path)
    },[path])
    const MenuList=[
        {
            id:1,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Responses',
            icon:MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:1,
            name:'Upgrade',
            icon:Shield,
            path:'/dashhboard/upgrades'
        },
    ]
  return (
    <div className='h-screen shadow-md border'>
      <div className='p-5'>
        {MenuList.map((menu,index)=>(
            <Link href={menu.path} key={index} className={`flex items-center gap-3 p-5 mb-3 cursor-pointer hover:bg-primary hover:text-white rounded-lg ${path==menu.path&& 'bg-black text-white'}`}>
                <menu.icon/>
                {menu.name}
            </Link>
    ))}
      </div>
      <div className="fixed bottom-10 p-6 w-64">
         <Button className="w-full">+ Create Form</Button>
         <div className='my-7'>
          <Progress value={33} />
          <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong>Out of <strong>3</strong> forms created</h2>
          <h2 className='text-sm mt-3 text-gray-600'>Upgrade Plan</h2>
         </div>
      </div>
    </div>

  )
}

export default Sidenav
