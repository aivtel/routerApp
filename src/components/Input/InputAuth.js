import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    return (
        <div>
                <input 
                    className={classes.Input} 
                    value={props.value}
                    type={props.type} 
                    placeholder={props.placeholder}
                    onChange={props.change}/>
        </div>
    )
}

export default input;