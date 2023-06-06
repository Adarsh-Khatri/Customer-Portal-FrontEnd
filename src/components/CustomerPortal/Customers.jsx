import React, { Component } from 'react';
import OptionsCB from './OptionsCB';
import { get } from './HttpService';
import queryString from 'query-string'
import { Link } from 'react-router-dom';

export default class Customers extends Component {

    state = {
        customersData: [],
        payments: ['Credit Card', 'Debit Card', 'Wallet'],
        genders: ['Male', 'Female'],
        cities: ['Delhi', 'Noida', 'Gurgao', 'Jaipur'],
    }

    async fetchData() {
        let queryParams = this.props.location.search;
        console.log(queryParams);
        let res;
        if (queryParams) {
            res = await get(`/customers${queryParams}`)
        } else {
            res = await get(`/customers`)
        }
        this.setState({ customersData: res.data });
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log('updating');
            this.fetchData()
        }
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({ pathname: url, search: searchStr })
    }

    makeSearchString = (options) => {
        let { gender, payment, city } = options;
        let searchStr = '';
        searchStr = this.addToQueryString(searchStr, 'gender', gender);
        searchStr = this.addToQueryString(searchStr, 'payment', payment);
        searchStr = this.addToQueryString(searchStr, 'city', city);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => {
        return ((paramValue ? str ? `${str}&${paramName}=${paramValue}` :
            `${paramName}=${paramValue}` : str))
    }

    handleOptionChange = (options) => {
        this.callURL(`/customers`, options)
    }

    handleSort = (field) => {
        let { customersData } = this.state;
        if (field === 'age') {
            console.log(field);
            customersData.sort((a, b) => a[field] - b[field])
        } else {
            console.log(field);
            customersData.sort((a, b) => a[field].localeCompare(b[field]))
        }
        this.setState({ customersData })
    }

    render() {
        let { customersData = [], payments, genders, cities } = this.state;

        let queryParams = queryString.parse(this.props.location.search);

        return (
            <div className="container  mt-3 mb-5">
                <div className="row">
                    <div className="col-sm-3">
                        <OptionsCB options={queryParams} payments={payments} genders={genders} cities={cities} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-sm-9 text-center">
                        <h1 className='fw-bold'>WELCOME TO THE CUSTOMERS PAGE</h1>
                        <div className="row bg-dark text-light">
                            <div className="col-sm-1 border" onClick={() => this.handleSort('id')}>ID</div>
                            <div className="col-sm-3 border" onClick={() => this.handleSort('name')}>Name</div>
                            <div className="col-sm-2 border" onClick={() => this.handleSort('city')}>City</div>
                            <div className="col-sm-1 border" onClick={() => this.handleSort('age')}>Age</div>
                            <div className="col-sm-1 border" onClick={() => this.handleSort('gender')}>Gender</div>
                            <div className="col-sm-2 border" onClick={() => this.handleSort('payment')}>Payment</div>
                            <div className="col-sm-1 border"></div>
                            <div className="col-sm-1 border"></div>
                        </div>
                        {
                            customersData.length === 0 ? <h3 className='fw-bold my-5'>NO DATA</h3> : (
                                customersData.map(customer =>
                                    <div className="row" key={customer.id}>
                                        <div className="col-sm-1 border">{customer.id}</div>
                                        <div className="col-sm-3 border">{customer.name}</div>
                                        <div className="col-sm-2 border">{customer.city}</div>
                                        <div className="col-sm-1 border">{customer.age}</div>
                                        <div className="col-sm-1 border">{customer.gender}</div>
                                        <div className="col-sm-2 border">{customer.payment}</div>
                                        <div className="col-sm-1 border"><Link className="btn btn-warning btn-sm" to={`/customers/${customer.id}/edit`}>Edit</Link></div>
                                        <div className="col-sm-1 border"><Link className="btn btn-danger btn-sm me-4" to={`/customers/${customer.id}/delete`}>Delete</Link></div>
                                    </div>
                                )
                            )

                        }
                    </div>
                </div>
            </div>
        )
    }
}
