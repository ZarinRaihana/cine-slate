import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from '../../styles/Trending.module.css';
import Content from '../Content';
import CustomPagination from '../CustomPagination';

function Trending() {
    const [contents, setContents] = useState([]);
    const [page, setPage] = useState(1)


    useEffect(() => {
        const fetchTrending = async () =>{
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    
                setContents(data.results);                
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTrending();
    },[page])

    return (
        <div >
            <span className="pageTitle" >trending now</span>
            <div className={classes.trending}>
                {contents && contents.map(content => (
                        <Content id={content.id}
                        mediaType={content.media_type}
                         title={content.title || content.name} poster={content.poster_path} date={content.release_date}
                         voteAvg={content.vote_average}  key={content.id} />
                )) }
            </div>
            <CustomPagination setPage = {setPage} />
        </div>
    )
}

export default Trending
