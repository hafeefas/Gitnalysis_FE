import React, {useState, useEffect} from 'react'
import { getRepoMetrics } from '../services/getRepoMetrics'
import DateRangeToolbar from '../components/DateRangeToolbar'
import LeadTimeChart from '.././components/LeadTimeChart'

const MobileChartLayout = ({username,currRepo}) => {

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
    <div>MobileChartLayout</div>
  )
}

export default MobileChartLayout