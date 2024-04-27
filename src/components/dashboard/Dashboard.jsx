import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'
import Navbar from '../navbar/Navbar'
import { getChartData, getData } from '../../utils/dashboardApi'
import ChartComponent from '../chart/ChartComponent'

const Dashboard = () => {
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [country, setCountry] = React.useState('');
  const [topic, setTopic] = React.useState('');

const getfilter=()=>{
  getData().then((res)=>{
    setFilterData(res.data)
  }).catch((err)=>{
     throw err;
  })
}

  useEffect(() => {
    getChartData(country,topic).then((res) => {
      setData(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
    getfilter()
  },[country,topic])

  console.log(filterData);


  return (
    <div>
      <Navbar/>
      <div className={styles.Filter}>
        <div className={styles.Filter_item}>
          <label>Filter by</label>
          <select className={styles.Filter_select}  onChange={(e)=>setTopic(e.target.value)} >
            {
              filterData?.map((item)=>(
                <>
                <option value={item.topic}>{item.topic}</option>
                </>
              ))
            }
          </select>

          <select className={styles.Filter_select} onChange={(e)=>setCountry(e.target.value)} >
            {
              filterData?.map((item)=>(
                <>
                <option value={item.country}>{item.country}</option>
                </>
              ))
            }
          </select>
        </div>
      </div>
      <div className={styles.dashboard}>
      <ChartComponent data={data}/>
    </div>
    </div>
  )
}

export default Dashboard