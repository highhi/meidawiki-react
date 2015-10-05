'use strict';

import React from 'react';
import { fetchItem } from '../actions/ItemsActions';

export default class SearchForm extends React.Component {

    hundleSubmit( e ) {
        e.preventDefault();
        let keyword = React.findDOMNode( this.refs.keyword ).value.trim();
        fetchItem( keyword );
    }

    render(){
        return(
            <div className="SearchForm">
                <form onSubmit={ this.hundleSubmit.bind( this ) }>
                    <input type="text" className="SearchForm__input" defaultValue="wikipedia" placeholder="Search wiki" ref="keyword" />
                    <button type="submit" className="SearchForm__button"><i className="fa fa-search"></i></button>
                </form>
            </div>
        );
    }
}