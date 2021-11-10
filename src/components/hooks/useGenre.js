import axios from 'axios';
import { useEffect, useState } from 'react';

function useGenre(type) {

    const [genres, setGenres] = useState([]);


    useEffect(() => {

        const fetchGenre = async () =>{
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-USpage`);
    
                setGenres(data.genres);                
              //   console.log(data);

            } catch (error) {
                console.log(`There was an ERROR..!`);
            }
        }

        fetchGenre();

        return () => {
            setGenres([]);
        }       

    },[type, setGenres])


    return (
        {genres,
        setGenres}
    )
}

export default useGenre
