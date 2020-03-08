
var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'esilv2019',
        database: 'test'
    }
});

const getTableData = (req, res) => {
  db.select('*').from('users').orderBy('id')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
function getUserBymail (req)  {
    return db('users').where('email', req.body.email);
}
function create (user,res) {
    return db('users').insert(user).then(ids => { return ids[0];});    
}
function getUser(req, res, id, next) {
    return db('users').where('id', id);  
}
function getAdmin(req, res, id, next){
    return db('users').where('id', id).select('isadmin');
}
function somme(req,res,id,next){ //sommme totale des achats
  return db('share_in_machine').sum('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
function sommeavg(req,res,id,next){ //prix moyen entrée sur eth
  return db('records').avg('price').innerJoin('share_in_machine','machineid','machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({
    'trading_pair':'etheur',
    'buymachines.user_id' : id});
}
function sommeavg2(req,res,id,next){ //moyenne des achats pour chaque opé toutes crypto confondues
  return db('share_in_machine').avg('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
function somme2(req,res,id,next){ //nb achat par user toutes crypto confondues
  return db('share_in_machine').count('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
function buyByDate(req,res,id,next){ //achat par user et par date toutes crypto
  return db('records').select('traded_currency','timestamp').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').where('share_in_machine.user_id',id)
}
function somme_achat_eth(req,res,id,next){ //somme totale achat pour eth
  return db('records').sum('traded_currency').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines', 'buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id, 'buymachines.trading_pair':'etheur'});
}
function nb_achat_eth(req,res,id,next){ //nombre achat pour eth
  return db('records').count('traded_currency').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines', 'buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id, 'buymachines.trading_pair':'etheur'});
}
function avg_achat_eth(req,res,id,next){ //moyenne achat pour eth
  return db('records').avg('traded_currency').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines', 'buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id, 'buymachines.trading_pair':'etheur'});
}
function achat_eth_byDate(req,res,id,next){
  return db('records').select('traded_currency','timestamp').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines', 'buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.trading_pair':'etheur'});
}
function price_evol_eth(req,res,id,next){
  return db('records').select('price','timestamp').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines', 'buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.trading_pair':'etheur'});
}
function cumsum_eth(req,res,id,next){
  return db.raw(' select  SUM(traded_btc) OVER(ORDER BY share_in_machine.user_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumsum, timestamp from records inner join share_in_machine on machineid=machine_id inner join buymachines on buymachines.id=share_in_machine.machine_id where share_in_machine.user_id=? and buymachines.trading_pair=?',[id, 'etheur'])
}
function cumsum_eth_eur(req,res,id,next){
  return db.raw(' select  SUM(traded_currency) OVER(ORDER BY share_in_machine.user_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumsum, timestamp from records inner join share_in_machine on machineid=machine_id inner join buymachines on buymachines.id=share_in_machine.machine_id where share_in_machine.user_id=? and buymachines.trading_pair=?',[id, 'etheur'])
}
function total_btc(req,res,id,next){
  return db.raw('SELECT sum (traded_btc) FROM records INNER JOIN share_in_machine ON records.machineid = share_in_machine.machine_id INNER JOIN buymachines ON buymachines.id = share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ? AND buymachines.user_id = ? ',['BTCEUR','XBTEUR', 'btceur',id])
}
function total_bought_btc(req,res,id,next){
  return db.raw('SELECT sum (traded_currency) FROM records INNER JOIN share_in_machine ON records.machineid = share_in_machine.machine_id INNER JOIN buymachines ON buymachines.id = share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ? AND share_in_machine.user_id = ?',['BTCEUR','XBTEUR', 'btceur',id])
}
function total_count_btc(req,res,id,next){
  return db.raw('SELECT count(traded_currency) FROM records INNER JOIN share_in_machine ON records.machineid = share_in_machine.machine_id INNER JOIN buymachines ON buymachines.id = share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ? AND share_in_machine.user_id = ?',['BTCEUR','XBTEUR', 'btceur',id])
}
function avg_achat_btc(req,res,id,next){
  return db.raw('SELECT avg(traded_currency) FROM records INNER JOIN share_in_machine ON records.machineid = share_in_machine.machine_id INNER JOIN buymachines ON buymachines.id = share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ? AND share_in_machine.user_id = ?',['BTCEUR','XBTEUR', 'btceur',id])
}
function avg_entry_btc(req,res,id,next){
  return db.raw('SELECT avg(price) FROM records INNER JOIN share_in_machine ON records.machineid = share_in_machine.machine_id INNER JOIN buymachines ON buymachines.id = share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ? AND share_in_machine.user_id = ?',['BTCEUR','XBTEUR', 'btceur',id])
}
function cumsum_btc(req,res,id,next){
  return db.raw('select sum(traded_currency) OVER(ORDER BY share_in_machine.user_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumsum, timestamp from records inner join share_in_machine on machineid=machine_id inner join buymachines on buymachines.id=share_in_machine.machine_id where buymachines.trading_pair = ? OR buymachines.trading_pair = ? OR buymachines.trading_pair = ?  AND share_in_machine.user_id = ?',['BTCEUR','XBTEUR', 'btceur',id])
}
function fees_timestamp_total_btc(req,res,id,next){ //coût de transaction btc totale en fct du temps 
	return db('records').select('price','btc_fee','traded_currency','timestamp').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.exchange':'Bitstamp', 'buymachines.trading_pair':'btceur'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Paymium', 'buymachines.trading_pair':'BTCEUR'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Kraken', 'buymachines.trading_pair':'XBTEUR'});
}
function fees_btc_total(req,res,id,next){ //coût de transaction totale_btc
	return db('records').select('price','btc_fee').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id, 'buymachines.trading_pair':'BTCEUR'}).orWhere({'share_in_machine.user_id':id, 'buymachines.trading_pair':'btceur'}).orWhere({'share_in_machine.user_id':id, 'buymachines.trading_pair':'XBTEUR'});
}
function fees_btc_total_paymium(req,res,id,next){ //cout de transaction total btc pour l exchange Paymium
		return db('records').select('price','btc_fee').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.exchange':'Paymium', 'buymachines.trading_pair':'BTCEUR'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Paymium', 'buymachines.trading_pair':'btceur'});
}
function fees_btc_total_bitstamp(req,res,id,next){ //cout de transaction total btc pour l exchange Bitstamp
		return db('records').select('price','btc_fee').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.exchange':'Bitstamp', 'buymachines.trading_pair':'BTCEUR'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Bitstamp', 'buymachines.trading_pair':'btceur'});
}
function fees_qty_paymium_btc(req,res,id,next){ //coût de transaction en fct de la quantité achetée (Paymium) for btc
	return db('records').select('price','btc_fee','traded_currency').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.exchange':'Paymium', 'buymachines.trading_pair':'btceur'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Paymium', 'buymachines.trading_pair':'BTCEUR'});
}
function fees_qty_bitstamp_btc(req,res,id,next){ //coût de transaction en fct de la quantité (Bitstamp) for btc
	return db('records').select('price','btc_fee','traded_currency').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id,'buymachines.exchange':'Bitstamp', 'buymachines.trading_pair':'btceur'}).orWhere({'share_in_machine.user_id':id,'buymachines.exchange':'Bitstamp', 'buymachines.trading_pair':'BTCEUR'});
}
function evolution_price_btc(req,res,id,next){
	return db('records').select('price','timestamp').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'buymachines.trading_pair':'btceur'}).orWhere({'buymachines.trading_pair':'BTCEUR'}).orWhere({'buymachines.trading_pair':'XBTEUR'});
}
function fees_eth_total(req,res,id,next){ //frais de transaction totale_eth
	return db('records').select('price','timestamp','btc_fee').innerJoin('share_in_machine','records.machineid','share_in_machine.machine_id').innerJoin('buymachines','buymachines.id','share_in_machine.machine_id').where({'share_in_machine.user_id':id, 'buymachines.trading_pair':'etheur'});
}
module.exports = {
    getTableData,
    getUser,
    getUserBymail,
    create,
    getAdmin,
    somme,
    sommeavg,
    somme2,
    sommeavg2,
    buyByDate,
    somme_achat_eth,
    nb_achat_eth,
    avg_achat_eth,
    achat_eth_byDate,
    price_evol_eth,
    cumsum_eth,
    cumsum_eth_eur,
    total_btc,
    total_bought_btc,
    total_count_btc,
    avg_achat_btc,
    avg_entry_btc,
    cumsum_btc,
    fees_timestamp_total_btc,
    fees_btc_total,
    fees_btc_total_bitstamp,
    fees_btc_total_paymium,
    fees_qty_bitstamp_btc,
    fees_qty_paymium_btc,
    evolution_price_btc,
    fees_eth_total
}
