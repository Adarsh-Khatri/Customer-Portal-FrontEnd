import React, { Component } from 'react';
import { get, put, post } from './HttpService'

export default class AddCustomer extends Component {

    state = {
        customer: { id: '', name: '', city: '', age: '', gender: '', payment: '' },
        payments: ['Credit Card', 'Debit Card', 'Wallet'],
        genders: ['Male', 'Female'],
        cities: ['Delhi', 'Noida', 'Gurgao', 'Jaipur'],
        edit: false,
        demoId: 1
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData()
        }
    }

    async fetchData() {
        const { id } = this.props.match.params;
        if (id) {
            let { data } = await get(`/customers/${id}`)
            this.setState({ customer: data, edit: true })
        } else {
            let customer = { id: '', name: '', city: '', age: '', gender: '', payment: '' };
            this.setState({ customer: customer, edit: false })
        }

    }

    handleChange = ({ currentTarget: input }) => {
        let s1 = { ...this.state }
        s1.customer[input.name] = input.value;
        this.setState(s1)
    }

    async postData(url, obj) {
        let res = await post(url, obj);
        console.log(res);
        this.props.history.push('/customers')
    }

    async putData(url, obj) {
        let res = await put(url, obj);
        console.log(res);
        this.props.history.push('/customers')
    }

    handleSubmit = (e) => {
        let { customer, edit } = this.state;
        let s1 = this.state;
        e.preventDefault();
        if (customer.id === '') {
            s1.customer.id = 'DEMO-ID' + s1.demoId
            s1.demoId += 1;
            this.setState(s1)
        }
        edit ? this.putData(`/customers/${customer.id}`, customer) : this.postData('/customers', this.state.customer)
    }


    showRadios = (arr, label, name, selVal) => {
        return (
            <div className='form-group'>
                <label htmlFor="sections" className='form-label fw-bold bg-light' >{label}</label>
                {
                    arr.map((a1, index) =>
                        <div className='form-check' key={index}>
                            <input type="radio" id={`${name}${index}`} name={name} value={a1} checked={selVal === a1} onChange={this.handleChange} />
                            <label htmlFor={`${name}${index}`} className='form-check-label px-2'>{a1.charAt().toUpperCase() + a1.substring(1)}</label>
                        </div>
                    )
                }
            </div>
        )
    }

    render() {
        let { id = 'DEMO-ID', name, city, age, gender, payment } = this.state.customer;
        let { payments, genders, cities, edit } = this.state;
        return (
            <div className="container">
                <div className="form-group">
                    <label htmlFor='id'>ID</label>
                    <input type="text" className='form-control' id='id' name="id" placeholder='Enter Customer Id' value={id} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type="text" className='form-control' id='name' name="name" placeholder='Enter Customer Name' value={name} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='age'>Age</label>
                    <input type="text" className='form-control' id='age' name="age" placeholder='Enter Customer Age' value={age} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='city'>City</label>
                    <select className='form-select' id="city" name="city" value={city} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select City</option>
                        {
                            cities.map(city =>
                                <option value={city}>{city}</option>
                            )
                        }
                    </select>
                </div>
                <br />
                {this.showRadios(payments, 'Select Payment', 'payment', payment)}
                <br />
                {this.showRadios(genders, 'Select Gender', 'gender', gender)}
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
