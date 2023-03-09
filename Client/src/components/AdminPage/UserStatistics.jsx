import { useEffect, useState } from "react"


export default function UserStatistics(){
    const [userStatistics, setUserStatistics] = useState({})

    useEffect(()=>{
        fetch('/userStatistics')
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setUserStatistics(response.stats);
            }
        })
    }, [])


    return(
        <>
            <div className="card-light column-alignment">
                <h1>{userStatistics.user}</h1>
                <h3 style={{fontWeight: '400'}}>Registered Users</h3>
            </div>
            <div className="card-light column-alignment">
                <h1>12</h1>
                <h3 style={{fontWeight: '400'}}>Orders Completed</h3>
            </div>
            <div className="card-light column-alignment">
                <h1>2100</h1>
                <h3 style={{fontWeight: '400'}}>Total Income</h3>
            </div>
            <div className="card-light column-alignment">
                <h1>500</h1>
                <h3 style={{fontWeight: '400'}}>Expenses</h3>
            </div>
        </>
    )
}