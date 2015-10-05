'use strict';

import React   from 'react';
import App     from './components/App.jsx';
import Items   from './components/Items.jsx';
import Article from './components/Article.jsx';
import { fetchItem } from './actions/ItemsActions';
import { Router, Route, IndexRoute } from 'react-router';

fetchItem( 'Wikipedia' );

React.render((
    <Router>
        <Route name="top" component={ App } path="/">
            <IndexRoute name="index" component={ Items } />
            <Route name="article" component={ Article } path="/:keyword" />
        </Route>
    </Router>
), document.getElementById('content') );