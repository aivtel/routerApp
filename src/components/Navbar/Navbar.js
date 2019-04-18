import React from 'react';
import classes from './Navbar.module.css';
import {connect} from 'react-redux';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import * as actions from '../../store/actions';
import NavItems from './NavItems/NavItems';

const navbar = (props) => {
    return (
    <header className={classes.Header}>
        <DrawerToggle />
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
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