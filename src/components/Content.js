import Badge from '@mui/material/Badge';
import React from 'react';
import { img_300, unavailable } from '../config/config';
import classes from '../styles/Content.module.css';


function Content({
    id,
    mediaType,
    title,
    poster,
    date,
    voteAvg
}) {
    return ( 
        <div className={classes.media}>
        <Badge badgeContent={voteAvg} color={voteAvg > 6 ? "primary" : "secondary"}/>
            <img className={classes.poster} src={ poster ? `${img_300}/${poster}` : unavailable} alt="title" /> 
            <b className={classes.title}>{title}</b>

            <div className={classes.subTitle}>
            <span>{mediaType === 'movie' ? 'Movie' : 'Tv Series'}</span>
         <span >{date}</span>

            </div>
        </div>

    )
}

export default Content
