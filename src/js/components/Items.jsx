'use strict';

import React        from 'react';
import Loader       from '../components/Loader.jsx';
import ItemsStore   from '../stores/ItemsStore';
import ArticleStore from '../stores/ArticleStore';
import { Link } from 'react-router';

export default class Items extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            items : ItemsStore.getData()
        }
    }

    componentDidMount() {
        ItemsStore.addChangeListener( this._onChange.bind( this ) );
    }

    componentWillUnmount() {
        this.ignoreLastFetch = true;
        ItemsStore.removeChangeListener( this._onChange.bind( this ) );
    }

    _onChange() {
        if ( !this.ignoreLastFetch ) {
            this.setState({ items : ItemsStore.getData() });
        }
    }

    render() {
        let items = this.state.items.map( ( item, index ) =>{
            let encodedTitle = encodeURIComponent( item.title );
            return(
                <section className="Wiki__item" key={ index }><Link to={ '/' + item.title } >
                    <h2 className="Wiki__title">{ item.title }</h2>
                    <p className="Wiki__desc" dangerouslySetInnerHTML={{ __html : item.snippet }} />
                </Link></section>
            );
        });
        return (
            <div className="Wiki">
                { items }
            </div>
        );
    }
}