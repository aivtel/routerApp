import React from 'react';
import classes from './Input.module.css';
import {connect} from 'react-redux';

const input = (props) => {
const z = props.userId;
    return (
        <div>
                <input 
                    className={classes.Input} 
                    value={props.value}
                    type={props.type} 
                    placeholder={props.placeholder}
                    onChange={props.change} 
                    onKeyPress={(e) => props.inputVal(e, z)}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.localId
    }
}

export default connect(mapStateToProps)(input);