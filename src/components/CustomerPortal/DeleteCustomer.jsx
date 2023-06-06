import React, { Component } from 'react'
import { deleteApi } from './HttpService'

export default class DeleteCustomer extends Component {

    async componentDidMount() {
        console.log('delete');
        const { id } = this.props.match.params;
        await deleteApi(`/customers/${id}`)
        this.props.history.push('/customers');
    }
    render() { return '' }
}
