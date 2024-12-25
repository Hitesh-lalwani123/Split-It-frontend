import React from 'react'

const ItemTemplate = ({children}) => {
  return (
    <div className='bg-transparent backdrop-blur-md border-2 rounded-md border-black shadow-md p-1 my-2 shadow-slate-500 text-black'>{children}</div>
  )
}

export default ItemTemplate