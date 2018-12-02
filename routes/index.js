var express = require('express');
var router = express.Router();
var query = require('../src/bd/queries')
const client = require('../src/bd/connection');




router.get('/', function(req, res, next) {

var json={};
 json.industry =[];
    json.requirement =[];

    client.query(query.getIndustryNoReq)
        .then(res => {

           json.industry =res.rows;

        })
        .then( () =>

            client.query(query.overIndustry)
            .then(res=>{
                for (var i =0;i<res.rows.length;i++){
                    json.industry.push(res.rows[i]);
                }
                return res

        }).then(()=> client.query(query.openPageRequirements)
                .then(res=>{
                    for (var i =0;i<res.rows.length;i++){
                        json.requirement.push(res.rows[i]);
                    }
                }).then(()=>{

                   res.json(json);
                })


    ))
    })






router.post('/', function (req, res) {
    console.log(req.body)
    console.log('_________________________');
    client.query(query.getCards(req.body))
        .then(res =>{
            console.log('_________________________');
            console.log(res.rows);
        });

    res.sendStatus(200);

});
module.exports = router;


