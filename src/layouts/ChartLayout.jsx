import React, {useState, useEffect} from 'react'
import { getRepoMetrics,getLeadTime } from '../services/getRepoMetrics'
import DateRangeToolbar from '../components/DateRangeToolbar'
import LeadTimeChart from '.././components/LeadTimeChart'

const ChartLayout = ({full_name}) => {

  const [repoInfo,setRepoInfo] = useState(null)
  const [lead_time_metric,setLead_time_metric] = useState(null)

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        const metrics = await getRepoMetrics(full_name);
        setRepoInfo(metrics);
        const lead_time = await getLeadTime(full_name);
        setLead_time_metric(lead_time);
      } catch (error) {
        console.error('Error fetching repository metrics:', error);
      }
    }

    fetchRepoMetrics();
  }, [full_name]);

  const width = 500;
  const height = 150;
  const padding = 20;

  return (
    //gonna have all chart component
    //going to have all the graphs, etc
    //will have all dropdowns and buttons
    <>
      <div class=' h-auto grid gap-y-12 p-10 '> 
        <DateRangeToolbar currRepo={full_name}/>
        <div class="grid grid-cols-3 gap-x-4 text-center" >
          <div class="bg-slate-300 p-4 ">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
          <div class="bg-slate-300 p-4">Col</div>
        </div>
        <div class="grid grid-cols-12 gap-x-4 text-center">
        <div class="bg-slate-400 p-6 col-span-8">
        <LeadTimeChart repoInfo={repoInfo}/>
        </div>
          <div class="bg-slate-400 p-6 col-span-4 text-white">
            <h6 class="text-black font-extrabold">Current Average Lead Time</h6>
            {lead_time_metric}
          </div>
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