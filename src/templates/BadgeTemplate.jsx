import React, { Children } from 'react'

const BadgeTemplate = ({children}) => {
  return (
    <div className='bg-transparent shadow-md shadow-black rounded-md'>{children}</div>
  )
}

export default BadgeTemplate