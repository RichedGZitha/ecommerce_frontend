import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../App.css';
import {CONSTANTS} from '../constants';
import {getAllCategories, getProductsByCategory, getProductsByCustomParams} from "../services/productService";
import ProductItem from "../components/product/ProductItem";
import {updateSearch} from "../services/searchService";


// 
const mapStateToProps = (state) => 
{
    return state.searchReducer;
}


  const Shop = ()=>{

      const [max_range, setMaxRange] = useState(0);
      const [min_range, setMinRange] = useState(0);

      const [categories, setCategories] = useState([]);
      const [products, setProducts] = useState([]);
  
      const [count, setCount] = useState(10);
      const search =  useSelector(mapStateToProps);
      const dispatch = useDispatch();

      useEffect(()=>{

            document.title = `Shop - ${CONSTANTS.ECOM_WEBSITE_NAME}`;

            (async ()=>{

                  let categoriesResult = await getAllCategories();

                  if(categoriesResult.isError === false)
                  {
                    setCategories(()=>categoriesResult.categories);
                  }

                  
                  if(search.search_products.length > 0)
                  {
                      
                      updateSearch({"serach": search.search,"count":search.count,"search_products":search.search_products ,"min_price":search.min_price, "max_price":search.max_price ,"category": search.category}, dispatch);
                  }

                  else
                  {
                      let newProducts = await getProductsByCustomParams({'count':count, 'category':'All'});

                      if (newProducts.isError === false)
                      {
                          updateSearch({"serach": search.search,"count":search.count,"search_products":newProducts.products ,"min_price":search.min_price, "max_price":search.max_price ,"category": search.category}, dispatch);
                      }
                  }

                  

            })();

      }, [count, dispatch, search.category, search.count, search.max_price, search.min_price, search.search, search.search_products]);


      useEffect(()=>{

        if(search.search_products.length > 0)
        {
            setProducts(()=>search.search_products);
        }


        
      }, [search.search_products]);

      // get products as per category
      const getByCategory = (e)=>{

        const selectedCategory = e.target.firstChild.data;
        //e.target.className="change-cursor active mr-auto text-dark border border-outline-danger";

        // refresh products.
        ( async ()=>{
          let newProducts = await getProductsByCategory(selectedCategory, count);

          if (newProducts.isError === false)
          {
              setProducts(()=>newProducts.products);
          }

        })();

      
      }


      const handleCountChange = (e)=>
      {
        setCount(()=>e.target.value);
        updateSearch({"serach": search.search,"count":count, "search_products":search.search_products ,"min_price":search.min_price, "max_price":search.max_price ,"category": search.category}, dispatch);
      }


      // handle range
      const handleRangeChange = (e)=>
      {
        setMaxRange(()=>e.target.value);
        updateSearch({"serach": search.search,"count":search.count, "search_products":search.search_products ,"min_price":search.min_price, "max_price":max_range ,"category": search.category}, dispatch);

      }

      // renders the list of categories.
      const renderCategories = ()=>
      {
        const items = categories.map((value, index)=><li key={index} onClick={getByCategory}>  <span variant="default" className="change-cursor mr-auto text-purple">{value}</span> </li>);
        return (<ul className="unstyle-list">
                {items}
          </ul>);
      }

      
       // display to the user.
       const renderProducts = ()=>{

            const items = products.map((data,index)=>(<div key={index} className="col-sm"><ProductItem product={data} isSpecial={true} /></div>));
            return items;
        }


  		return (

  			<div className="container mt-4">
  				<div className="row">

  						<h1> Shop</h1>

              <div className="col-md-3 col-12">

                <div className="row">
                    <h5> Browse by Categories </h5>
                    {renderCategories()}
                </div>

                <hr/>

                <div className="row">
                    <h5> Price Filter </h5>

                        <label className="form-label"> Min: {new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(min_range)} - Max: {new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(max_range)} </label><br/>
                        <input
                            id="min"
                            className="form-range"
                            name="min"
                            type="range"
                            step="1"
                            min="0"
                            max="10000"
                            onChange={handleRangeChange}
                            
                          />
                </div>


                <hr/>
                <div className="row">

                  <h5> Select number of products to display: </h5>

                         <select className="form-select" value={count} onChange={handleCountChange}>

                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                </div>

              </div>

            {/** main section **/}
            <div className="col-md-9 col-12">

                <div className="row">

                    <div className="col-4">
                      <p> <span className="text-danger fs-4">{products.length } </span> Products Found {search.search !== undefined && `for "${search.search}"`} </p>
                    </div>
                </div>

                <hr/>

                <div className="row p-4 gy-4">

                        {renderProducts()}

                </div>

            </div>

  				</div>
  			</div>



  			);
  }


  export default Shop;