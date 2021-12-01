import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from "../../styles/Trending.module.css";
import Content from '../Content';
import CustomPagination from '../CustomPagination';
import Genre from '../Genre';
import useSelectedGenre from '../hooks/useSelectedGenre';

function TvSeries() {
    const [contents, setContents] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);

    //  custom hook
    const genreUrl = useSelectedGenre(selectedGenres);

    window.scroll(0,0);
    
    //  fetching Tv series
    useEffect(() => {
        const fetchSeries = async () =>{
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreUrl}`);
    
                setContents(data.results);
                setNumOfPages(data.total_pages);                
                //  console.log(data);
            } catch (error) {
                console.log(`There was an ERROR..!`);
            }
        }

        fetchSeries();

        return () => {
            setContents([]);
        }
    },[page, genreUrl])

    return (
        <div>
            <span className="pageTitle" >Tv Series</span>

            <Genre type="tv" 
                        setPage={setPage} 
                        selectedGenres={selectedGenres} 
                        setSelectedGenres={setSelectedGenres} />

            <div className={classes.trending}>
                {contents && contents.map(content => (
                        <Content id={content.id}
                                        mediaType="tv"
                                        title={content.title} 
                                        poster={content.poster_path} 
                                        date={content.first_air_date}
                                        voteAvg={content.vote_average}  
                                        key={content.id} />
                )) }
            </div>
            
            {numOfPages > 1 && 
                    <CustomPagination setPage = {setPage} numOfPages = {numOfPages} />
            }
        </div>
    )
}

export default TvSeries
