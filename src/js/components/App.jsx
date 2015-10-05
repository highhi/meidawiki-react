'use strict';

import React      from 'react';
import SearchForm from '../components/SearchForm.jsx';
import Loader     from '../components/Loader.jsx';
import { fetchItem } from '../actions/ItemsActions';

export default class App extends React.Component {
    
    hundleSubmit( e ) {
        e.preventDefault();
        let keyword = React.findDOMNode( this.refs.keyword ).value.trim();
        fetchItem( keyword );
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