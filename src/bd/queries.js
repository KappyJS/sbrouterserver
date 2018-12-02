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