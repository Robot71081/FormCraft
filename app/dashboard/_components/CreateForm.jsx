"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiChatSession } from '@/config/ai'
import { useUser } from '@clerk/nextjs'
import { forms } from '@/config/schema'
import { db } from '@/config'
import moment from 'moment/moment'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
  

function CreateForm() {
    const prompt=', generate a form in JSON format. the form should include a form_title and form_subheading.For each field include the following properties :field_name,paceholder,label,field-type,and required.Ensures the response excludes except the JSON objet,starting with { and ending with } andremember there sould not be any whitespace '
    
    const [userInput,setUserInput]=useState()
    const [trigger,setTrigger]=useState(false)
    const [loading,setLoading]=useState(false)
    const {user}=useUser()
    const route=useRouter()
    

    const onCreateForm=async()=>{
       
        setLoading(true)
      const result= await AiChatSession.sendMessage("Based on this user Description:"+userInput+prompt)
      //console.log(result.response.text())
      if(result.response.text())
      {
        const resp=await db.insert(forms).values({
            jsonform:result.response.text(),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD/MM/YYYY")
        }).returning({id:forms.id})
       // console.log(resp)
       if(resp[0].id)
       {
        route.push('/edit-style/'+resp[0].id)
       }
        setLoading(false)
      }
      setLoading(false)
      
    }
  return (
    <div>
         <Button onClick={()=>setTrigger(true)} className='mr-4 mt-4'>+ Create Form</Button>
      <Dialog open={trigger}>
 
  <DialogContent >
    <DialogHeader>
      <DialogTitle>Create New Form</DialogTitle>
      <DialogDescription>
       <Textarea className="my-2" placeholder="Write description for your form" 
       onChange={(event)=>setUserInput(event.target.value)}
       />
       <span className="flex gap-2  my-3 justify-end">
         <Button variant="destructive" onClick={()=>setTrigger(false)}>Close</Button>
        <Button onClick={()=>onCreateForm()} disabled={loading}>
          {loading?<Loader2 className='animate-spin'/>:'Create'}
          </Button>
       </span>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateForm
