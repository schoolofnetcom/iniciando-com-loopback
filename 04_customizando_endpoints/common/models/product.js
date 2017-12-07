'use strict';

module.exports = function(Product) {
    Product.customMethod = function(cb){
        cb(null, 'My first custom method');
    }

    Product.remoteMethod('customMethod', {
        returns: {
            arg: 'response',
            type: 'string'
        },
        http: {
            path: '/custom', //GET http://localhost:3000/api/products/custom
            verb: 'get'
        }
    })
};
