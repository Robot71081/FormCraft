"use client"
import { db } from '@/config'
import { forms } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormFields from '../_components/FormFields'
import { toast } from 'sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'

function Page({ params }) {
  const { user } = useUser()
  const [jsonForm, setJsonForm] = useState([])
  const [record, setRecord] = useState([])
  const [selectedTheme, setSelectedTheme] = useState('light')
  const [selectedGradient, setSelectedGradient] = useState('')
  const [updateTrigger, setUpdateTrigger] = useState()
  const router = useRouter()

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm)
      updateInDb()
    }
  }, [updateTrigger])

  const onFieldUpdate = (value, idx) => {
    jsonForm.fields[idx].label = value.label
    jsonForm.fields[idx].placeholder = value.placeholder
    setUpdateTrigger(Date.now())
  }

  const deleteField = (idxToRemove) => {
    const result = jsonForm.fields.filter((item, idx) => idx !== idxToRemove)
    jsonForm.fields = result
    setUpdateTrigger(Date.now())
  }

  const updateFields=async (value,cname)=>{
       const result=await db.update(forms).set({
        [cname]:value
       }).where(and(eq(forms.id, params?.formId), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)))
       toast('Update Successful')
  }

  useEffect(() => {
    if (user) {
      getFormData()
    }
  }, [user])

  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, params?.formId), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)))

    const formData = JSON.parse(result[0].jsonform)
    setRecord(result[0])
    setJsonForm(formData)
    setSelectedGradient(result[0].color)
  }

  const updateInDb = async () => {
    const result = await db.update(forms).set({
      jsonform: jsonForm
    }).where(and(eq(forms.id, record.id), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))).returning({ id: forms.id })
    console.log(result)
    toast('Update Successful')
  }

  return (
    <div className="p-6 md:p-3">
      <div className='flex justify-between items-center'>
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className='flex gap-2 flex-row'>

        <Link href={'/aiform/'+ record?.id} target='_blank'>
        <Button className='flex gap-2'> <SquareArrowOutUpRight/>Preview</Button> </Link>
       
        <RWebShare
            data={{
              text: jsonForm?.form_subheading + ", Build your form in seconds",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}aiform/${record?.id}`,
              title: jsonForm?.form_title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className='flex gap-2'><Share/>Share</Button>
          </RWebShare>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Controller Section */}
        <div className="p-5 border rounded-lg shadow-md bg-gray-300">
          <Controller selectedTheme={(value) =>{
            updateFields(value,'theme')
            setSelectedTheme(value)
         
        } }
           selectedGradient={(value) =>{
            updateFields(value,'color') 
            setSelectedGradient(value)}} />
        </div>

        {/* Form Section */}
        <div
          className={`md:col-span-2 border rounded-lg p-5 overflow-auto shadow-md flex items-center justify-center`}
          style={{ backgroundColor: selectedGradient ? selectedGradient : 'white' }}  // Apply gradient or fallback to white
        >
          {/* Form Fields centered */}
          <div className="w-full max-w-4xl">
            <FormFields
              selectedTheme={selectedTheme}
              jsonForm={jsonForm}
              onFieldUpdate={onFieldUpdate}
              deleteField={(idx) => deleteField(idx)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
