import React from 'react';
import classes from './Route.module.css';

const route = (props) => {

    const locations = props.locations.map((el, index) => <span 
    className={classes.Line}
    key={el+index}> {el} </span>);

    return (
        <div className={classes.Route}>
            <span className={classes.Line}>Маршрут № {props.number}:</span> {locations}
        </div>
    )
}

export default route;