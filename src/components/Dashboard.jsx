import React, { useContext } from 'react'
import Card from './Card'
import { mockCompanyDetails, mockSearchResults } from '../constants/mock'
import Search from './Search'
import Header from './Header'
import Details from './Details'
import Overview from './Overview'
import Chart from './Chart'
import ThemeContext from '../Context/ThemeContext'

const  Dashboard = () => {
   const {darkMode , setDarkMode} = useContext(ThemeContext);
  return (
    <>
    <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 font-quicksand p-10 ${darkMode?"bg-gray-900 text-gray-300":"bg-neutral-100"}`}>
    
    <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
      
    <Header name={mockCompanyDetails.name}></Header>
    </div>

    <div className='md:col-span-2 row-span-4  xl:row-span-4'>
       <Chart></Chart>
    </div>

    <div >
        <Overview   symbol={mockCompanyDetails.ticker}
          price={300}
          change={30}
          changePercent={10.0}
          currency={"USD"}></Overview>
    </div>

    <div className='row-span-2 xl:row-span-3'>
       <Details details={mockCompanyDetails}></Details>
    </div>
    
    
    </div>
    
         
    </>
    )
}

export default Dashboard