var express = require('express');
var router = express.Router();
var query = require('../src/bd/queries')
const client = require('../src/bd/connection');

function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }


router.get('/', function(req, res, next) {

var json={};
 json.client_requirements =[];
 json.client_params=[];

    client.query(query.getClientRequirements)
    .then(res => {
       json.client_requirements =res.rows;
      
       return client.query(query.getClientParams)
        })
        
   .then(res=>{
            
            json.client_params = groupBy(res.rows,(v)=>v.par_name);
       
           return client.query(query.getGovs)
            })
            .then(res => {
               json.govs =res.rows;
              
               return client.query(query.getMaxWeight)
                })
                .then(res=>{
            
                    json.max_weight = res.rows;
                    
                   
                    })
            /*
   .then(res=>{
       for (var i =0;i<res.rows.length;i++)
            json.requirement.push(res.rows[i])
            console.log('Формируем все требования')
                })*/
    .then(()=>{
        
        res.json(json)}
        )
    .catch(()=>{console.log('Ошибка при формировании запроса')})
   

    })
    
    router.post('/govs', function(req, res, next) {

var json={};
         var arr_params=[]
         for (var key in req.body.params) {
             arr_params.push(req.body.params[key]);
    }

    client.query(query.getGovsByReqs(arr_params,req.body.requirements))
    .then(res=> {json = res.rows})
    .then(()=>{
       
        res.json(json)
    })
    .catch(error => (console.log(error)))

        /*)
            client.query(query.getGovs)
            .then(res => {
               json.govs =res.rows;
               console.log('Формируем госпрограммы')
                })
            .then(()=>{
                console.log("Отсылаем json")
                res.json(json)}
                )
            .catch(()=>{console.log('Ошибка при формировании запроса')})
           
        */
      
            })

router.post('/', function (req, res) {
    console.log(req.body);
    console.log('_________________________');
    client.query(query.getCards(req.body))
        .then(res =>{
            console.log('_________________________');
            console.log(res.rows);
        });

    res.sendStatus(200);

});
module.exports = router;


