import React,{useRef,useState} from "react";
import {FaSearch} from "react-icons/fa";
import {Link} from 'react-router-dom'
export default function Search(){
    const [search,setsearchValue]=useState('All Restaurants')
    const searchRestaurant=(event)=>{
        setsearchValue(event.target.value); 
    }
    return (
        <form className="">
            <div className="input-group" style={{ width:'100%' }}>
                <div className="bg-white p-2 rounded">
                    <Link to={`/${search}`} id=""
                    className="text-dark">
                        <FaSearch className="fa
                        fa-search"/>
                    </Link>
                </div> 
                <select value={search} onChange={searchRestaurant} id="search-field" className="rounded">
                    <option value="">Search Restaurant Here</option>
                    <option value="Haldiram's">Haldiram</option>
                    <option value="Mani's Dum Biryani">Mani Dum Biryani</option>
                    <option value="Dindigul Thalappakatti">Dindigul Thalappakatti</option>
                    <option value="KFC">KFC</option>
                    <option value="Empire restaurant ">Empire restaurant</option>
                    <option value="Imperial Restaurant Since 1954">Imperial Restaurant Since 1954</option>
                    <option value="Meghana's Biryani">Meghana's Biryani</option>
                    <option value="Daily Sushi">Daily Sushi</option>
                </select>
            </div>
            
        </form>
    );

}