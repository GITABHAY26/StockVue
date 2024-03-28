import React from 'react'

function ChartFilter({text , active, onclick}) {
  return (
   <button onClick={onclick}
   className={`w-12 h-8 border-1 rounded-md flex item-center justify-center cursor-pointer
   ${active?"bg-indigo-600 border-indigo-700 text-gray-100":"border-indigo-300 text-indigo-300"}`}
   >{text}</button>
  )
}

export default ChartFilter