import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import DeleteCustomer from './DeleteCustomer';

export default class MainComponent extends Component {

    render() {
        return (
            <>
                <div className="container">
                    <NavBar />
                    <Switch>

                        <Route path='/customers/add' component={AddCustomer} />

                        <Route path='/customers/:id/delete' component={DeleteCustomer} />

                        <Route path='/customers/:id/edit' component={AddCustomer} />

                        <Route path='/customers' component={Customers} />

                        <Redirect from="/" to='/customers' />

                    </Switch>

                </div>
            </>

        )
    }
}

