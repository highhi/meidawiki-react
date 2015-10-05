'use strict';

const AppConstants = {
	DEFAULT_KEYWORD : 'Wikipedia',
	WIKI_PATH : 'https://ja.wikipedia.org/wiki/',
	Request   : {
		ITEMS   : 'http://ja.wikipedia.org/w/api.php?format=json&action=query&list=search&rawcontinue=&srlimit=20&srsearch=',
		ARTICLE : 'http://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='
	},
	ActionTypes : {
		SEARCH       : 'SEARCH',
		SHOW_ARTICLE : 'SHOW_ARTICLE',
		SHOW_LOADER  : 'SHOW_LOADER',
		HIDE_LOADER  : 'HIDE_LOADER',
	}
}

export default AppConstants;