import React, { Component } from 'react';
import { InputGroup, Button, Form, Col, FormControl } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../../config.json');
const apiAddress = config.api.address;

export default class CrudDungeonNew extends Component{
  constructor(props){
    super(props);
    this.onChangeName        = this.onChangeName.bind(this);
    this.onChangeType        = this.onChangeType.bind(this);
    this.onChangeRequirement = this.onChangeRequirement.bind(this);
    this.onChangeGuideAuthor = this.onChangeGuideAuthor.bind(this);
    this.onChangeGuideURL    = this.onChangeGuideURL.bind(this);
    this.onChangeAPEasy      = this.onChangeAPEasy.bind(this);
    this.onChangeAPNormal    = this.onChangeAPNormal.bind(this);
    this.onChangeAPHard      = this.onChangeAPHard.bind(this);
    this.onChangeWeapon      = this.onChangeWeapon.bind(this);
    this.onChangeReward      = this.onChangeReward.bind(this);

    this.onSubmit            = this.onSubmit.bind(this);

    this.state = {
      id: 0,
      name: '',
      type: 0,
      requirements: [''],
      guides: [{
        author: '',
        url: ''
      }],
      ap_easy: 0,
      ap_normal: 0,
      ap_hard: 0,
      weapon: '',
      rewards: [''],

      loaded: false,
    };
  }

  componentDidMount() {
    axios.get(apiAddress+'dungeons')
      .then(response => {
        this.setState({
          id: (response.data.length - 1)
        });
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

  onChangeType(e) {
    this.setState({
      type: parseInt(e.target.value)
    });
  }

  onChangeWeapon(e) {
    this.setState({
      weapon: e.target.value
    });
  }

  onChangeAPEasy(e){
    this.setState({
      ap_easy: parseInt(e.target.value)
    });
  }

  onChangeAPNormal(e){
    this.setState({
      ap_normal: parseInt(e.target.value)
    });
  }

  onChangeAPHard(e){
    this.setState({
      ap_hard: parseInt(e.target.value)
    });
  }

  onChangeGuideAuthor(data, index){
    let nextData = this.state.guides;
    nextData[index].author = data;

    this.setState({
      guides: nextData
    });
  }

  onChangeGuideURL(data, index){
    let nextData = this.state.guides;
    nextData[index].url = data;

    this.setState({
      guides: nextData
    });
  }

  onChangeRequirement(data, index){
    let nextData = this.state.requirements;
    nextData[index] = data;

    this.setState({
      requirements: nextData
    });
  }

  onChangeReward(data, index){
    let nextData = this.state.rewards;
    nextData[index] = data;

    this.setState({
      rewards: nextData
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let apData = {
      easy: this.state.ap_easy,
      normal: this.state.ap_normal,
      hard: this.state.ap_hard,
    };

    const obj = {
      id: this.state.id,
      name: this.state.name,
      type: this.state.type,
      requirements: this.state.requirements,
      guides: this.state.guides,
      attack_power: apData,
      weapon: this.state.weapon,
      rewards: this.state.rewards,
    };

    console.log(obj);

    axios.post(apiAddress+'dungeons/', obj)
      .then(res => console.log(res.data));
  
    this.props.history.push('/db');
  }

  render(){
    return(
      <div className="App-editor-dungeon-wrapper mx-5">
        <h4>Adding New Dungeon Data</h4>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <FormControl
              aria-label="dungeon name"
              id="dungeon-name"
              value={this.state.name}
              onChange = {this.onChangeName}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Instance Type</Form.Label>
            <FormControl
              aria-label="dungeon type"
              id="dungeon-type"
              value={this.state.type}
              onChange = {this.onChangeType}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Cross-Server Weapon</Form.Label>
            <FormControl
              aria-label="dungeon type"
              id="dungeon-type"
              value={this.state.weapon}
              onChange = {this.onChangeWeapon}
            />
          </Form.Group>
        </Form.Row>

        <Form.Label>Attack Power</Form.Label>
        <Form.Row>            
          <Form.Group as={Col}>    
            <Form.Label>Easy</Form.Label>          
            <FormControl
              aria-label="dungeon ap easy"
              id="dungeon-type-ap-easy"
              value={this.state.ap_easy}
              onChange = {this.onChangeAPEasy}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Normal</Form.Label>              
            <FormControl
              aria-label="dungeon ap normal"
              id="dungeon-type-ap-normal"
              value={this.state.ap_normal}
              onChange = {this.onChangeAPNormal}
            />
          </Form.Group>
          <Form.Group as={Col}>  
            <Form.Label>Hard</Form.Label>            
            <FormControl
              aria-label="dungeon ap hard"
              id="dungeon-type-ap-hard"
              value={this.state.ap_hard}
              onChange = {this.onChangeAPHard}
            />
          </Form.Group>
        </Form.Row>

        <Form.Label>Guides</Form.Label>                  
        <Form.Row>  
          <Form.Group as={Col}>
            <Form.Label>Author</Form.Label>
            {this.state.guides.map((data, index) =>               
              <FormControl
                aria-label="dungeon guide author"
                id={'dungeon-guide-author-'+index}
                value={data.author}
                onChange = {e => this.onChangeGuideAuthor(e.target.value, index)}
                className = "mb-2"
                key={'dungeon-guide-author-'+index}
              />        
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Guide Page</Form.Label>
            {this.state.guides.map((data, index) =>               
              <FormControl
                aria-label="dungeon guide url"
                id={'dungeon-guide-url-'+index}
                value={data.url}
                onChange = {e => this.onChangeGuideURL(e.target.value, index)}
                className = "mb-2"
                key={'dungeon-guide-url-'+index}
              />
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Actions</Form.Label>
            {this.state.guides.map((data, index) =>
              <InputGroup.Append className="mb-2" key = {'dungeon-guide-action-'+index}>
                <Button variant="outline-success" key = {'dungeon-guide-action-add-'+index} onClick={ () => this.addGuide() }>Add</Button>
                <Button variant="outline-danger" key = {'dungeon-guide-action-remove-'+index} onClick={ () => this.removeGuide(index) }>Remove</Button>
              </InputGroup.Append>
            )}
          </Form.Group>
        </Form.Row> 

        <Form.Row>
          <Form.Group as={Col}>                
            <Form.Label>Entry Requirements</Form.Label>
            {this.state.requirements.map((data, index) =>              
              <FormControl
                aria-label="dungeon req"
                id={'dungeon-req-'+index}
                value={data}
                onChange={e => this.onChangeRequirement(e.target.value, index)}
                className="mb-2"
                key={'dungeon-req-'+index}
              />              
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Actions</Form.Label>
            {this.state.requirements.map((data, index) =>
              <InputGroup.Append className="mb-2" key = {'dungeon-req-action-'+index}>
                <Button variant="outline-success" key = {'dungeon-req-action-add-'+index} onClick={ () => this.addRequirement() }>Add</Button>
                <Button variant="outline-danger" key = {'dungeon-req-action-remove-'+index} onClick={ () => this.removeRequirement(index) }>Remove</Button>
              </InputGroup.Append>
            )}
          </Form.Group>
        </Form.Row> 

        <Form.Label>Rewards</Form.Label>                  
        <Form.Row>  
          <Form.Group as={Col}>
            {this.state.rewards.map((data, index) =>               
              <FormControl
                aria-label="dungeon guide rewards"
                id={'dungeon-guide-rewards-'+index}
                value={data}
                onChange = {e => this.onChangeReward(e.target.value, index)}
                className = "mb-2"
                key={'dungeon-guide-rewards-'+index}
              />        
            )}
          </Form.Group>
          <Form.Group as={Col}>
            {this.state.rewards.map((data, index) =>
              <InputGroup.Append className="mb-2" key = {'dungeon-rewards-action-'+index}>
                <Button variant="outline-success" key = {'dungeon-rewards-action-add-'+index} onClick={ () => this.addReward() }>Add</Button>
                <Button variant="outline-danger" key = {'dungeon-rewards-action-remove-'+index} onClick={ () => this.removeReward(index) }>Remove</Button>
              </InputGroup.Append>
            )}
          </Form.Group>
        </Form.Row>

        <hr />
        <Button className="float-right mb-2" variant="outline-primary" type="submit" onClick={this.onSubmit}>Add</Button>      
      </div>
    );
  }

  addGuide(){
    let newEmptyData = {
      author: '',
      url: '',
    };

    this.setState(prevState => ({ guides: prevState.guides.concat([newEmptyData]) }));
  }

  removeGuide(index){
    if(this.state.guides.length > 1){
      let newData = this.state.guides;
      newData.splice(index, 1);

      this.setState({ guides: newData });
    }  
  }

  addRequirement(){
    let newEmptyData = '';

    this.setState(prevState => ({ requirements: prevState.requirements.concat([newEmptyData]) }));
  }

  removeRequirement(index){
    if(this.state.requirements.length > 1){
      let newData = this.state.requirements;
      newData.splice(index, 1);

      this.setState({ requirements: newData });
    }  
  }

  addReward(){
    let newEmptyData = '';

    this.setState(prevState => ({ rewards: prevState.rewards.concat([newEmptyData]) }));
  }

  removeReward(index){
    if(this.state.rewards.length > 1){
      let newData = this.state.rewards;
      newData.splice(index, 1);

      this.setState({ rewards: newData });
    }  
  }
}