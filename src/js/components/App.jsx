'use strict';

import React, { PropTypes } from 'react';
import SearchForm from '../components/SearchForm.jsx';
import Loader     from '../components/Loader.jsx';
import { fetchItem } from '../actions/ItemsActions';

class App extends React.Component {
    constructor( props ) {
        super( props );
    }
    
    hundleSubmit( e ) {
        e.preventDefault();
        let keyword = React.findDOMNode( this.refs.keyword ).value.trim();
        fetchItem( keyword );

        if ( this.props.params.pathname !== '/' ) {
            this.props.history.pushState( null, '/' );
        }
    }

    render() {
        return(
            <div className="Wrapper">
                <header className="Header"><div className="Header__inner">
                    <h1 className="Header__log">Media Wiki <span className="Header__react">React</span></h1>
                    <div className="SearchForm">
                        <form onSubmit={ this.hundleSubmit.bind( this ) }>
                            <input type="text" className="SearchForm__input" defaultValue={ this.props.params.keyword || 'Wikipedia' } placeholder="Search wiki" ref="keyword" />
                            <button type="submit" className="SearchForm__button"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                </div></header>
                <div className="Container">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default App;