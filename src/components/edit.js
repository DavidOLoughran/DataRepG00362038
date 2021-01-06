import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {
    //Constructor for all variables
    constructor() {
        super();
        //Declaring functions
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
    //When app starts pull ID out of the URL
    componentDidMount(){
        console.log("load "+this.props.match.params.id);

        axios.get('http://localhost:4000/api/fighters/'+this.props.match.params.id)
        .then((response)=>{
            this.setState({
                Name:response.data.Name,
                Age:response.data.Age,
                Poster:response.data.Poster,
                _id:response.data._id
            })
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    //Sets  fighters new name
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    //Sets fighters new age
    onChangeAge(e) {
        this.setState({
            Age: e.target.value
        });
    }

    //Sets new image to be displayed for the fighter
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }

    //Changes the fighters name
    onSubmit(e) {
        //Stops method being called everytime page loads
        e.preventDefault();
        alert("Movie: " + this.state.Name + " "
            + this.state.Age + " " +
            this.state.Poster);

            const newFighter ={
                Title:this.state.Name,
                Age:this.state.Age,
                Poster:this.state.Poster
            };

        // axios.post('http://localhost:4000/api/movies', newMovie)
        // .then(response => console.log(response.data))
        // .catch(error => console.log(error));    
            axios.put('http://localhost:4000/api/fighters/'+this.state._id, newFighter)
            .then((xyz)=>{
                console.log(xyz);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    // Renders the webpage/html for edit
    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Change Fighter Name: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Name}
                            onChange={this.onChangeName}></input>
                    </div>
                    <div className="form-group">
                        <label>Change Fighter Age: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Age}
                            onChange={this.onChangeAge}></input>
                    </div>
                    <div className='form-group'>
                        <label>Enter URL of Fighters new Image: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>
                        </textarea>
                    </div>


                    <div className="form-group">
                        <input type='submit'
                            value='Edit Fighter'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}