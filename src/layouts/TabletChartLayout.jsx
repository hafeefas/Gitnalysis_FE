import React, {useState, useEffect} from 'react'
import { getRepoMetrics } from '../services/getRepoMetrics'
import DateRangeToolbar from '../components/DateRangeToolbar'
import LeadTimeChart from '../components/LeadTimeChart'
import { useMediaQuery } from '@mui/material'
import Collaborators from '../components/Collaborators'
import Branches from '../components/Branches'
import MergeSuccessRate from '../components/MergeSuccessRate'

const TabletChartLayout = ({username,currRepo}) => {

  const [repoInfo,setRepoInfo] = useState(null)
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        const splitCurrRepo = currRepo.split("/");
        // console.log(splitCurrRepo);
        const username = splitCurrRepo[0];
        const repo = splitCurrRepo[1];
        const metrics = await getRepoMetrics(username, repo);
        setRepoInfo(metrics);
        // console.log(metrics);
      } catch (error) {
        console.error('Error fetching repository metrics:', error);
      }
    }

    fetchRepoMetrics();
  }, [currRepo]);

//   console.log("Rendering NewChartLayout");

  return (
    <div className={`w-full h-screen overflow-y-auto pt-28 ${isMobileScreen ? "ml-2" : "ml-8"}`}>
      <div className="grid gap-y-12">
        <div className="grid-rows-7 grid grid-cols-4 gap-4 mx-10 text-center text-white">
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl h-32 flex p-2 items-center justify-center " style={{ backgroundColor: '#171C2Eff' }}>Collaborators</div>
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl h-32 flex p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}><Branches/></div>
        <div className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-60 " style={{ backgroundColor: '#171C2Eff' }}>Issues</div>
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Open PRs</div>
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Merged PRs</div>
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Open Issues</div>
        <div className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Closed Issues</div>
        <div className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-56 " style={{ backgroundColor: '#171C2Eff' }}><LeadTimeChart repoInfo={repoInfo}/></div>
        <div className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-96" style={{ backgroundColor: '#171C2Eff' }}>Commits with Collaborators</div>
        <div className="col-span-4 bg-slate-300 h-32 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Merged Success Rate</div>
        <div className="col-span-4 bg-slate-300 h-60 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center" style={{ backgroundColor: '#171C2Eff' }}>Change Failure Rate</div>
        </div>
      </div>

    </div>
  )
}

export default TabletChartLayout