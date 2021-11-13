import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import useGenre from './hooks/useGenre';

const useStyles = makeStyles({
    root:{
        margin: '3px',
        // '&.css-1haevf0-MuiButtonBase-root-MuiChip-root':{
        //     color: 'white',         
        // }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

function Genre({type, setPage, selectedGenres, setSelectedGenres}) {
    //  custom hook
    const {genres, setGenres} = useGenre(type);  
    
    const classes = useStyles();

    //  Adding to Selected Genres
    const handleAdd = (genre) =>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
        setPage(1);
    }

    //  Removing from  Selected Genres
    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((sGenre) => sGenre.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }

    return (
        <div style={{padding: '6px 0'}}>
        <ThemeProvider theme={darkTheme}>
            {selectedGenres && selectedGenres.map((genre) => 
                <Chip className={classes.root}  
                            label={genre.name}  
                            variant="filled"  
                            clickable 
                            color = "primary"
                            onDelete = {() => handleRemove(genre)}
                            key = {genre.id} 
                />
          )}  
            {genres && genres.map((genre) => 
                <Chip className={classes.root} 
                            label={genre.name}  
                            variant="outlined"  
                            clickable 
                            onClick={() => handleAdd(genre)}
                            key = {genre.id} 
                />
          )}  
          </ThemeProvider>
        </div>
    )
}

export default Genre
