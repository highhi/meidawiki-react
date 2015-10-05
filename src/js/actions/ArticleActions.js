'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { Request, ActionTypes } from '../constants/AppConstants';
import { fetch } from '../util';

export default {
	fetchArticle( keyword ){
		let url = Request.ARTICLE + encodeURIComponent( keyword ) + '&rvprop=content&rvparse';
		fetch( url ).then( res => {
			let json = typeof res === 'string' ? JSON.parse( res ) : res;
			let keys = Object.keys( json.query.pages );
			let wiki = json.query.pages[keys[0]];
			AppDispatcher.dispatch({
				type : ActionTypes.SHOW_ARTICLE,
				data : wiki
			});
			console.log( '[Dispathc] :', ActionTypes.SHOW_ARTICLE, wiki );
				}, err => {
			console.log( err );
		});
	}
}