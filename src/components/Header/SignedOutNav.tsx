import React from 'react'
import Link from 'next/link'

function SignedOutNav() {
  const tailwindClasses = 'text-white py-2 px-4 rounded transition duration-300 hover:bg-[#4a4eec]';

  return (
    <ul className='flex gap-4 items-center'>
      <li><Link href='/signup' className={tailwindClasses}>Sign up</Link></li>
      <li><Link href='/signin' className={tailwindClasses}>Sign In</Link></li>
    </ul>
  )
}

export default SignedOutNav