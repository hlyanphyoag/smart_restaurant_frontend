import React from 'react'
import { IngredientForm } from '../components/IngredientForm'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 max-w-2xl mx-auto p-4'>
        <h1 className='text-2xl font-bold'>Add Ingredient</h1>
        <IngredientForm />
    </div>
  )
}

export default page