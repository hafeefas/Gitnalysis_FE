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
    <><div className="w-screen h-full">
          <div className="flex gap-y-12 p-10">
              <div className="flex w-full" >
                  <div className="grid grid-cols-3 grid-rows-2 gap-x-4 pr-4 text-center text-white" style={{width: "54%"}}>
                      <div className="flex col-span-1 h-32 bg-slate-300 p-2 items-center justify-center rounded-xl shadow-3xl" style={{backgroundColor:'#171C2Eff'}}>Collaborators</div>
                      <div className="flex col-span-1 h-32 bg-slate-300 p-2 items-center justify-center rounded-xl shadow-3xl" style={{backgroundColor:'#171C2Eff'}}>Branches</div>
                      <div className="flex col-span-1 h-32 bg-slate-300 p-2 items-center justify-center rounded-xl shadow-3xl" style={{backgroundColor:'#171C2Eff'}}>Pull Request Merged Success Rate</div>
                  </div>
                  <div className="w-1/3">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-center">
                          <div className="bg-slate-300 ml-1 w-4/5 rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
    
                              <div className="flex h-28 p-2 items-center justify-center">Merged PRs</div>
                          </div>
                          <div className="bg-slate-300 ml-1 w-4/5 rounded-xl shadow-3xl text-white" style={{transform: "translateX(-50px)", backgroundColor:'#171C2Eff'}}>
                
                              <div className="flex h-28 p-2 items-center justify-center">Open PRs</div>
                          </div>
                          <div className="bg-slate-300 ml-1 w-4/5 rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
        
                              <div className="flex p-2 items-center justify-center h-28" >Closed Issues</div>
                          </div>
                          <div className="bg-slate-300 ml-1 w-4/5 rounded-xl shadow-3xl text-white" style={{transform: 'translateX(-50px)', backgroundColor:'#171C2Eff' }}>
                
                              <div className="flex h-28 p-2 items-center justify-center">New Issues</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="pl-10 text-center" style={{transform:'translateY(-150px)'}}>
              <div className="flex bg-slate-300 items-center justify-center rounded-xl shadow-3xl text-white" style={{width: "51.5%", backgroundColor:'#171C2Eff'}} >
              <div className="flex h-56 p-2 items-center justify-center object-fill" style={{width: "136.5%"}}>lead time</div>
              </div>
          </div>
      </div><div className="flex">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-center ml-10" style={{transform: "translateY(-335px)",width: "50%"}}>
                  <div className="flex col-span-1 h-60 bg-slate-300 p-2 items-center justify-center rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>Change Failure Rate('CFR')</div>
                  <div className="flex col-span-1 h-60 bg-slate-300 p-2 justify-center items-center rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>Issues</div>
              </div>
              <div style={{transform: "translate(20px,-470px)"}}>
                  <div className="flex bg-slate-300 p-2 justify-center items-center rounded-xl shadow-3xl text-white" style={{width: "140%", height:'375px', backgroundColor:'#171C2Eff'}}>Commits w/ collaborators barchart</div>
          </div>
</div></>
)
}

export default NewChartLayout