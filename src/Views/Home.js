import React, { useState } from 'react'
import ProductCard from '../Components/ProductCard'
import { useAxiosGet } from '../Hooks/HttpRequests'
import FilterButton from '../Components/FilterButton'

function Home(){
    const [filter, setFilter] = useState('All');

    const FILTER_MAP = {
        All: () => true,
        Low: task => task.price > 0 && task.price < 200,
        Medium: task => task.price > 200 && task.price < 400,
        High: task => task.price > 400 && task.price < 600,
        Extreme: task => task.price > 600,
      };
    
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton 
            key={name} 
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
      ));

    const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=1&limit=10`
    let products = useAxiosGet(url)

    let content = null

    if(products.data){
        content = 
        products.data.filter(FILTER_MAP[filter]).sort((a, b) => a.price - b.price).map((product) => 
            <div key={product.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
                <ProductCard 
                    product={product}
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mb-3">
                Product Listings
            </h1>
            {filterList}
            <div className="md:flex flex-wrap md:-mx-3">
                { content } 
            </div>
        </div>
    )
}

export default Home