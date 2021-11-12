import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { img_300, noPicture } from '../config/config';
import classes from '../styles/Carousell.module.css';

const handleDragStart = (e) => e.preventDefault();

export default function Carousell  ({mediaType, id})  {
    const [credits, setCredits] = useState([]);

    //  fetching Credits
    useEffect(() => {
        const fetchCredits = async () =>{
            const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);

             setCredits(data.cast);
            console.log(data.cast);
        }
        fetchCredits();

        return () => {
            setCredits([]);
        }
    }, [mediaType, id])
    
    //  making carousel responsive
    const responsive = {
        0 : {
            items: 3
        },
        512 : {
            items: 5,
        },
        1024 : {
            items: 7
        },
    }

    const items = credits?.map((credit, i) => (
        <div className={classes.carouselItem} > 
                    <img className={classes.carouselItem_img} 
                            src={credit.profile_path ?  
                                    `${img_300}/${credit.profile_path}` 
                                    : noPicture}  
                            alt = {credit.name}
                            onDragStart ={handleDragStart}
                    />
                    <b className='carouselItem_name'>{credit?.name}</b>
        </div>
   ))

    return (
        <AliceCarousel 
                autoPlay
                responsive={responsive}
                infinite
                disableDotsControls
                // disableButtonsControls
                mouseTracking items={items}  
            />
    );
}


        

