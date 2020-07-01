import React, { Component } from 'react';
import { InputGroup, Button, Form, Col, Row, FormControl } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../../config.json');
const apiAddress = config.api.address;

export default class CrudChallengesEdit extends Component {  
  constructor(props){
    super(props);
    this.onChangeName     = this.onChangeName.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeTier     = this.onChangeTier.bind(this);
    this.onChangeQuest    = this.onChangeQuest.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit         = this.onSubmit.bind(this);

    this.state = {
      id: 0,
      name: '',
      rewards: [''],
      quests: [''],
      questsList: [],
    };
  }

  componentDidMount() {    
    let challengesId = this.props.location.pathname.replace(/(\/)(.*)(\/)/gi, '');
    axios.get(apiAddress+'challenges/'+challengesId)
      .then(response => {
        this.setState({
          id: response.data[0].id,
          name: response.data[0].name,
          rewards: response.data[0].rewards,
          quests: response.data[0].quests,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
 
    axios.get(apiAddress+'quests')
      .then((response) => {
        this.setState({ questsList: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeItemName(data, index){
    let nextData = this.state.rewards.slice();
    nextData[index].name = data;
    this.setState({
      rewards: nextData
    });
  }

  onChangeTier(data, index){
    let nextData = this.state.rewards.slice();
    nextData[index].tier = data;
    this.setState({
      rewards: nextData
    });
  }

  onChangeQuest(e, index) {
    let nextData = this.state.quests.slice();
    nextData[index].quest = e.target.value;
    this.setState({
      quests: nextData
    });  
  }

  onChangeLocation(e, index) {
    let nextData = this.state.quests.slice();
    nextData[index].location = e.target.value;
    this.setState({
      quests: nextData
    });  
  }

  onSelectQuest(data, index){
    let nextData = this.state.quests.slice();
    let selectedData = {name: this.state.questsList[data].name, location: this.state.questsList[data].location};
    nextData[index] = selectedData;
    this.setState({ quests: nextData });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      rewards: this.state.rewards,
      quests: this.state.quests,
      id: this.state.id,
    };

    axios.patch(apiAddress+'challenges/'+this.state.id, obj)
      .then(res => console.log(res.data));
  
    this.props.history.push('/db');
  }

  render(){
    return(
      <div className="App-editor-quest-wrapper mx-5">
        <h4>Edit Current Challange</h4>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <FormControl
              aria-label="challenges name"
              id="challenges name"
              value={this.state.name}
              onChange = {this.onChangeName}
            />
          </Form.Group>
        </Form.Row>
        
        <label>Rewards</label>
        <Row>
          <Col>
            <Form.Label>Item Name</Form.Label>
            {this.state.rewards.map((input, index) =>
              <FormControl
                aria-label="rewards item"
                id="rewards-item"
                value={this.state.rewards[index].name}
                onChange = {e => this.onChangeItemName(e.target.value, index)}
                className = "mb-3"
                key = {'challenges-edit-rewards-item-'+index}
              />
            )}
          </Col>
          <Col>
            <Form.Label>Completion Requirement</Form.Label>
            {this.state.rewards.map((input, index) =>
              <FormControl
                aria-label="rewards tier"
                id="rewards-tier"
                value={this.state.rewards[index].tier}
                onChange = {e => this.onChangeTier(e.target.value, index)}
                className = "mb-3"
                key = {'challenges-edit-rewards-tier-'+index}
              />
            )}
          </Col>
          <Col>
            <Form.Label>Actions</Form.Label>
            {this.state.rewards.map((input, index) =>
              <InputGroup.Append className="mb-3" key = {'challenges-edit-rewards-action-'+index}>
                <Button variant="success" key = {'challenges-edit-rewards-action-add-'+index} onClick={ () => this.addReward() }>Add</Button>
                <Button variant="danger" key = {'challenges-edit-rewards-action-remove-'+index} onClick={ () => this.removeReward(index) }>Remove</Button>
              </InputGroup.Append>
            )}
          </Col>
        </Row>       

        <label>Quest</label>
        <Row>
          <Col>
            <Form.Label>Name</Form.Label>
            {this.state.quests.map((input, index) =>
              <FormControl
                aria-label="quest name"
                id="rewards-item"
                value={this.state.quests[index].name}
                onChange = {this.onChangeQuest}
                className = "mb-3"
                key = {'challenges-edit-quest-name-'+index}
              />
            )}
          </Col>
          <Col>
            <Form.Label>Location</Form.Label>
            {this.state.quests.map((input, index) =>
              <FormControl
                aria-label="quest location"
                id="rewards-tier"
                value={this.state.quests[index].location}
                onChange = {this.onChangeQuest}
                className = "mb-3"
                key = {'challenges-edit-quest-location-'+index}
              />
            )}
          </Col>
          <Col>
            <Form.Label>Quest List</Form.Label>
            {this.state.quests.map((input, index) =>
              <FormControl as="select" onChange={e => this.onSelectQuest(e.target.value, index)} className = "mb-3" key = {'challenges-edit-quest-list-'+index}>
                <option>Select Quest</option>
                {this.state.questsList.map((questData, index) =>
                  <option value={index} key={'challenges-quests-list-'+index+'-'+input}>{questData.location.join(', ')} ({questData.name})</option>
                )}
              </FormControl>
            )}
          </Col>
          <Col>
            <Form.Label>Actions</Form.Label>
            {this.state.quests.map((input, index) =>
              <InputGroup.Append className="mb-3" key = {'challenges-edit-quest-action-'+index}>
                <Button variant="success" key = {'challenges-edit-quest-action-add-'+index} onClick={ () => this.addQuest() }>Add</Button>
                <Button variant="danger" key = {'challenges-edit-quest-action-remove-'+index} onClick={ () => this.removeQuest(index) }>Remove</Button>
              </InputGroup.Append>
            )}
          </Col>
        </Row>              

        <hr />
        <Button className="float-right" variant="primary" type="submit" onClick={this.onSubmit}>Update</Button> 
      </div>
    );
  }

  addReward() {
    let newEmptyData = {
      name: '',
      location: '',
    };
    this.setState(prevState => ({ rewards: prevState.rewards.concat([newEmptyData]) }));
  }

  removeReward(idx){
    if(this.state.rewards.length > 1){
      let newData = this.state.rewards;
      newData.splice(idx, 1);

      this.setState({ rewards: newData });
    }    
  }

  addQuest() {
    let newEmptyData = {
      name: '',
      location: '',
    };
    this.setState(prevState => ({ quests: prevState.quests.concat([newEmptyData]) }));
  }

  removeQuest(idx){
    if(this.state.quests.length > 1){
      let newData = this.state.quests;
      newData.splice(idx, 1);

      this.setState({ quests: newData });
    }    
  }
}