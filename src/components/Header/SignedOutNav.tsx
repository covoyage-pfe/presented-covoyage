import React from 'react'
import Link from 'next/link'

function SignedOutNav() {
  return (
    <ul className='flex gap-4 items-center'>
      <li><Link href='/signup'>Sign up</Link></li>
      <li><Link href='/signin'>Sign In</Link></li>
    </ul>
  )
}

export default SignedOutNav