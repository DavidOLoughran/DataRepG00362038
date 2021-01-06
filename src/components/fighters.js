import React from 'react';
import {FighterInfo} from './fighterInfo';

export class Fighters extends React.Component{

    render(){
        return this.props.fighters.map( (fighter)=>{
            return <FighterInfo fighter={fighter} ReloadData={this.props.ReloadData}></FighterInfo>
        })
    }
}