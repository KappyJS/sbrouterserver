module.exports.getAllIndustry= 'SELECT industry.in_id,industry.in_name FROM industry ORDER BY industry.in_id';
module.exports.getIndustryNoReq = 'select industry.in_id,industry.in_name\n' +
    'from industry\n' +
    '\n' +
    'left join re_in\n' +
    'on industry.in_id = re_in.in_id\n' +
    '\n' +
    'where re_in.in_id is null ORDER BY industry.in_id';
module.exports.overIndustry = 'select industry.in_id,industry.in_name,requirement.re_id,requirement.re_require FROM industry,requirement,re_in\n' +
    'where re_in.in_id = industry.in_id and re_in.re_id = requirement.re_id\n';
module.exports.getAllGoals = 'SELECT goal.gs_id,goal.gs_name,goal.gs_desc FROM goal';
module.exports.openPageRequirements = 'SELECT requirement.re_id,requirement.re_require,requirement.re_desc  FROM requirement WHERE requirement.re_weight=3 AND requirement.re_id>5'
module.exports.getReqByInd = (val)=> {return('SELECT requirement.re_id,requirement.re_require,requirement.re_desc FROM requirement,re_in WHERE re_in.in_id = '+val+' AND requirement.re_id=re_in.re_id')}
module.exports.getCards = (json) =>{

   const check=()=>{
       let query = ""
       for (var i=0;i<json.requirements.length;i++){

        if(i){

                query = query + " OR "


        }

        query = query + "go_re.re_id=" + json.requirements[i];

    }console.log(query)
    return query
   }

    return('SELECT   (t1.weight_choose*100)/t2.weight_all as result_weight,government.* FROM (\n' +
'SELECT DISTINCT government.go_id, SUM(requirement.re_weight) as weight_choose\n' +
'FROM government,requirement,go_re,go_in,industry\n' +
'WHERE government.go_id=go_re.go_id\n' +
'AND requirement.re_id=go_re.re_id AND government.go_id=go_in.go_id\n' +
'AND industry.in_id=go_in.in_id  AND ('+ check()

    +') \n' +
'AND go_in.in_id='+json.industry+'\n' +
'GROUP BY government.go_id\n' +
'ORDER BY government.go_id\n' +
'\t\n' +
'\n' +
') t1, (\n' +
'\n' +
'SELECT government.go_id ,SUM(requirement.re_weight) as weight_all\n' +
'FROM government,requirement,go_re\n' +
'WHERE government.go_id=go_re.go_id\n' +
'AND requirement.re_id=go_re.re_id \n' +
'GROUP BY government.go_id\n' +
') t2, \n' +
'government\n' +
'\n' +
'\n' +
'where t1.go_id=t2.go_id AND t1.go_id = government.go_id ORDER BY result_weight DESC')}
module.exports.getClientRequirements = 'SELECT * FROM clients_req'
module.exports.getClientParams = 'SELECT params.par_name,answers.ans_name,answers.ans_id FROM params,answers,ans_par where params.par_id = ans_par.par_id AND answers.ans_id = ans_par.ans_id'
module.exports.getGovs = 'select * from governments'
module.exports.getMaxWeight = 'SELECT t1.gov_id,SUM(t1.oweight) as max_weight FROM (select governments.* ,COUNT(params.par_id)*2 as oweight from governments,params GROUP BY governments.gov_id UNION  ALL select governments.*,SUM(cli_gov_req.cli_gov_weight) as weight from governments,clients_req,cli_gov_req where governments.gov_id=cli_gov_req.gov_id and clients_req.cli_id = cli_gov_req.cli_id  GROUP BY governments.gov_id ) t1 GROUP BY t1.gov_name,t1.gov_id,t1.gov_desc,t1.gov_date_start,t1.gov_date_end,t1.gov_credit_time,t1.gov_pool_form,t1.gov_owner,t1.gov_max_sum,t1.gov_percent,t1.govs_sum'
module.exports.getGovsByReqs = (params,req) =>{
    
    const check_params=()=>{
        if(params){
        var query1 = ""
       
        for (var i=0;i<params.length;i++){
         if(i){
            
                 query1 = query1 + " OR ans_govs.ans_id = "+ params[i]+" "
         }
         else{
         
         query1 = query1 + "and (ans_govs.ans_id = " + params[i]+" ";}
         
        }
     }
     query1 = query1 + ")"
     return query1
    }
    
    const check_req=()=>{
        console.log(req[0])
        if(req[0]){
            
        var query2 = ""
        var key = 0;
        for (var i=0;i<req.length;i++){
 
         if(i){
                key++;
                 query2 = query2 + " OR cli_gov_req.cli_id= " + req[i]+" "
         }
         else{
            key++;
         query2 = query2 + "and (cli_gov_req.cli_id= " + req[i]+" ";
         }
     }
     
     if (key) query2 = query2 + " )"
     return query2
    }
    else 
    return " and cli_gov_req.cli_id=NULL "

}
    return ( 'SELECT t1.gov_name,t1.gov_id,t1.gov_desc,t1.gov_date_start,t1.gov_date_end,t1.gov_credit_time,t1.gov_pool_form,t1.gov_owner,t1.gov_max_sum,t1.gov_percent,t1.govs_sum,SUM(t1.weight) as choose_weight FROM(\n'+
        'select governments.*,SUM(ans_govs.govs_ans_weight) as weight\n'+
        'FROM governments,answers,ans_govs\n'+
        'where governments.gov_id = ans_govs.gov_id and ans_govs.ans_id = answers.ans_id\n'+ check_params() +
        'GROUP BY governments.gov_id\n'+
        'UNION\n'+ 
        'select governments.*,SUM(cli_gov_req.cli_gov_weight) as weight from governments,clients_req,cli_gov_req\n'+
        'where governments.gov_id=cli_gov_req.gov_id and clients_req.cli_id = cli_gov_req.cli_id \n'+check_req() +
        'GROUP BY governments.gov_id) t1\n'+ 
        'GROUP BY t1.gov_name,t1.gov_id,t1.gov_desc,t1.gov_date_start,t1.gov_date_end,t1.gov_credit_time,t1.gov_pool_form,t1.gov_owner,t1.gov_max_sum,t1.gov_percent,t1.govs_sum\n'+
        'ORDER BY choose_weight DESC'
    )
        
}

module.exports.getCardPageRequire = (id,selected) =>{


    const check=()=>{
        let key = 0;
        let query = ""
        for (var i=0;i<selected.length;i++){
 
         if(i){
 key++;
                 query = query + " and clients_req.cli_id != " + selected[i]+ ' ' ;
 
 
         }
         else
         query = query + "and (clients_req.cli_id != " + selected[i] ;
 
     }
     return query +')'
    }

    return ('select clients_req.cli_desc,clients_req.cli_id from governments,cli_gov_req,clients_req \n'+
       ' where governments.gov_id = cli_gov_req.gov_id and clients_req.cli_id = cli_gov_req.cli_id and clients_req NOTNULL \n'+ check() +
        'and cli_gov_req.gov_id = '+id)
}

module.exports.getCardPageDeals = (id) =>{
    return ('select deal_req.* from deal_req,deal_gov,governments \n'+
       ' where governments.gov_id = deal_gov.gov_id and deal_gov.deal_id = deal_req.deal_id \n'+ 
        'and governments.gov_id = '+id)
}
module.exports.getGovs = 'select  *  from governments'
