import React from 'react';
import classes from './Navbar.module.css';
import {connect} from 'react-redux';
import NavItem from './NavItems/NavItem/NavItem';
import * as actions from '../../store/actions';

const navbar = (props) => {
    return (<header className={classes.Navbar}>
        <div className={classes.Auth}>
            <NavItem link={'/userroutes'}>My routes</NavItem>
            <button 
                className={classes.Button}
                onClick={() => {props.locationName.length > 0 ? props.saveLocationsToDB(props.locationName, props.userId, props.token) : alert("Выберите как минимум одну точку!")}}>Save current route</button>
        </div>
        {props.token === null ? 
        <div className={classes.Auth}>
            <NavItem link={'/login'}>Log In</NavItem>
            <NavItem link={'/signup'}>Sign Up</NavItem>
        </div> 
        :
        <div className={classes.Auth}>
            <NavItem link={'/logout'}>Logout</NavItem>
        </div>}

    </header>)
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.localId,
        locationName: state.location.locationName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLocationsToDB: (location, userId, token) => dispatch(actions.saveLocationsToDB(location, userId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);