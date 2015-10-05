'use strict';

import React        from 'react';
import Loader       from '../components/Loader.jsx';
import ArticleStore from '../stores/ArticleStore';
import { fetchArticle } from '../actions/ArticleActions';

export default class Article extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            article : ArticleStore.getData()
        }
    }

    componentWillMount() {
        if ( this.isNewPage() ){
            fetchArticle( this.props.params.keyword );
        }
    }

    componentDidMount() {
        ArticleStore.addChangeListener( this._onChange.bind( this ) );
    }

    componentWillUnmount() {
        this.ignoreLastFetch = true;
        ArticleStore.removeChangeListener( this._onChange.bind( this ) );
    }

    _onChange() {
        if ( !this.ignoreLastFetch ) {
            this.setState({ article : ArticleStore.getData() });
        }
    }

    isNewPage() {
        return this.props.params.keyword !== this.state.article.title;
    }

    renderArticle() {
        return(
            <article className="Wiki__article">
                <h2 className="Wiki__title">{ this.state.article.title }</h2>
                <div className="Wiki__desc" dangerouslySetInnerHTML={{ __html : this.state.article.body }} />
            </article>
        );
    }

    render() {
        let components = this.isNewPage() ? <Loader /> : this.renderArticle();
        return(
            <div className="Wiki">
                { components }
            </div>
        );
    }
}