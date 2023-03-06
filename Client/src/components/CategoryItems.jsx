import { useState, useEffect } from "react";
import { ImageCard } from "../ui/ui";
import Navbar from "./Navbar";

export default function CategoryItems({searchParam}){
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch(`/categories/${searchParam}`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                console.log(searchParam + " category items recieved");
                setItems(response.items);
            }
        })
    }, [searchParam]);

    return (
        <div className="dark-background column-alignment">
            <Navbar />

            <p className="heading">{searchParam}</p>
            <div id="category-items">
                {items.map(item => {
                    return <ImageCard 
                        itemData = {item}
                        key={item._id}
                    />
                })}
            </div>
        </div>
    )
}