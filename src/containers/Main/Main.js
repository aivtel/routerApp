import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import List from '../../components/Li/Li';
import Map from '../../components/Map/MapWithData';
import BlankMap from '../../components/Map/BlankMap';
import Input from '../../components/Input/Input';
import { DragDropContext } from 'react-beautiful-dnd';
import Loading from '../../components/Loading/Loading';

import Logo from '../../components/Logo/Logo';

class Main extends Component {

    state = {
        loading: true
    }

    onDragEnd = result => {
        const {destination, source} = result;
        if(!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }

        const newLocationName = [...this.props.locationName];
        const newObj = newLocationName[source.index];
        newLocationName.splice(source.index, 1); 
        newLocationName.splice(destination.index, 0, newObj);
        this.props.changeStateDropHandler(newLocationName);
    }

    closeLoadingPicture = () => {
        this.setState({
            ...this.state,
            loading: false
        })
    }

    render() {
       return(this.state.loading ?
            (<div>
            <Loading closePicture={this.closeLoadingPicture}/>
            </div>)
            :
            (<div className="container">
                <div className="row">
                    <div className="col-6">
                        <Logo />
                        <Input change={this.props.inputOnChange} inputVal={this.props.inputValue} value={this.props.newAddress}/>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <p style={{
                                fontSize: "70%", 
                                marginTop: '0', 
                                paddingTop: '0', 
                                fontFamily: "Montserrat", 
                                textAlign: "center"}}>Перетаскивайте точки для изменения маршрута</p>
                            <List names={this.props.locationName} delete={this.props.deleteListHandler}/>
                        </DragDropContext>
                    </div>
                    <div className="col-6">
                        {this.props.locationName.length > 0 ?
                            <Map 
                                location={this.props.locationName} 
                                start={this.props.starterPoint} 
                                destination={this.props.destinationPoint}
                                waypoints={this.props.waypoints}
                            />
                            :
                            <BlankMap 
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKI87rlfOa_uqQKw2gNuf62bDkz_nlyAs"
                            loadingElement={<div style={{ height: `400px` }} />}
                            containerElement={<div style={{ width: `100%` }} />}
                            mapElement={<div style={{ height: `90vh`, width: '100%' }} />}
                            center= {{ lat: 55.752121, lng: 37.617664 }}
                            />
                            }
                    </div>
                </div>
            </div>)
        );
    };
}

const mapStateToProps = (state) => {
    return {
        locationName: state.locationName,
        starterPoint: state.starterPoint,
        destinationPoint: state.destinationPoint,
        waypoints: state.waypoints,
        newAddress: state.newAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inputValue: (event) => dispatch(actions.inputValue(event)),
        deleteListHandler: (id) => dispatch(actions.deleteListHandler(id)),
        inputOnChange: (event) => dispatch(actions.inputOnChange(event)),
        changeStateDropHandler: (updArray) => dispatch(actions.changeStateDropHandler(updArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);