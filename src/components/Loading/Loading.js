import React from 'react';
import classes from './Loading.module.css';

const loading = (props) => {
    return (
        <div className={classes.Loading}>
            <div className={classes.TextBox}>
                <h1 className={classes.HeadingPrimary}>
                    <span className={classes.HeadingPrimaryMain}>Route</span>
                    <span className={classes.HeadingPrimarySub}>create your own!</span>
                </h1>
                <button className={classes.Button} onClick={props.closePicture}>Enter</button>
            </div>
        </div>
    )
}

export default loading