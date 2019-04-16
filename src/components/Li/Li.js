import React, {Component} from 'react';
import classes from './Li.module.css';
import { Droppable } from 'react-beautiful-dnd';
import Location from './Location';

class List extends Component {

    render() {
        return (
                <Droppable droppableId="droppableId">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.List}>
                            {this.props.names.map((li, index, array)=>{
                                return (<Location 
                                            key={""+li.id+index} 
                                            index={index}
                                            id={li.id} 
                                            location={li.value} 
                                            delete={this.props.delete}></Location>)
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>               
        )
    }
}

export default List;