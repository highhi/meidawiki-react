'use strict';

import request from 'superagent';
import reqJsonp from 'superagent-jsonp';

reqJsonp( request );

export default {
    fetch( url ){
        return new Promise( ( resolve, reject ) => {
            request.get( url ).jsonp().end( ( err, res ) => {
                if ( res ) {
                    resolve( res.body );
                } else {
                    reject( err );
                }
            });
        });
    }
}