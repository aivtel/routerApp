import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';


class UserRoutes extends Component {

    componentDidMount () {
        this.props.onFetchRoutes(this.props.token, this.props.localId);
    }

    render () {
        console.log(this.props.routesDB);
        let routes = null;
        if (!this.props.loading) {
            routes = this.props.routesDB.map((el) => {
                    return el.locations.map((r, index) => <p key={el.userId+index}>{r}</p>)
            })
        }
        return (
            <div>
               {routes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        localId: state.auth.localId,
        routesDB: state.location.routesDB,
        loading: state.location.fetchLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRoutes: (token, localId) => dispatch(actions.fetchRoutes(token, localId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoutes);