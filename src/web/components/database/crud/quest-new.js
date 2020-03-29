import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../../config.json');
const apiAddress = config.api.address;

export default class PageEditorQuest extends Component {  
  constructor(props){
    super(props);
    this.onChangeQuestName      = this.onChangeQuestName.bind(this);
    this.onChangeQuestLocation  = this.onChangeQuestLocation.bind(this);
    this.onChangeQuestType      = this.onChangeQuestType.bind(this);
    this.onSubmit               = this.onSubmit.bind(this);

    this.state = {
      name: '',
      location: [''],
      type:'',
      id: 0,
      dungeonList: [],
      dungeonInput: ['dg-1']
    };
  }

  componentDidMount() {
    axios.get(apiAddress+'quests')
      .then(response => {
        this.setState({
          id: (response.data.length - 1)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      
    axios.get(apiAddress+'dungeons')
      .then((response) => {
        this.setState({ dungeonList: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeQuestName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeQuestLocation(e, index) {
    let nextLocationData = this.state.location.slice();
    console.log(nextLocationData);
    nextLocationData[index] = e.target.value;
    this.setState({
      location: nextLocationData
    });  
  }

  onSelectQuestLocation(name, index){
    let nextLocationData = this.state.location.slice();
    nextLocationData[index] = name;
    this.setState({ location: nextLocationData });
  }

  onChangeQuestType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      location: this.state.location,
      type: this.state.type,
      id: this.state.id,
    };

    axios.post(apiAddress+'quests/', obj)
      .then(res => console.log(res.data));
  
    this.props.history.push('/db');
  }

  render(){
    return(
      <div className="App-editor-quest-wrapper mx-5">
        <h4>Add New Quest</h4>
        <label>Quest Name</label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Quest Name"
            aria-label="quest name"
            id="quest-name"
            value={this.state.name}
            onChange = {this.onChangeQuestName}
          />
        </InputGroup>
        
        <label>Quest Type</label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type"
            aria-label="quest type"
            id="quest-type"
            value={this.state.type}
            onChange = {this.onChangeQuestType}
          />
          <select onChange={this.onChangeQuestType}>
            <option>Select Quest Type</option>
            <option value="0">Daily</option>
            <option value="1">Weekly</option>
            <option value="2">Dynamic Quest</option>
          </select>
        </InputGroup>

        <label>Quest Location</label>
        {this.state.dungeonInput.map((input, index) => 
          <span key={input}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Location"
                aria-label="quest location"
                id={'quest-location'+index}
                value={this.state.location[index]}
                onChange = {this.onChangeQuestLocation}
              />
                        
              <select onChange={e => this.onSelectQuestLocation(e.target.value, index)}>
                <option>Select Location</option>
                {this.state.dungeonList.map((dungeonData, index) =>
                  <option value={dungeonData.name} key={'dungeons-list-'+index+'-'+input}>{dungeonData.name}</option>
                )}
              </select>
              <InputGroup.Append className="ml-2">
                <Button variant="success" onClick={ () => this.appendInput() }>Add</Button>
                <Button variant="danger" onClick={ () => this.removeInput(index) }>Remove</Button>
              </InputGroup.Append>            
            </InputGroup> 
          </span>        
        )}
              

        <hr />
        <Button className="float-right" variant="primary" type="submit" onClick={this.onSubmit}>Add</Button> 
      </div>
    );
  }

  appendInput() {
    var newInput = `input-${this.state.dungeonInput.length}`;
    this.setState(prevState => ({ dungeonInput: prevState.dungeonInput.concat([newInput]) }));
  }

  removeInput(idx){
    if(this.state.dungeonInput.length > 1){
      let someArray = this.state.dungeonInput;
      someArray.splice(idx, 1);

      this.setState({ dungeonInput: someArray });
    }    
  }
}