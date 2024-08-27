import React,{useState,useEffect} from 'react'
import FoodItem from './FoodItem'
import menuJson from '../../Data/Internship.menus.json'
import foodJson from '../../Data/Internship.fooditems.json'
import resJson from '../../Data/Internship.restaurants.json'
import { useParams } from 'react-router-dom';
export default function Menu  ({oncartChange}) {
  const [menujsonData, setmenujsonData] = useState(null);
  const [foodjsonData, setfoodjsonData] = useState(null);
  const [menuData, setmenuData] = useState(null);
  const [displayFood,setdisplayFood]=useState(null);
  const [hotel,setRestaurant]=useState(null);
  const { restId }= useParams();


  let foundFood=async (items)=>{
    let foodRecords=[];
    for(let item of items)
    {
      const Record=await foodJson.find(food => food._id.$oid === item);
      foodRecords.push(Record);
    }
    return foodRecords;
  }

  const foundCategory=async (foundRestaurant)=>{
    const Menu=foundRestaurant.menu;
    let foodCat={};
    for(let items of Menu)
    {
      foodCat[items.category]=await foundFood(items.items);
    }
    setdisplayFood(foodCat);

  }

  const foundRes=async (menuJson)=>{
    const foundRestaurant =await menuJson.find(restaurant => restaurant.restaurant.$oid === restId);
    const restaurant=await resJson.find(restaurant => restaurant._id.$oid === restId)
    setRestaurant(restaurant);
    foundCategory(foundRestaurant);
  }

  useEffect(()=>{
    setmenujsonData(menuJson);
    // setfoodjsonData(foodJson);
    foundRes(menuJson)    
  },[])

  
  return (
    <div> 
          {displayFood!=null ? 
            (Object.keys(displayFood).map(key=>(
                <div>
                  <h2>{key}</h2>
                  <hr/>
                  <div className='row'>
                      <FoodItem foodItem={displayFood[key]} oncartChange={oncartChange} rest={hotel}/>
                  </div>
                </div>
              ))
            )
            :
            <div>Not found</div>
          }
      </div>
  )
}
