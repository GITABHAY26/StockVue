import React, { useContext, useState } from 'react'
import Card from './Card';
import { mockHistoricalData } from '../constants/mock';
import { convertDateToUnixTimestamp, convertUnixTimestampToDate } from '../helpers/date-helper';
import { Area,AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';
import ThemeContext from '../Context/ThemeContext';

const   Chart =() => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");

    const { darkMode } = useContext(ThemeContext);

    const formatData = (data) => {
        return data.c.map((item, index) => {
          return {
            value: item.toFixed(2),
            date: convertUnixTimestampToDate(data.t[index]),
          };
        });
      };
  return (
    <>
     <Card>
        <ul className='flex absolute top-2 right-2 z-40'>
            { Object.keys(chartConfig).map((item)=>{return(
                <li key={item}>
                    <ChartFilter 
                    text={item}
                    active={filter === item}
                    onclick={()=>{setFilter(item)}}
                    ></ChartFilter>
                </li>
            )})

            }

        </ul>
       
        <ResponsiveContainer>
            
         <AreaChart data={formatData(data)}>

         <defs>
    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0}/>
    </linearGradient>
  </defs>

            <Area  type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
                ></Area>
                <Tooltip 
                 contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
                 itemStyle={darkMode ? { color: "#818cf8" } : null}
                ></Tooltip>
              
                <XAxis dataKey={"date"}></XAxis>
                <YAxis domain={["dataMin", "dataMax"]}></YAxis>
            </AreaChart>
        </ResponsiveContainer>
     </Card>

    
    </>
  )
}

export default Chart