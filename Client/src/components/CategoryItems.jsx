import { useState, useEffect } from "react";
import { ImageCard } from "../ui/ui";

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
        <div id="category-items">
            {items.map(item => {
                return <ImageCard 
                    itemData = {item}
                    key={item._id}
                />
            })}
        </div>
    )
}