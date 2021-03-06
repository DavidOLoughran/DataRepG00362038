import React from 'react';
import axios from 'axios';

export class Create extends React.Component {
    //Constructor for all variables
    constructor() {
        super();
        //Declaing Functions
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        //Declaring state to hold variables
        this.state = {
            Name: '',
            Age: '',
            Poster: ''
        }
    }
    //Sets new fighters name
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    //Sets new fighters age
    onChangeAge(e) {
        this.setState({
            Age: e.target.value
        });
    }
    //Sets image to be displayed for new fighter
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }
    //Sends fighters info when button Add Fighter is clicked
    onSubmit(e) {
        e.preventDefault();
        alert("Fighter: " + this.state.Name + " "
            + this.state.Age + " " +
            this.state.Poster);

            const newFighter ={
                Name:this.state.Name,
                Age:this.state.Age,
                Poster:this.state.Poster
            };

        axios.post('http://localhost:4000/api/fighters', newFighter)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));    

    }
    //Renders the webpage/HTML for adding fighter
    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Fighters Name: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Name}
                            onChange={this.onChangeName}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Fighters Age: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Age}
                            onChange={this.onChangeAge}></input>
                    </div>
                    <div className='form-group'>
                        <label>Enter URL for Fighters Picture: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>
                        </textarea>
                    </div>


                    <div className="form-group">
                        <input type='submit'
                            value='Add Fighter'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}