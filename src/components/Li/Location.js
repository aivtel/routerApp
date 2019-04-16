import React, {Component} from 'react';
import classes from './Li.module.css';
import {Draggable} from 'react-beautiful-dnd';


class Location extends Component {
    render() {
        return  (
                <Draggable draggableId={this.props.id} index={this.props.index}>
                    {(provided) => {
                        return (<div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                                <p className={classes.Para}>
                                    {this.props.location} <span className={classes.Close} onClick={() => {this.props.delete(this.props.id)}}>  x<span className={classes.Tooltiptext}>Удалить</span></span>    
                                </p> 
                        </div>)
                    }}
                </Draggable>
                )
        }
}

export default Location;