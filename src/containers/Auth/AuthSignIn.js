import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import InputAuth from '../../components/Input/InputAuth';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';


class AuthSignIn extends Component {

    state = {
        controls: {
            email: {
                value: "",
                placeholder: "Mail Address",
                type: "text"
            },
            password: {
                value: "",
                placeholder: "Password",
                type: "password"
            }
        }
    };

    inputChangedHandler = (event, controlName) => {
        const newControls = {
                ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value
                } 
            };

        this.setState({controls: newControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthSignIn(
                    this.state.controls.email.value, 
                    this.state.controls.password.value
                    );
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => {
            return (
               <InputAuth 
                    key={formElement.id}
                    value={formElement.config.value}
                    placeholder={formElement.config.placeholder}
                    type={formElement.config.type}
                    change={(event) => this.inputChangedHandler(event, formElement.id)} 
                />
            )
        });
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to='/' />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button>Submit</button>
                </form>
            </div>
        )

    }

};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        error: state.auth.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSignIn: (email, password, isSignUp) => dispatch(actions.authSignIn(email, password)),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignIn);