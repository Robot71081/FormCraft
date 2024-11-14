"use client"
import FormFields from '@/app/edit-style/_components/FormFields'
import { db } from '@/config'
import { forms } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function AiForm({params}) {
   
    const [record,setRecord]=useState()
    const [jsonForm, setJsonForm] = useState([])
    useEffect(()=>{
       
        getFormData()
    },[])
    const getFormData=async()=>{
        const result=await db.select().from(forms).where(eq(forms.id,Number(params?.formid)))
        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonform))
        console.log(result)
    }

  return (
    <div className='p-10 items-center flex justify-center ' style={{backgroundColor:record?.color}}>
     <FormFields 
     jsonForm={jsonForm}
     selectedTheme={record?.theme}
     editable={false}
     formId={record.id}
     
     />
    </div>
  )
}

export default AiForm
