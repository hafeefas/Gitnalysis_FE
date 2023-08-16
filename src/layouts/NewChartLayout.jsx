import React, {useState, useEffect} from 'react'
import { getRepoMetrics } from '../services/getRepoMetrics'
import DateRangeToolbar from '../components/DateRangeToolbar'
import LeadTimeChart from '.././components/LeadTimeChart'

const NewChartLayout = ({username,currRepo}) => {

    const [repoInfo,setRepoInfo] = useState(null)

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        console.log(username, currRepo,'passsed into new chart')
        const metrics = await getRepoMetrics(username, currRepo);
        setRepoInfo(metrics);
        console.log(metrics);
      } catch (error) {
        console.error('Error fetching repository metrics:', error);
      }
    }

    fetchRepoMetrics();
  }, [currRepo]);

  console.log("Rendering NewChartLayout");

  return (
    <><div>
          <div className="flex h-auto gap-y-12 p-10">
              <div className="flex w-full">
                  <div className="grid grid-cols-3 grid-rows-2 gap-x-4 pr-4 text-center" style={{width: "49%"}}>
                      <div className="flex col-span-1 h-24 bg-slate-300 p-2 items-center justify-center">Collaborators</div>
                      <div className="flex col-span-1 h-24 bg-slate-300 p-2 items-center justify-center">Branches</div>
                      <div className="flex col-span-1 h-24 bg-slate-300 p-2 items-center justify-center">Pull Request Merged Success Rate</div>
                  </div>
                  <div className="w-1/3">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-center">
                          <div className=" bg-slate-300" style={{width: "77%"}}>
    
                              <div className="flex h-20 p-2 items-center justify-center">Merged PRs</div>
                          </div>
                          <div className=" bg-slate-300" style={{width: "77%", transform: "translateX(-50px)"}}>
                
                              <div className="flex h-20 p-2 items-center justify-center">Open PRs</div>
                          </div>
                          <div className="bg-slate-300" style={{width: "77%"}}>
        
                              <div className="flex h-20 p-2 items-center justify-center">Closed Issues</div>
                          </div>
                          <div className="bg-slate-300" style={{ width: '77%', transform: 'translateX(-50px)' }}>
                
                              <div className="flex h-20 p-2 items-center justify-center">New Issues</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="pl-10 text-center" style={{transform:'translateY(-120px)'}}>
              <div className="flex bg-slate-300 h-48 items-center justify-center" style={{width: "46.5%"}} >
              <div className="flex h-20 p-2 items-center justify-center object-fill" style={{width: "106.5%"}}>lead time</div>
              </div>
          </div>
      </div><div className="flex">
              <div className="pl-10 grid-rows-12 grid grid-cols-2 gap-x-4 gap-y-4 text-center" style={{transform: "translateY(-96px)",width: "208.5%"}}>
                  <div className="flex col-span-1 h-48 bg-slate-300 p-2 items-center justify-center">Change Failure Rate('CFR')</div>
                  <div className="flex col-span-1 h-48 bg-slate-300 p-2 justify-center items-center">Issues</div>
              </div>
              <div className="pl-5 grid-rows-12 grid grid-cols-2 gap-x-4 gap-y-4 text-center" style={{transform: "translate(-10px,-230px)", width:"230%"}}>
                  <div className="flex bg-slate-300 p-2 justify-center items-center" style={{height:"328px", transform: "translateY(-135px)"}}>Commits w/ collaborators barchart</div>
          </div>
</div></>
)
}

export default NewChartLayout