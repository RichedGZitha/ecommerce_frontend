import Button from 'react-bootstrap/Button';

import { useSelector} from 'react-redux';
import { useState, useEffect } from "react";
import {getSpecialProducts, getFeaturedProducts} from '../services/productService';
import ProductItem from '../components/product/ProductItem';
import '../App.css';

import {CONSTANTS} from '../constants';

function Home(props) {
	     
   const [special, setSpecial] = useState([]);
   const [featured, setFeatured] = useState([]);
   const [daily, setDaily] = useState([]);
   const [brands, setBrands] = useState([]);
   const [isLoading, setIsLoading] = useState(true);


   // renders the specials.
   const renderSpecials = ()=>{

  const items = special.map((data,index)=><ProductItem product={data} key={index} className="col-3"/>);
  return items;

}

// fetch data
const fetchProducts = async () => {
              const specialData = await getSpecialProducts();

              if(specialData.isError !== true)
              {
                setSpecial((prev)=>{


                    return [...specialData.products];
                });

              }


              // featured products.
              const featuredData = await getFeaturedProducts();

              if(featuredData.isError !== true)
              {
                setFeatured((prev)=>{
                  return [...featuredData.products];
                })

                 setIsLoading((prev)=>false);

              }

            }



    useEffect(()=> {
        
       fetchProducts();
       document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Home`;

       // fetch every: 30 seconds.
       const interval=setInterval(()=>{
          fetchProducts()
       },30000);
       
       
    // stop interval when going to another page.
    return()=>clearInterval(interval);
         
    

  }, []); 
   
  return (

    <div className="container mt-2">
      <div className="row">

        {isLoading === true 
          ? 
          
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
               <span className="visually-hidden">Loading</span>
             </div>
          </div>

          :

            <div className="col-12">

              {special.length > 0 &&
                 
                    <div className="row">
                      <h3 className="section-title">On Special</h3>
                      {special.map((data,index)=>(<div key={index} className="col-6 col-xxl-2 col-md-3 mb-2 p-1"><ProductItem product={data} isSpecial={true} /></div>))}
                    </div>

               }

              
               {featured.length > 0 &&
                  <div className="row">
                    <h3 className="section-title">Featured Products</h3>
                    {featured.map((data,index)=>(<div key={index} className="col-6 col-xxl-2 col-md-4 mb-2 p-1 col-sm-4"><ProductItem product={data} isFeatured={true} /></div>))}
                  </div>

                }
            
            
          </div>
        }

      </div>
      
    </div>

  );
}

export default Home;