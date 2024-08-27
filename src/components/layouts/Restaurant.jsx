import React,{useEffect,useState} from 'react'
import json from '../../Data/Internship.restaurants.json'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link,useParams} from 'react-router-dom';
export default function Restaurant()
{
  const [data,setData]=useState(null);
  const { restaurant } = useParams();
  
  useEffect(()=>{
    if(restaurant)
    {
        const value=restaurant.replace('%20',' ')
        console.log(value);
        let searchRestaurant=[];
        searchRestaurant=json.filter(rest => rest.name===value);
        setData(searchRestaurant);
        console.log(data);
    }
    else{
        setData(json);
        console.log("1");
    }
    
    
  },[restaurant])
  return (
    <div className='d-flex justify-content-between flex-wrap w-100 vh-100 my-3'>
        {data != null ?
            (data.map((rest,index)=>(
                
                <div className='card p-3 w-25 h-50 rounded d-flex flex-column align-items-center' key={index}>
                    <Link to={`/menu/${rest._id.$oid}`} className='w-100 h-50 text-center'>
                        <img className='w-75 h-100' src={rest.images[0].url} alt="Dominos"/>
                    </Link>

                    <div className='card-body d-flex flex-column align-items-center w-100 h-50'>
                        <h5 className='card-title text-truncate text-center w-75'>{rest.name}</h5>
                        <p className='rest_address'>
                            123 Street,place,City-00000,state
                        </p>
                        <div className='rating-outer'>
                            <div className='rating-inner'>
                                <span id='no_of_reviews'>140 reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            )))
            
            :
            <div>No record Found</div>
        }
        
    </div>
  )
}
