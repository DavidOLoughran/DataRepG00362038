import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class FighterInfo extends React.Component {
    //Constructor for variables and functions / the delete function
    constructor() {
        super();
        this.DeleteFighter = this.DeleteFighter.bind(this);
    }

    DeleteFighter(e) {
        //Stops method being called everytime page loads
        e.preventDefault();
        axios.delete('http://localhost:4000/api/fighters/'+this.props.fighter._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    //Renders the webpage/html
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.fighter.Name}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.fighter.Poster} width="200" height="250"></img>
                            <h5>Age: 
                                {this.props.fighter.Age}
                            </h5>
                        </blockquote>
                        <Button variant="danger" onClick={this.DeleteFighter}>Delete</Button>
                        <Link to={'/edit/'+this.props.fighter._id} 
                        className="btn btn-primary">Edit</Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}