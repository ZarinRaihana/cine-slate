import React from 'react';
import classes from '../styles/Header.module.css';

function Header() {
    return (
        <div className={classes.header} 
                onClick={() => window.scroll(0,0)}
                >
                Cine Slate
        </div>
    )
}

export default Header
