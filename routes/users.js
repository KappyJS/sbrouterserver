var express = require('express');
var router = express.Router();
var query = require('../src/bd/queries')
const client = require('../src/bd/connection');


router.post('/:id', function(req, res, next) {
   const id = req.params.id
   var json={
       requirements:[],
       deals:[]
   };
   console.log( query.getCardPageDeals(id));

console.log(req.body);
  client.query(query.getCardPageRequire(id,req.body))
  .then(res => {
     json.requirements =res.rows;
     return client.query(query.getCardPageDeals(id))
      })
    .then(res=>{
        console.log(res.rows)
json.deals = res.rows;
    })
  .then(()=>{
      console.log("Отсылаем json");
      res.json(json)
      console.log(json);
  }
      )
  .catch((e)=>{console.log(e)})
  
});

module.exports = router;
