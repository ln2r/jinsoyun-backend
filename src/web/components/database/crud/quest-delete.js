import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../../config.json');
const apiAddress = config.api.address;

export default class CrudQuestDelete extends Component {  
  componentDidMount() {
    let questId = this.props.location.pathname.replace(/(\/)(.*)(\/)/gi, '');
      
    axios.delete(apiAddress+'quests/'+questId)
      .then(() => {
        this.props.history.push('/db');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render(){
    return (
      <p>Deleted a quest data.</p>
    );}
}