import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageCard } from "../ui/ui";
import Navbar from "./Navbar";

export default function CategoryItems({searchParam}){
    const [items, setItems] = useState([]);
    const [searchItemData, setSearchItemData] = useState({});

    const {searchQuery} = useParams();

    useEffect(()=>{
        if(!searchQuery){
            fetch(`/categories/${searchParam}`)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    console.log(response);
                    console.log(searchParam + " category items recieved");
                    setItems(response.items);
                }
            })
        }
        else{
            console.log('search block working');
            fetch(`/search/${searchQuery}`)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    console.log(response);
                    console.log('Item received for search query: ' + searchQuery);
                    setSearchItemData(response.itemData);
                }
            })
        }
    }, [searchParam, searchQuery]);

    return (
        <div className="dark-background column-alignment" style={{paddingBottom: '3rem'}}>
            <Navbar />

            <p className="heading">{searchQuery ? 'Result for ' + searchQuery: searchParam}</p>
            <div id="category-items">
                {!searchQuery && items.map(item => {
                    return <ImageCard 
                        itemData = {item}
                        key={item._id}
                    />
                })}

                {searchQuery && <ImageCard itemData={searchItemData} />}
            </div>
        </div>
    )
}