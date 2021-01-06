import React from 'react';
import { Fighters } from './fighters';
import axios from 'axios';

export class Read extends React.Component {

    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }


    state = {
        fighters: []
    };

    ReloadData(){
        axios.get('http://localhost:4000/api/fighters')
            .then((response) => {
                this.setState({ fighters: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/fighters')
            .then((response) => {
                this.setState({ fighters: response.data})
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div>
                <h1>UFC Fighters Database</h1>
                <Fighters fighters={this.state.fighters} ReloadData={this.ReloadData}></Fighters>
            </div>
        );
    }
}

