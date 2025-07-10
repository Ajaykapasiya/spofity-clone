import React from 'react'

const SongItem = (image,name,desc,id) => {
  return (
    <div className='min-w-[180px] px-3 p-2 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={image} alt="" />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem
