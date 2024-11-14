import { Button } from '@/components/ui/button'
import { db } from '@/config'
import { userResponses } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

function FormlistRes({jsonForm,formRecord}) {
    let jsonData=[]
    const [loading,setLoading]=useState()
    const ExportData=async()=>{
        setLoading(true)
        const result=await db.select().from(userResponses).where(eq(userResponses.formRef,formRecord.id))
       // console.log(result)
        if(result)
        {
            result.forEach((item)=>{
                const jsonItem=JSON.parse(item.jsonResponse)
                jsonData.push(jsonItem)
            })
            setLoading(false)
        }
       // console.log(jsonData)
       expToexcel(jsonData)
    }
    const expToexcel=(jsonData)=>{
        const worksheet =XLSX.utils.json_to_sheet(jsonData)
        const workbook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook,worksheet,"sheet1")
        XLSX.writeFile(workbook,jsonForm?.form_title+".xlsx")

    }
  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-6 space-y-4 bg-white">
  

    <div>
      <h2 className="font-semibold text-xl text-gray-900">{jsonForm?.form_title}</h2>
      <h3 className="text-sm text-gray-600">{jsonForm?.form_subheading}</h3>
      <hr className="my-4" />
      <div className="flex justify-between">
        <h2 className="text-sm"><strong>45</strong> responses</h2>
        <Button className="" size="sm" onClick={()=>ExportData()} disabled={loading}>{loading?<Loader2 className='animate-spin'/>:'Export'}</Button>
      </div>
    </div>

   
  </div>
  )
}

export default FormlistRes
