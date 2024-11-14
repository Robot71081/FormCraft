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
        <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
            {formlist.map((form, index) => {
                return (
                    <div key={index}>
                        <FormItem form={JSON.parse(form.jsonform)} formRecord={form} refreshData={getFormList} />
                    </div>
                )
            })}
        </div>
    )
}

export default FormList
