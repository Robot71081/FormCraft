import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function page() {
  return (
    <div>
    <h2 className='font-bold text-3xl flex items-center justify-between '>Dashboard </h2>
       <CreateForm/>
       <FormList/>
   


    </div>
  )
}

export default page
