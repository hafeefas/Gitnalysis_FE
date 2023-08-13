import React from 'react'
import ToolbarLayout from './ToolbarLayout'

const ChartLayout = () => {
  return (
    //gonna have all chart component
    //going to have all the graphs, etc
    //will have all dropdowns and buttons
    <>
      <div class=' h-auto grid gap-y-12 p-10 '>
        <div class="grid grid-cols-3 gap-x-4 text-center" >
          <div class="bg-slate-300 p-4 ">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
        </div>
  
        <div class="grid grid-cols-12 gap-x-4 text-center">
          <div class="bg-slate-400 p-6 col-span-8">Col</div>
          <div class="bg-slate-400 p-6 col-span-4">Col</div>
        </div>

        <div class="grid grid-cols-3 gap-x-4 text-center">
          <div class="bg-slate-300 p-4">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
        </div>

      </div>
    </>

  )
}

export default ChartLayout