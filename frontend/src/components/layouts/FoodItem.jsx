import React,{useEffect,useState} from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import json from '../../Data/Internship.fooditems.json'
import {Link} from 'react-router-dom';

function FoodItem({foodItem,oncartChange,rest,isLogin}) {  
    const [data, setData] = useState([]);
    const [isAdded, setAdded] = useState({});
    // const [isLogin,setisLogin]=useState(false);
    const [userLogin,setuserLogin]=useState(isLogin)
    const changeCart=(item)=>{
        if(userLogin==='true')
        {
            item['quantity']=1;
            isAdded[item._id.$oid]=true;
            console.log(isAdded);
            let cartData=JSON.parse(localStorage.getItem('foodItems')) || {};
            if(!cartData[rest.name])
            {
                cartData[rest.name]=[];
            }
            cartData[rest.name].push(item);
            localStorage.setItem('foodItems',JSON.stringify(cartData));
            oncartChange();
        }
        else
        {
            window.alert('Login Required');
        }
        
    }

    useEffect(()=>{
        setuserLogin(isLogin);
    },[isLogin])

    useEffect(() => {
    // Fetch the JSON data
        // setisLogin(localStorage.getItem('isLogin'));
        setData(foodItem);
        let added={};
        foodItem.map((item,index)=>{
            added[item._id.$oid]=false;
        })
        setAdded(added);
    },[isLogin]);
  return (
    <div className='my-3 d-flex flex-wrap w-100'>
            {data != null ? 
                (data.map((item,index)=>(
                        <div key={index} className='card p-3 rounded w-25' style={{ height:'450px'}}>
                            <img src={item.images[0].url} className='card-img-top mx-auto' alt ="Pizza"/>
            
                            <div className='card-body d-flex flex-column'>
                                <h5 className='card-title text-center' style={{ minHeight:'50px'}}>
                                    {item.name}
                                </h5>
                                {/* <p className='fooditem_des'>Crunchy and cheesy veg loaded pizza served with happpines</p> */}
                                <p className='card-text text-center'>
                                <FaIndianRupeeSign /> 180
                                <br/>
                                </p>
                                {
                                    isAdded[item._id.$oid] ? <Link to="/cart" className='text-center'>Go to cart</Link>  : (<button onClick={()=>(changeCart(item))} id="card_btn" className='btn btn-primary d-inline ml-4'>
                                        Add to Cart
                                    </button>) 
                                } 
                                <br/>
                                <p className='w-100 text-center'>Status:<span id="stock_status"
                                className={10>5 ? "greenColor" : "redColor"}>
                                    {10>5 ?"In Stock" : "Out of Stock"}
                                    </span></p>
                            </div>
                        </div>
                )))
                :
                <div>Record Not Found</div>
            }

    </div>
  )
}

export default FoodItem;
