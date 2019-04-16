import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    return (
        <div>
                <input 
                    className={classes.Input} 
                    value={props.value}
                    type="text" 
                    placeholder=" Введите название точки маршрута"
                    onChange={props.change} 
                    onKeyPress={props.inputVal}/>
        </div>
    )
}

export default input;