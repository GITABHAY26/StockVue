import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { mockCompanyDetails, mockSearchResults } from '../constants/mock'
import Search from './Search'
import Header from './Header'
import Details from './Details'
import Overview from './Overview'
import Chart from './Chart'
import ThemeContext from '../Context/ThemeContext'
import StockContext from '../Context/StockContext'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'

const  Dashboard = () => {
   const {darkMode , setDarkMode} = useContext(ThemeContext);
   
   const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  useEffect(() => {
   const updateStockDetails = async () => {
     try {
       const result = await fetchStockDetails(stockSymbol);
       setStockDetails(result);
     } catch (error) {
       setStockDetails({});
       console.log(error);
     }
   };

   const updateStockOverview = async () => {
     try {
       const result = await fetchQuote(stockSymbol);
       setQuote(result);
     } catch (error) {
       setQuote({});
       console.log(error);
     }
   };

   updateStockDetails();
   updateStockOverview();
 }, [stockSymbol]);


  return (
    <>
    <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 font-quicksand p-10 ${darkMode?"bg-gray-900 text-gray-300":"bg-neutral-100"}`}>
    
    <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
      
    <Header name={stockDetails.name}></Header>
    </div>

    <div className='md:col-span-2 row-span-4  xl:row-span-4'>
       <Chart></Chart>
    </div>

    <div >
        <Overview   symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}></Overview>
    </div>

    <div className='row-span-2 xl:row-span-3'>
       <Details details={stockDetails}></Details>
    </div>
    
    
    </div>
    
         
    </>
    )
}

export default Dashboard