import React from 'react'
import CountRestaurant from "./CountRestaurant";
import Restaurant from './Restaurant';

export default function Home() {
  return (
    <>
    <CountRestaurant/>
    <section>
        <div className="sort">
            <button className="sort_veg p-3">Pure veg</button>
            <button className="sort_veg p-3">Sort by review</button>
            <button className="sort_veg p-3">Sort by ratings</button>
        </div>
        <div className="row mt-4">
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
        </div>

    </section>


    </>
  );
}
