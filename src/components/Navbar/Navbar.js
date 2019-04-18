import React from 'react';
import classes from './Navbar.module.css';
import {connect} from 'react-redux';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import * as actions from '../../store/actions';
import NavItems from './NavItems/NavItems';
import ToggleMenu from './ToggleMenu/ToggleMenu';

const navbar = (props) => {
    let toggle = null;
    if (props.toggleMenuState) {
        toggle = <ToggleMenu />
    } else {
        toggle = null
    }

    return (
        <header className={classes.Header}>  
            <DrawerToggle clicked={props.toggleMenu}/>
            {toggle}
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>)
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.localId,
        locationName: state.location.locationName,
        toggleMenuState: state.location.toggleMenu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLocationsToDB: (location, userId, token) => dispatch(actions.saveLocationsToDB(location, userId, token)),
        toggleMenu: () => dispatch(actions.toggleMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);