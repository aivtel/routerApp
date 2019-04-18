import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <div className={classes.NavItems}>
        <div>
            <NavItem route={'/userroutes'}>My routes</NavItem>
        </div>
        <div className={classes.R}>
            <NavItem>Два</NavItem><NavItem>Три</NavItem>
        </div>
    </div>
);

export default navItems;
