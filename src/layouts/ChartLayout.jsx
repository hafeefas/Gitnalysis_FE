import React, {useState, useEffect} from 'react'
import { getRepoMetrics } from '../services/getRepoMetrics'
import DateRangeToolbar from '../components/DateRangeToolbar'
const ChartLayout = ({username,currRepo}) => {

  const [repoInfo,setRepoInfo] = useState(null)

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        const metrics = await getRepoMetrics(username, currRepo);
        setRepoInfo(metrics);
      } catch (error) {
        console.error('Error fetching repository metrics:', error);
      }
    }

    fetchRepoMetrics();
  }, [currRepo]);

  return (
    //gonna have all chart component
    //going to have all the graphs, etc
    //will have all dropdowns and buttons
    <>
      <div class=' h-auto grid gap-y-12 p-10 '> 
        <DateRangeToolbar currRepo={currRepo}/>
        <div class="grid grid-cols-3 gap-x-4 text-center" >
          <div class="bg-slate-300 p-4 ">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
        </div>
        <div class="grid grid-cols-12 gap-x-4 text-center">
        <div class="bg-slate-400 p-6 col-span-8">
        {repoInfo?.data.map((data, index) => (
            <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 whitespace-normal">
              Merged At: {data.merged_at}, Average: {data.average}
            </li>
          ))}
          </div>
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