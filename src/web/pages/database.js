import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import PageDatabaseTable from '../components/database/table';
import CrudChallengeEdit from '../components/database/crud/challenges-edit';
import CrudEventEdit from '../components/database/crud/event-edit';

import CrudQuestsNew from '../components/database/crud/quest-new';
import CrudQuestEdit from '../components/database/crud/quest-edit';
import CrudQuestDelete from '../components/database/crud/quest-delete';

import CrudDungeonNew from '../components/database/crud/dungeon-new';
import CrudDungeonEdit from '../components/database/crud/dungeon-edit';
import CrudDungeonDelete from '../components/database/crud/dungeon-delete';

export default class PageDatabase extends Component {  

  render() {
    return (
      <Router>
        <div className="App-database-wrapper m-5">
          <div className="App-database-header p-5">
            <h3>Database Configuration</h3>
            <em>Here you can modify or configure Jinsoyun&apos;s data.</em>
          </div>
          <hr />      
          <Switch>
            <Route exact path="/db" component={PageDatabaseTable} />
            <Route path="/db/challenges/edit" component={CrudChallengeEdit} />
            <Route path="/db/event/edit" component={CrudEventEdit} />

            <Route path="/db/quest/new" component={CrudQuestsNew} />
            <Route path="/db/quest/edit" component={CrudQuestEdit} />
            <Route path="/db/quest/remove" component={CrudQuestDelete} />

            <Route path="/db/dungeon/new" component={CrudDungeonNew} />
            <Route path="/db/dungeon/edit" component={CrudDungeonEdit} />
            <Route path="/db/dungeon/remove" component={CrudDungeonDelete} />        
          </Switch>
        </div>
      </Router>            
    );}
}
