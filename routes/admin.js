var express = require('express');
var router = express.Router();
var query = require('../src/bd/queries')
const client = require('../src/bd/connection');


router.get('/', function(req, res, next) {


  client.query(query.getGovs)
  .then((result)=>{
      console.log("Отсылаем json");
      res.json(result.rows)
      console.log(result);
  }
      )
  .catch((e)=>{console.log(e)})
  
});

module.exports = router;
