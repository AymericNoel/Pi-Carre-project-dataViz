const express = require('express');
const router = express.Router();
const main = require('./main.js');
const authMiddleware = require('./middleware');


router.get('/allUsers', authMiddleware.adminAccess,(req, res) => { //page admin
    main.getTableData(req, res);
})

router.get('/users/:id', authMiddleware.allowAccess,(req, res, next) => { //accueil user
    if (!isNaN(req.params.id)) {
        main.getUser(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items);
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/somme', authMiddleware.allowAccess,(req,res,next)=>{//somme totale investi sur eth
    if (!isNaN(req.params.id)) {
        main.somme_achat_eth(req, res, req.params.id, next)
            .then(items => {
                if (items) { //return "sum"
                    res.json(items);
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/nbachat', authMiddleware.allowAccess,(req,res,next)=>{//nombre achat total sur eth
    if (!isNaN(req.params.id)) {
        main.nb_achat_eth(req, res, req.params.id, next)
            .then(items => {
                if (items) { //return "count"
                    res.json(items);
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})

router.get('/users/:id/somme', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.somme(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "sum"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})

router.get('/users/:id/sommeavg', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.sommeavg(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "avg"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/sommeavg2', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.sommeavg2(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "avg"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/somme2', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.somme2(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "count"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/buydate', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.buyByDate(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                   var retour=items;
                   for(var i=0;i<items.length;i++){
                       retour[i].traded_currency= items[i].traded_currency;
                       retour[i].timestamp= parseInt(items[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/buydate', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.achat_eth_byDate(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                   var retour=items;
                   for(var i=0;i<items.length;i++){
                       retour[i].traded_currency= items[i].traded_currency;
                       retour[i].timestamp= parseInt(items[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/evolprice', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.price_evol_eth(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                   var retour=items;
                   for(var i=0;i<items.length;i++){
                       retour[i].price= items[i].price;
                       retour[i].timestamp= parseInt(items[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/avgachat', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.avg_achat_eth(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/cumsumeth', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.cumsum_eth(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    var retour=items.rows;
                   for(var i=0;i<retour.length;i++){
                       retour[i].timestamp= parseInt(retour[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/eth/cumsumetheur', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.cumsum_eth_eur(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    var retour=items.rows;
                   for(var i=0;i<retour.length;i++){
                       retour[i].timestamp= parseInt(retour[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/total_btc', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.total_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items.rows);  //return 'sum'
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/totalSum_btc', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.total_bought_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items.rows);  //return 'sum'
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/nbachat', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.total_count_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items.rows);  //return 'count'
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/avgachat', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.avg_achat_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items.rows);  //return 'avg'
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/avgentry', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.avg_entry_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items.rows);  //return 'avg'
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/btc/cumsumbtc', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.cumsum_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    var retour=items.rows;
                    for(var i=0;i<retour.length;i++){
                        retour[i].timestamp= parseInt(retour[i].timestamp,10);
                    }
                     res.json(retour);   
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/fees/timestamp_btc', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_timestamp_total_btc(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=items;					
					for(var i=0;i<items.length;i++){
						retour[i].fees_price=items[i].price*items[i].btc_fee;
						retour[i].timestamp=parseInt(items[i].timestamp,10);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/eth_timestamp', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_eth_total(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=items;
					
					for(var i=0;i<items.length;i++){
						retour[i].fees_price=items[i].price*items[i].btc_fee;
						retour[i].timestamp=parseInt(items[i].timestamp,10);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/total_eth', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_eth_total(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=0;
					
					for(var i=0;i<items.length;i++){
						retour+= (items[i].price*items[i].btc_fee);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})

router.get('/users/:id/fees/btc_paymium_vs_price', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_qty_paymium_btc(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=items;					
					for(var i=0;i<items.length;i++){
						retour[i].fees_price=items[i].price*items[i].btc_fee;						
					}
					res.json(retour);					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/btc_bitstamp_vs_price', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_qty_bitstamp_btc(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=items;
					
					for(var i=0;i<items.length;i++){
						retour[i].fees_price=items[i].price*items[i].btc_fee;
						
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/total_btc', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_btc_total(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=0;					
					for(var i=0;i<items.length;i++){
						retour+= (items[i].price*items[i].btc_fee);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/total_btc_paymium', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_btc_total_paymium(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=0;
					for(var i=0;i<items.length;i++){
						retour+= (items[i].price*items[i].btc_fee);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/fees/total_btc_bitstamp', authMiddleware.allowAccess,(req,res,next)=>{
	if(!isNaN(req.params.id)){
		main.fees_btc_total_bitstamp(req,res,req.params.id,next)
			.then(items=>{
				if(items){
					var retour=0;
					for(var i=0;i<items.length;i++){
						retour+= (items[i].price*items[i].btc_fee);
					}
					res.json(retour);
					
				}else{
					next(new Error('Invalid User'));
				}
			});
	}
	else{next(new Error('Invalid ID'));
	}
})
router.get('/users/:id/btc/evolution_price', authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.evolution_price_btc(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                   var retour=items;
                   for(var i=0;i<items.length;i++){
                       retour[i].price= items[i].price;
                       retour[i].timestamp= parseInt(items[i].timestamp,10);
                   }
                    res.json(retour); 
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
module.exports = router;
    