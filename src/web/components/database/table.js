import React, { Component } from 'react';
import { Row, Col, Table, Tab, Nav, Button } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('../../../config.json');
const apiAddress = config.api.address;

export default class PageDatabaseTable extends Component {  
  constructor() {
    super();
    this.state = {
      eventData: [], 
      dungeons: [], 
      quests: [],
      challenges: [],
    };
  }

  componentDidMount(){
    axios.get(apiAddress+'event')
      .then((response) => {
        this.setState({ eventData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    
    axios.get(apiAddress+'dungeons')
      .then((response) => {
        this.setState({ dungeons: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(apiAddress+'quests')
      .then((response) => {
        this.setState({ quests: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(apiAddress+'challenges')
      .then((response) => {
        this.setState({ challenges: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  };

render() {
  return (
  <Tab.Container id='left-tabs-example' defaultActiveKey='event'>
    <Row>
      <Col sm={2} className='border-right'>
        <Nav variant='pills' className='flex-column'>
          <Nav.Item>
              <Nav.Link eventKey='event' onClick={() => this.reloadData("event")}>Event</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey='challenges' onClick={() => this.reloadData("challenges")}>Challenges</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey='dungeons' onClick={() => this.reloadData("dungeons")}>Dungeons</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey='quests' onClick={() => this.reloadData("quests")}>Quests</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey='system'>System</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={10}>
        <Tab.Content>
          <Tab.Pane eventKey='event'>
            <h4>Event Data</h4>
            <span>
                <small><a href='/db/event/edit/'>Edit current event data</a></small>
            </span>                                
            <hr />                                
            <Table borderless>                                    
              {this.state.eventData.map((eventData, index) =>
                <tbody key={"event-data-table-"+index}>
                  <tr key={"event-data-name-"+index}>
                    <td key={"event-data-name-label-"+index}>Name</td>
                    <td key={"event-data-name-value-"+index}>{eventData.name}</td>
                  </tr>
                  <tr key={"event-data-duration-"+index}>
                    <td key={"event-data-duration-label-"+index}>Event Duration</td>
                    <td key={"event-data-duration-value-"+index}>{eventData.duration}</td>
                  </tr>
                  <tr key={"event-data-redeem"+index}>
                    <td key={"event-data-redeem-label-"+index}>Redeem Period</td>
                    <td key={"event-data-redeem-value"+index}>{eventData.redeem}</td>
                  </tr>
                  <tr key={"event-data-event_page-"+index}>
                    <td key={"event-data-event_page-label-"+index}>Event Page</td>
                    <td key={"event-data-event_page-value-"+index}><a href={eventData.event_page}>{eventData.event_page}</a></td>
                  </tr>
                  <tr key={"event-data-last_event-"+index}>
                    <td key={"event-data-last_event-label-"+index}>Last Event</td>
                    <td key={"event-data-last_event-value-"+index}>{eventData.last_event}</td>
                  </tr>
                  <tr key={"event-data-last_event_redeem-"+index}>
                    <td key={"event-data-last_event_redeem-label-"+index}>Last Event Redeem Period</td>
                    <td key={"event-data-last_event_redeem-value-"+index}>{eventData.last_event_redeem}</td>
                  </tr>
                  <tr key={"event-data-todo-"+index}>
                    <td key={"event-data-todo-label"+index}>To-Do List</td>
                    <td key={"event-data-todo-value"+index}>
                      <ul className="list-unstyled" key={"event-data-todo-list-"+index}>
                        {eventData.todo.map((todoList, index) =>
                          <li key={"event-data-todo-list-content-"+index}>{todoList}</li>                                             
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr key={"event-data-dailyrewards-"+index}>
                    <td key={"event-data-dailyrewards-label"+index}>Daily Rewards</td>
                    <td key={"event-data-dailyrewards-value"+index}>
                        <ul className="list-unstyled" key={"event-data-dailyrewards-list-"+index}>
                          {eventData.rewards.daily.map((dailyRewards, index) =>
                            <li key={"event-data-dailyrewards-content-"+index}>{dailyRewards.name} ({dailyRewards.tier} Completions)</li>                                             
                            )}
                        </ul>
                    </td>  
                  </tr>
                  <tr key={"event-data-weeklyrewards-"+index}>
                    <td key={"event-data-weeklyrewards-label-"+index}>Weekly Rewards</td>
                    <td key={"event-data-weeklyrewards-value-"+index}>
                        <ul className="list-unstyled" key={"event-data-weeklyrewards-list-"+index} >
                          {eventData.rewards.weekly.map((weeklyRewards, index) =>
                            <li key={"event-data-weeklyrewards-list-content-"+index}>{weeklyRewards.name} ({weeklyRewards.tier} Completions)</li>                                             
                          )}
                        </ul>
                    </td>  
                  </tr>
                  <tr key={"event-data-quests-"+index}>
                    <td key={"event-data-quests-label"+index}>Quests List</td>
                    <td key={"event-data-quests-value-"+index}>
                      <ul className="list-unstyled" key={"event-data-quests-list-"+index}>
                          {eventData.quests.map((questsList, index) =>
                            <li key={"event-data-quests-list-content-"+index}>{questsList.name} - {questsList.location} ({questsList.day.join(", ")})</li>    
                          )}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              )}                                    
            </Table>
          </Tab.Pane>
          <Tab.Pane eventKey='dungeons'>
            <h4>Dungeons Data</h4>
            <span>
              <small><a href='/db/dungeon/new/'>Add new dungeon</a></small>
            </span>
            <hr />                                
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Weapon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dungeons.map((dgData, index) => 
                  <tr key={"/db-dungeon-data-"+index}>
                    <td key={"/db-dungeon-data-id-"+index}>{dgData.id}</td>
                    <td key={"/db-dungeon-data-name-"+index}>{dgData.name}</td>
                    <td key={"/db-dungeon-data-type-"+index}>{(dgData.type === 0)? "Not Specified": (dgData.type === 12)? "Raid" : (dgData.type === 6)? "Dungeon" : "Solo"}</td>
                    <td key={"/db-dungeon-data-weapon-"+index}>{dgData.weapon === ""? "Not Specified": dgData.weapon}</td>
                    <td key={"/db-dungeon-data-actions-"+index}>
                      <Button className="sm" variant="outline-primary" href={"/db/dungeon/edit/"+dgData.id} key={"/db-dungeon-edit-"+index}>Edit</Button> 
                      <Button className="sm" variant="outline-danger" href={"/db/dungeon/remove/"+dgData.id} key={"/db-dungeon-delete-"+index}>Delete</Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab.Pane>
          <Tab.Pane eventKey='quests'>
            <h4>Quests Data</h4>
            <span>
              <small><a href='/db/quest/new/'>Add new quest</a></small>
            </span>
            <hr />
            <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>                    
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.quests.map((questData, index) => 
                      <tr key={"/db-quests-data-"+index}>
                        <td key={"/db-quests-data-id-"+index}>{questData.id}</td>
                        <td key={"/db-quests-data-name-"+index}>{questData.name}</td>
                        <td key={"/db-quests-data-type-"+index}>{(questData.type === 0)?"Daily": (questData.type === 1)? "Weekly" : "Dynamic"}</td>
                        <td key={"/db-quests-data-location-"+index}>
                          <ul key={"/db-quests-data-location-list-"+index} className="list-unstyled">
                            {questData.location.map((location, index) =>
                              <li key={"/db-quests-data-location-list-items-"+index}>{location}</li>
                            )}
                          </ul>
                        </td>
                        <td key={"/db-quests-data-actions-"+index}>
                          <Button className="sm" variant="outline-primary" href={"/db/quest/edit/"+questData.id} key={"/db-quests-edit-"+index}>Edit</Button> 
                          <Button className="sm" variant="outline-danger" href={"/db/quest/remove/"+questData.id} key={"/db-quests-delete-"+index}>Delete</Button>
                        </td>
                      </tr>
                  )}
                </tbody>
            </Table>                                
          </Tab.Pane>
          <Tab.Pane eventKey='challenges'>
            <h4>Challenges Data</h4>
            <hr />             
              <Table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Rewards</td>
                    <td>Quests</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.challenges.map((challengesData, index) =>
                    <tr key={"/db-challenges-data-"+index}>
                      <td key={"/db-challenges-data-name-"+index}>{challengesData.name}</td>
                      <td key={"/db-challenges-data-rewards-"+index}>
                        <ul key={"/db-challenges-data-rewards-list-"+index} className="list-unstyled">
                          {challengesData.rewards.map((rewardsData, index) =>
                            <li key={"/db-challenges-data-rewards-list-item-"+index}>{rewardsData.name+" ("+rewardsData.tier+" Completion)"}</li>
                          )}
                        </ul>  
                      </td>
                      <td key={"/db-challenges-data-quests-"+index}>
                        <ul key={"/db-challenges-data-quests-list-"+index} className="list-unstyled">
                          {challengesData.quests.map((questsData, index) =>
                            <li key={"/db-challenges-data-quest-list-item"+index}>{questsData.name+" - "+questsData.location}</li>
                          )}
                        </ul>  
                      </td>
                      <td key={"/db-challenges-data-actions-"+index}>
                        <Button className="sm" variant="outline-primary" href={"/db/challenges/edit/"+challengesData.id} key={"/db-challenges-edit-"+index}>Edit</Button> 
                      </td>
                    </tr>
                  )} 
                </tbody>
              </Table>
            
          </Tab.Pane>
          <Tab.Pane eventKey='system'>
            <h4>Bot System Settings Data</h4>
                             
            <hr /> 
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>        
  )}

  reloadData(data){
    switch(data){
      case 'event':
        axios.get(apiAddress+'event')
          .then((response) => {
            this.setState({ eventData: response.data });
          })
          .catch(function (error) {
            console.log(error);
          });
      break;
      case 'dungeons':
        axios.get(apiAddress+'dungeons')
          .then((response) => {
            this.setState({ dungeons: response.data });
          })
          .catch(function (error) {
            console.log(error);
          });
      break;
      case 'quests':
        axios.get(apiAddress+'quests')
          .then((response) => {
            this.setState({ quests: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      break;
      case 'challenges':
        axios.get(apiAddress+'challenges')
          .then((response) => {
            this.setState({ challenges: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      break;
      default:
          console.log("Nothing selected.");
      break;
    }
  }
}
