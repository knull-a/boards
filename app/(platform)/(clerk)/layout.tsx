import { WithChildren } from '@/app/types'
import React from 'react'

export default function SignInLayout({children}: WithChildren) {
  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  )
}
