import { useState, useEffect } from 'react';
import ColdStartsGraphComponent from '../components/ColdStartsGraphComponent';
import ColdStartsMetricsContainer from './ColdStartsMetricsContainer';
import AvgBilledDurGraph from '../components/AvgBilledDurGraphComponent';
import '../Graphs.css';

interface FunctionData {
  functionName: string;
  avgBilledDur: number;
  numColdStarts: number;
  percentColdStarts: number;
}

const DashboardContainer = () => {
  const [data, setData] = useState<FunctionData[]>([]);

  const fetchData = () => {
    fetch('http://localhost:8080/data/req')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const sortedData = data
    .sort((a, b) => b.percentColdStarts - a.percentColdStarts)
    .slice(0, 10);

    return (
      <div className='grid'>
        
        {/* Quadrant 1 */}
        <div className='quadrant'>
          <div className='dashboard-header'>
            <h1>Function Performance</h1>
            <button className='refresh-button' onClick={handleRefresh}>&#x21bb;</button>
          </div>
          <div className='component-box'>
            <AvgBilledDurGraph data={sortedData} />
          </div>
        </div>
    
        {/* Quadrant 2 */}
        <div className='component-box'>
          <ColdStartsMetricsContainer data={sortedData} />
        </div>
    
        {/* Quadrant 3 */}
        <div className='component-box'>
          <ColdStartsGraphComponent data={sortedData} />
        </div>
    
        {/* Quadrant 4 */}
        <div className='component-box'>
          <h2>Bedrock Analysis</h2>
          <p>Coming soon...</p>
        </div>
      </div>
    );
};



export default DashboardContainer;
