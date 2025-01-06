import Link from 'next/link'
import React from 'react'

const Heading = () => {
  return (
    <div className=''>
        <Link href="/blog">
        <button>create</button>
        </Link>
    </div>
  )
}

export default Heading