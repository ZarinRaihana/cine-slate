import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import classes from "../styles/CustomPagination.module.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

function CustomPagination({setPage, numOfPages = 10}) {

    const handleChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }

    return (
        <div className={classes.pagination}>
            <ThemeProvider theme={darkTheme}>
                <Pagination  count={numOfPages} 
                                        onChange={(e) => 
                                        handleChange (e.target.textContent)} 
                                        color="primary" 
                                        hideNextButton hidePrevButton />
             </ThemeProvider>
        </div>
    )
}

export default CustomPagination
