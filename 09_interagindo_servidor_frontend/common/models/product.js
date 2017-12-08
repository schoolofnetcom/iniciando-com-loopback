'use strict';

module.exports = function(Product) {
    // Custom Methods
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

    Product.byTotal = function(cb){
        // Product.destroyById(id, cb)
        // Product.updateAll({}, {}, cb)
        // Product.create({}, cb)
        // Product.find({}, cb)
        // Product.findById(id, cb)
        Product.find({}, function(err, data) {
            if(err) cb(err)
            if(!data) cb(null, {})
    
            const getQtd = function(product){
                return product.qtd
            }
            
            const sumQtd = function(qtdPrev, qtdNext){
                return qtdPrev + qtdNext
            }
    
            let total = data.map(getQtd).reduce(sumQtd);
    
            cb(null, {total})
        })
    }
    Product.remoteMethod('byTotal', {
        returns: {
            arg: 'response',
            type: 'object'
        },
        http: {
            path: '/total', //GET http://localhost:3000/api/products/total
            verb: 'get'
        }
    })

    // Hooks
    Product.beforeRemote('byTotal', function(context, product, next){
        console.log('Teminal -> Before remote hook applied')

        next()
    })
    Product.afterRemote('byTotal', function(context, product, next){
        console.log('Teminal -> After remote hook applied')

        next()
    })

    // Hooks action model
    Product.observe('before save', function(ctx, next){
        console.log('Before saving...', ctx.instance)

        next()
    })
};
