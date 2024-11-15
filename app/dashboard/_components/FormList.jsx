'use client'
import { db } from '@/config'
import { forms } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormItem from './FormItem'

function FormList() {
    const { user } = useUser()
    const [formlist, setFormlist] = useState([])

    useEffect(() => {
        if (user) {
            getFormList()
        }
    }, [user])

    const getFormList = async () => {
        const result = await db
            .select()
            .from(forms)
            .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(forms.id))
        
        setFormlist(result)
    }

    return (
        <div className=' shadow-sm rounded-lg p-6 space-y-4 md:grid md:grid-cols-4 md:space-x-6 md:space-y-0'>
        {formlist.map((form, index) => {
          return (
            <div key={index} className="flex-1"> {/* Ensure it takes available space */}
              <FormItem form={JSON.parse(form.jsonform)} formRecord={form} refreshData={getFormList} />
            </div>
          )
        })}
      </div>
      
    )
}

export default FormList
