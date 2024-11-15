import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function Page() {
  return (
    <div className=" mx-auto h-screen">
     
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl flex items-center justify-between mb-8 mt-4 ml-4">
        My Forms
      </h2>
     
    
     

     

      {/* Form List Section */}
      <div className="space-y-8">
        <FormList />
      </div>
    </div>
  )
}

export default Page
