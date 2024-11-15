'use client'
import { db } from '@/config'
import { forms } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormlistRes from './_components/FormlistRes'

function Responses() {
  const { user } = useUser()
  const [formList, setFormList] = useState([])  // Initialize as an empty array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the form list when the user is authenticated
  useEffect(() => {
    if (user) {
      getFormList()
    }
  }, [user])

  const getFormList = async () => {
    try {
      setLoading(true)
      const result = await db.select().from(forms).where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
      setFormList(result)
    } catch (err) {
      setError('Failed to fetch forms. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div> 
  }

  if (error) {
    return <div className="text-red-500">{error}</div>  
  }

  return (
    <div className="p-5 h-screen ">
      <h2 className="font-bold text-3xl flex items-center justify-between ">Responses</h2>
      <div className="grid gird-cols-2 lg:grid-cols-3 gap-5 mt-4">
      
      {formList.length === 0 ? (
        <p>No forms found.</p> 
      ) : (
        formList.map((form, i) => {
          let jsonForm = {}
          try {
            jsonForm = JSON.parse(form.jsonform) 
          } catch (error) {
            console.error('Error parsing JSON:', error)
            jsonForm = {} 
          }

          return <FormlistRes key={i} formRecord={form} jsonForm={jsonForm} />
        })
      )}
      </div>
    </div>
  )
}

export default Responses
