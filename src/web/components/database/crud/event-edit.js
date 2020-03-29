import React, { Component } from 'react';
import { InputGroup, Button, Form, Col, Row, FormControl } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../../config.json');
const apiAddress = config.api.address;

export default class CrudEventEdit extends Component {  
  constructor(props){
    super(props);
    this.onChangeName       = this.onChangeName.bind(this);
    this.onChangeDuration   = this.onChangeDuration.bind(this);
    this.onChangeRedeem     = this.onChangeRedeem.bind(this);
    this.onChangeURL        = this.onChangeURL.bind(this);
    this.onChangeTodo       = this.onChangeTodo.bind(this);

    this.onChangeItemDaily  = this.onChangeItemDaily.bind(this);
    this.onChangeTierDaily  = this.onChangeTierDaily.bind(this);

    this.onChangeItemWeekly = this.onChangeItemWeekly.bind(this);
    this.onChangeTierWeekly = this.onChangeTierWeekly.bind(this);

    this.onChangeQuest      = this.onChangeQuest.bind(this);
    this.onChangeLocation   = this.onChangeLocation.bind(this);
    this.onCheckedDay       = this.onCheckedDay.bind(this);
    this.isChecked          = this.isChecked.bind(this);

    this.onSubmit           = this.onSubmit.bind(this);

    this.state = {
      name: '',
      duration: '',
      redeem: '',
      url: '',
      lastEvent: '',
      lastEventRedeem: '',
      todo: [''],
      dailyRewards: [''], 
      weeklyRewards: [''],
      quests: [''],

      questsList: [],
      loaded: false,
    };
  }

  componentDidMount() {    
    axios.get(apiAddress+'event/')
      .then(response => {
        this.setState({
          name: response.data[0].name,
          duration: response.data[0].duration,
          redeem: response.data[0].redeem,
          url: response.data[0].event_page,
          lastEvent: response.data[0].name,
          lastEventRedeem: response.data[0].redeem,
          dailyRewards: response.data[0].rewards.daily, 
          weeklyRewards: response.data[0].rewards.weekly, 
          todo: response.data[0].todo,
          quests: response.data[0].quests,

          loaded: true,
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

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeRedeem(e) {
    this.setState({
      redeem: e.target.value
    });
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  onChangeTodo(data, index) {
    let nextData = this.state.todo;
    nextData[index] = data;
    this.setState({
      todo: nextData
    });
  }

  onChangeItemDaily(data, index){
    let nextData = this.state.dailyRewards;
    nextData[index].name = data;
    this.setState({
      dailyRewards: nextData
    });
  }

  onChangeItemWeekly(data, index){
    let nextData = this.state.weeklyRewards;
    nextData[index].name = data;
    this.setState({
      weeklyRewards: nextData
    });
  }

  onChangeTierDaily(data, index){
    let nextData = this.state.dailyRewards;
    nextData[index].tier = parseInt(data);
    this.setState({
      dailyRewards: nextData
    });
  }

  onChangeTierWeekly(data, index){
    let nextData = this.state.weeklyRewards;
    nextData[index].tier = parseInt(data);
    this.setState({
      weeklyRewards: nextData
    });
  }

  onChangeQuest(e, index) {
    let currentState = this.state.quests;
    currentState[index].quest = e.target.value;

    this.setState({
      quests: currentState
    });  
  }

  onChangeLocation(e, index) {
    let currentState = this.state.quests;
    currentState[index].location = e.target.value;

    this.setState({
      quests: currentState
    });  
  }

  onSelectQuest(data, index){
    let nextData = this.state.quests.slice();
    let selectedData = {
      day: this.state.quests[index].day,
      name: this.state.questsList[data].name, 
      location: this.state.questsList[data].location
    };
    nextData[index] = selectedData;
    this.setState({ quests: nextData });
  }

  isChecked(name, index) {
    let currentState = this.state.quests;
    const checkbox = currentState[index].day.some((c) => c === name);

    return checkbox;   
  }

  onCheckedDay(e, index){
    let checked = e.target.checked;
    let value = e.target.value;
    let found = false;
    let loc = 0;

    let currentState = this.state.quests;

    for(let i=0; i<currentState[index].day.length; i++){
      if(this.state.quests[index].day[i] === value){
        found = true;
        loc = i;
      }      
    }

    if(found && !checked){      
      let newData = this.state.quests[index].day;
      newData.splice(loc, 1);

      currentState[index].day = newData;

      this.setState({quests: currentState});
    }else if(!found && checked){
      currentState[index].day.push(value);

      this.setState({quests: currentState});
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let rewardsData = {
      daily: this.state.dailyRewards,
      weekly: this.state.weeklyRewards,
    };

    const obj = {
      id: 0,
      name: this.state.name,
      duration: this.state.duration,
      redeem: this.state.redeem,
      event_page: this.state.url,
      last_event: this.state.lastEvent,
      last_event_redeem: this.state.lastEventRedeem,
      todo: this.state.todo,
      rewards: rewardsData,
      quests: this.state.quests,
    };

    axios.patch(apiAddress+'event/', obj)
      .then(res => console.log(res.data));
  
    this.props.history.push('/db');
  }

  render(){
    return(
      this.state.loaded?
        <div className="App-editor-quest-wrapper mx-5">
          <h4>Edit Current Challange</h4>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <FormControl
                aria-label="event name"
                id="event-name"
                value={this.state.name}
                onChange = {this.onChangeName}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Duration</Form.Label>
              <FormControl
                aria-label="duration"
                id="duration"
                value={this.state.duration}
                onChange = {this.onChangeDuration}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Redeem</Form.Label>
              <FormControl
                aria-label="redeem"
                id="redeem"
                value={this.state.redeem}
                onChange = {this.onChangeRedeem}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Event Page</Form.Label>
              <FormControl
                aria-label="event url"
                id="event-url"
                value={this.state.url}
                onChange = {this.onChangeURL}
              />
            </Form.Group>
          </Form.Row>

          <hr />
          <label>To-Do List</label>
          <Row>
            <Col>
              <Form.Label>Activity Name</Form.Label>
              {this.state.todo.map((data, index) =>
                <FormControl
                  aria-label="daily rewards item"
                  id="daily-rewards-item"
                  value={data}
                  onChange = {e => this.onChangeTodo(e.target.value, index)}
                  className = "mb-3"
                  key = {'event-edit-daily-todo-item-'+index}
                />
              )}
            </Col>
            <Col>
              <Form.Label>Actions</Form.Label>
              {this.state.todo.map((input, index) =>
                <InputGroup.Append className="mb-3" key = {'event-edit-todo-action-'+index}>
                  <Button variant="success" key = {'event-edit-daily-todo-action-add-'+index} onClick={ () => this.addTodo() }>Add</Button>
                  <Button variant="danger" key = {'event-edit-daily-todo-action-remove-'+index} onClick={ () => this.removeTodo(index) }>Remove</Button>
                </InputGroup.Append>
              )}
            </Col>
          </Row>
        
          <hr />
          <label>Rewards Daily</label>
          <Row>
            <Col>
              <Form.Label>Item Name</Form.Label>
              {this.state.dailyRewards.map((input, index) =>
                <FormControl
                  aria-label="daily rewards item"
                  id="daily-rewards-item"
                  value={this.state.dailyRewards[index].name}
                  onChange = {e => this.onChangeItemDaily(e.target.value, index)}
                  className = "mb-3"
                  key = {'event-edit-daily-rewards-item-'+index}
                />
              )}
            </Col>
            <Col>
              <Form.Label>Completion Requirement</Form.Label>
              {this.state.dailyRewards.map((input, index) =>
                <FormControl
                  aria-label="rewards tier"
                  id="daily-rewards-tier"
                  value={this.state.dailyRewards[index].tier}
                  onChange = {e => this.onChangeTierDaily(e.target.value, index)}
                  className = "mb-3"
                  key = {'event-edit-daily-rewards-tier-'+index}
                />
              )}
            </Col>
            <Col>
              <Form.Label>Actions</Form.Label>
              {this.state.dailyRewards.map((input, index) =>
                <InputGroup.Append className="mb-3" key = {'event-edit-daily-reward-action-'+index}>
                  <Button variant="success" key = {'event-edit-daily-reward-action-add-'+index} onClick={ () => this.addRewardDaily() }>Add</Button>
                  <Button variant="danger" key = {'event-edit-daily-reward-action-remove-'+index} onClick={ () => this.removeRewardDaily(index) }>Remove</Button>
                </InputGroup.Append>
              )}
            </Col>
          </Row>

          <hr />
          <label>Rewards Weekly</label>
          <Row>
            <Col>
              <Form.Label>Item Name</Form.Label>
              {this.state.weeklyRewards.map((input, index) =>
                <FormControl
                  aria-label="weekly rewards item"
                  id="weekly-rewards-item"
                  value={this.state.weeklyRewards[index].name}
                  onChange = {e => this.onChangeItemWeekly(e.target.value, index)}
                  className = "mb-3"
                  key = {'event-edit-weekly-rewards-item-'+index}
                />
              )}
            </Col>
            <Col>
              <Form.Label>Completion Requirement</Form.Label>
              {this.state.weeklyRewards.map((data, index) =>
                <FormControl
                  aria-label="weekly rewards tier"
                  id="weekly-rewards-tier"
                  value={data}
                  onChange = {e => this.onChangeTierWeekly(e.target.value, index)}
                  className = "mb-3"
                  key = {'event-edit-weekly-rewards-tier-'+index}
                />
              )}
            </Col>
            <Col>
              <Form.Label>Actions</Form.Label>
              {this.state.weeklyRewards.map((input, index) =>
                <InputGroup.Append className="mb-3" key = {'event-edit-weekly-reward-action-'+index}>
                  <Button variant="success" key = {'event-edit-weekly-reward-action-add-'+index} onClick={ () => this.addRewardWeekly() }>Add</Button>
                  <Button variant="danger" key = {'event-edit-weekly-reward-action-remove-'+index} onClick={ () => this.removeRewardWeekly(index) }>Remove</Button>
                </InputGroup.Append>
              )}
            </Col>
          </Row>

          <hr />
          <label>Quest</label>
          <Row>
            <Col>
              <Form.Label>Name</Form.Label>     
            </Col>
            <Col>
              <Form.Label>Location</Form.Label>
            </Col>
            <Col>
              <Form.Label>Quest List</Form.Label>
            </Col>
            <Col>
              <Form.Label>Action</Form.Label>
            </Col>
          </Row>  
          {this.state.quests.map((input, index) => 
            <div key = {'event-edit-quest-'+index}>
              <Row>
                <Col>
                  <FormControl
                    aria-label="quest name"
                    id={'event-quest-'+index}
                    value={this.state.quests[index].name}
                    onChange = {this.onChangeQuest}
                    className = "mb-3"
                    key = {'event-edit-quest-name-'+index}
                  />                  
                </Col>
                <Col>
                  <FormControl
                    aria-label="quest location"
                    id={'event-quest-location'+index}
                    value={this.state.quests[index].location}
                    onChange = {this.onChangeQuest}
                    className = "mb-3"
                    key = {'event-edit-quest-location-'+index}
                  />
                </Col>
                <Col>
                  <FormControl as="select" onChange={e => this.onSelectQuest(e.target.value, index)} className = "mb-3" key = {'challenges-edit-quest-list-'+index}>
                    <option>Select Quest</option>
                    {this.state.questsList.map((questData, index) =>
                      <option value={index} key={'event-quests-list-'+index+'-'+input}>{questData.name}</option>
                    )}
                  </FormControl>
                </Col>
                <Col>
                  <InputGroup.Append className="mb-3" key = {'event-edit-quest-action-'+index}>
                    <Button variant="success" key = {'event-edit-quest-action-add-'+index} onClick={ () => this.addQuest() }>Add</Button>
                    <Button variant="danger" key = {'event-edit-quest-action-remove-'+index} onClick={ () => this.removeQuest(index) }>Remove</Button>
                  </InputGroup.Append>
                </Col>
              </Row>
              <Form.Check key={'event-edit-quest-day-monday-'+index} type="checkbox" inline value="Monday" label="Monday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Monday', index)}/>
              <Form.Check key={'event-edit-quest-day-tuesday-'+index} type="checkbox" inline value="Tuesday" label="Tuesday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Tuesday', index)}/>
              <Form.Check key={'event-edit-quest-day-wednesday-'+index} type="checkbox" inline value="Wednesday" label="Wednesday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Wednesday', index)}/>
              <Form.Check key={'event-edit-quest-day-thursday-'+index} type="checkbox" inline value="Thursday" label="Thursday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Thursday', index)}/>
              <Form.Check key={'event-edit-quest-day-friady-'+index} type="checkbox" inline value="Friday" label="Friday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Friday', index)}/>
              <Form.Check key={'event-edit-quest-day-saturday-'+index} type="checkbox" inline value="Saturday" label="Saturday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Saturday', index)}/>
              <Form.Check key={'event-edit-quest-day-sunday-'+index} type="checkbox" inline value="Sunday" label="Sunday" className = "mb-3" onChange = {(e) => this.onCheckedDay(e, index)} checked={this.isChecked('Sunday', index)}/>
            </div>
          )}
          <hr />
          <Button className="float-right" variant="primary" type="submit" onClick={this.onSubmit}>Update</Button>
        </div>
        : 'Loading Data...'
    );
  }

  addQuest() {
    let newEmptyData = {
      name: '',
      location: '',
      day: []
    };
    this.setState(prevState => ({ quests: prevState.quests.concat([newEmptyData]) }));
  }

  addTodo() {
    let newInput = '';
    this.setState(prevState => ({ todo: prevState.todo.concat([newInput]) }));
  }

  addRewardDaily() {
    let newEmptyData = {
      name: '',
      tier: ''
    };
    this.setState(prevState => ({ dailyRewards: prevState.dailyRewards.concat([newEmptyData]) }));
  }

  addRewardWeekly() {
    let newEmptyData = {
      name: '',
      tier: ''
    };
    this.setState(prevState => ({ weeklyRewards: prevState.weeklyRewards.concat([newEmptyData]) }));
  }

  removeQuest(idx){
    if(this.state.quests.length > 1){
      let newData = this.state.quests;
      newData.splice(idx, 1);

      this.setState({ quests: newData });
    }    
  }

  removeTodo(idx){
    if(this.state.todo.length > 1){
      let newData = this.state.todo;
      newData.splice(idx, 1);

      this.setState({ todo: newData });
    }    
  }

  removeRewardDaily(idx){
    if(this.state.dailyRewards.length > 1){
      let newData = this.state.dailyRewards;
      newData.splice(idx, 1);

      this.setState({ dailyRewards: newData });
    }    
  }

  removeRewardWeekly(idx){
    if(this.state.weeklyRewards.length > 1){
      let newData = this.state.weeklyRewards;
      newData.splice(idx, 1);

      this.setState({ weeklyRewards: newData });
    }    
  }
}