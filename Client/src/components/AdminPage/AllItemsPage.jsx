import { useEffect, useState } from "react";
import { ImageCard, Heading, Loader } from "../../ui/ui";


export default function AllItemsPage(){
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        document.title = 'UnderBelly Express | All Items'

        fetch('/allItems')
        .then(response => response.json())
        .then(response =>{
            // console.log(response)
            setLoader(false);
            if(response.success){
                setItems(response.categories);
            }
        })
    },[])

    return (
        loader ? 
            <Loader />
            : 
            <div id="admin-page" style={{color: 'black', padding: '2rem'}}>
                <Heading style={{color: 'black', textAlign: 'center'}}>All Menu Items</Heading>
                <div>
                    {items.map(category => {
                            return (
                                <div style={{marginBottom: '2rem'}}>
                                    <Heading style={{color: 'black'}}>{category.category}</Heading>
                                    <div className="items-section">
                                        {category.items.map(item =>{
                                            return (
                                                    <ImageCard 
                                                        itemData = {item}
                                                        key={item._id}
                                                    />
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}