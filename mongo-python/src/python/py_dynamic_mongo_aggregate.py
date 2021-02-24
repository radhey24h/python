import pymongo
import pprint
import json

myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['compliance']
mycol = mydb['rule_execution_result']

with open('../query/request_data.json') as q:
    query_params = json.load(q)

summary_by_category_to_project_query = []
# first stage of aggregate summary_by_category_to_project_query
matches = {}
matches["$and"]=[]
matches["$and"].append({ "topLevelFilter.id": { "$in": query_params["topLevelFilterIds"]}})

if 'Filter' in query_params:
  for search_filter in query_params['Filter']:
      matches["$and"].append({'ruleCategory': search_filter['value']})
summary_by_category_to_project_query.append({'$match': matches})

# second stage of aggregate pipeline
first_stage_grouping = {}
delimiter = chr(36)
first_stage_grouping = {'_id':  {'groupByColumn': f'${query_params["category"]}','topLevelFilter': '$topLevelFilter.id'}}
first_stage_grouping['name'] = {'$first': '$topLevelFilter.name'}
first_stage_grouping['type'] = {'$first': '$topLevelFilter.type'}
first_stage_grouping['fail'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 0]}, 1, 0]}}
first_stage_grouping['pass'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 1]}, 1, 0]}}
first_stage_grouping['warn'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 2]}, 1, 0]}}
summary_by_category_to_project_query.append({'$group': first_stage_grouping})

# third stage of aggregate pipeline
second_stage_grouping = {}
second_stage_grouping = {'_id': '$_id.groupByColumn'}
second_stage_grouping['fail'] = {'$sum': '$fail'}
second_stage_grouping['pass'] = {'$sum': '$pass'}
second_stage_grouping['warn'] = {'$sum': '$warn'}
second_stage_grouping['portfolio'] = {'$push': {'id': '$_id.topLevelFilter','name': '$name', 'type': '$type', 'fail': '$fail', 'pass': '$pass', 'warn': '$warn'}}
summary_by_category_to_project_query.append({'$group': second_stage_grouping})
    
# fourth stage of aggregate pipeline
third_stage_grouping = {}
third_stage_grouping = {'_id': 0}
third_stage_grouping['result'] = {'$push': {'category': '$_id', 'fail': '$fail', 'pass': '$pass', 'warn': '$warn', 'portfolio': '$portfolio'}}
third_stage_grouping['fail'] = {'$sum': '$fail'}
third_stage_grouping['pass'] = {'$sum': '$pass'}
third_stage_grouping['warn'] = {'$sum': '$warn'}
summary_by_category_to_project_query.append({'$group': third_stage_grouping})
    
# fifth stage of aggregate pipeline
projection = {}
projection = {'_id': 0, 'data': '$result', 'total': {
    'fail': '$fail', 'pass': '$pass', 'warn': '$warn'}}
summary_by_category_to_project_query.append({'$project': projection})


ruleResults = mycol.aggregate(summary_by_category_to_project_query)

totalData=''
for x in ruleResults:
  pprint.pprint(x['data'])   

totalData=x['total']
pprint.pprint(totalData)
