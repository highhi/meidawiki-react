'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { Request, ActionTypes } from '../constants/AppConstants';
import { fetch } from '../util';

export default {
    fetchItem( keyword ){
        let url = Request.ITEMS + encodeURIComponent( keyword );
        fetch( url ).then( res => {
            let json = typeof res === 'string' ? JSON.parse( res ) : res;
            let wiki = json.query.search;
            AppDispatcher.dispatch({
                type : ActionTypes.SEARCH,
                data : wiki
            });
            console.log( '[Dispathc] :', ActionTypes.SEARCH, wiki );
        }, err => {
            console.log( err );
        });
    }
}