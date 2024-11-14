import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Formedit from './Formedit'
import { db } from '@/config'
import { userResponses } from '@/config/schema'
import moment from 'moment'
import { toast } from 'sonner'

function FormFields({ jsonForm,onFieldUpdate,deleteField,selectedTheme,editable=true,formId=0}) {
  
  if (!jsonForm || !jsonForm.fields) {
    return <div>Loading or Error: Form data is not available.</div>
  }
   const [FormData,setFormData]=useState()
   let formRef=useRef()
  const handleInput=(event)=>{
     
        const {name,value}=event.target
        setFormData({
          ...FormData,[name]:value
        })

  } 

  const handleSelect=(name,value)=>{
     
    
    setFormData({
      ...FormData,[name]:value
    })

}

const handleCheckbox=(fieldname,itemname,value)=>{
     
    const list=FormData?.[fieldname]?FormData?.[fieldname]:[]
    if(value)
    {
      list.push({
        label:itemname,
        value:value
      })
      setFormData({
        ...FormData,[fieldname]:list
      })
    }
    else
    {
      const result=list.filter((item)=>item.label===itemname)
      setFormData({
        ...FormData,[fieldname]:result
      })
    }


}

  const onFormSubmit=async(event)=>{
    event.preventDefault()
   console.log(FormData)
   const result=await db.insert(userResponses).values({
    jsonResponse:FormData,
    createdAt:moment().format("DD/MM/YYYY"),
    formRef:formId
   })

   if(result)
   {
    formRef.reset()
    toast('Form Response Collected')
   }
   else{
    toast('Error while collecting response')
   }

}

  return (
    <form onSubmit={onFormSubmit} className="border p-5 md:w-[600px] overflow-hidden" data-theme={selectedTheme} ref={(e)=>formRef=e}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.form_title}</h2>
      <h3 className="text-sm text-gray-400 text-center">{jsonForm?.form_subheading}</h3>
      
      {jsonForm.fields.map((field, idx) => (
        <div key={idx} className="my-3 ">
          {/* Handling Select Field */}
          {field.field_type === 'select' && (
            <>
              <label htmlFor={field.field_name} className="text-xs">{field.label}</label>
              <Select id={field.field_name} name={field.field_name}  required={field?.required} onValueChange={(e)=>handleSelect(field.field_name,e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder || "Select an option"} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option, idx) => (
                    <SelectItem key={idx} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}

          {/* Handling Radio Button Field */}
          {field.field_type === 'radio' && (
            <>
              <label className="text-xs">{field.label}</label>
              <RadioGroup defaultValue={field.options?.[0]?.value}>
                {field.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value}  required={field?.required} onClick={()=>handleSelect(field.field_name,option.label)} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {/* Handling Checkbox Field */}
          {field.field_type === 'checkbox' && (
            <>
              <label className="text-xs">{field.label}</label>
              <div>
                {field.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      name={field.field_name}
                      value={option.value}
                      onCheckedChange={(e)=>handleCheckbox(field?.label,option.label,e)}
                      
                    />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </>
          )}
         

          {/* Handling Input Field */}
          {field.field_type !== 'select' && field.field_type !== 'radio' && field.field_type !== 'checkbox' && (
            <>
              <label htmlFor={field.field_name} className="text-xs">{field.label}</label>
              <Input
                type={field?.field_type || 'text'} // Default to 'text' if type is not provided
                placeholder={field.placeholder}
                name={field.field_name}
                id={field.field_name}
                onChange={(e)=>handleInput(e)}
                required={field?.required}
              />
            </>
          )}
    {editable &&
          <div>
            <Formedit defaultValue={field} onUpdate={(value)=>onFieldUpdate(value,idx)} deleteField={()=>deleteField(idx)}/>
          </div>}
        </div>
      ))}
      <button type='submit' className='btn btn-primary rounded-lg '>Submit</button>
    </form>
  )
}

export default FormFields
