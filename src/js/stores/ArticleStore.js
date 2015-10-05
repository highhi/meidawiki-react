'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let data = {};

class ArticleStore extends EventEmitter {

    constructor() {
        super();
        this.setMaxListeners( 0 );
        this.dispatchToken = AppDispatcher.register( action => {
            switch ( action.type ) {
                case ActionTypes.SHOW_ARTICLE :
                    data.title   = action.data.title;
                    data.pageId  = action.data.pageid;
                    data.body    = action.data.revisions[0]['*'];
                    this.emitChange();
                    break;
                default : return;
            }
        });
    }

    emitChange() {
        this.emit( CHANGE_EVENT );
    }

    addChangeListener( callback ) {
        this.on( CHANGE_EVENT, callback );
    }

    removeChangeListener( callback ) {
        this.removeListener( CHANGE_EVENT, callback );
    }

    getData() {
        return data;
    }
}

export default new ArticleStore();