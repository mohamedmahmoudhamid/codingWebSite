import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Prodact = () => {
const [prodacts , detProdacts]=useState([])
    useEffect(()=>{
        const fetchdata = async()=>{

            const res = await axios.get("url api here")
            setProdacts(res.data)
        }

fetchdata()
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Prodact;
