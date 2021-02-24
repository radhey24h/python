import pymongo
import pprint
import json
from datetime import datetime


myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['compliance']
mycol = mydb['rule_execution_result']

with open('../query/request_data.json') as q:
    query_params = json.load(q)

summary_by_category_to_project_query = []
if 'executionDateTime' in query_params:
    execution_date_time=query_params['executionDateTime']
else:
    execution_date_time=datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f%z")

if 'effectiveDateTime' in query_params:   
    effective_date_time=query_params['effectiveDateTime']
else:
    effective_date_time=datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f%z")
# first stage of aggregate match summary_by_category_to_project_query
matches = {}
matches["$and"]=[]
matches["$and"].append({ "topLevelFilter.id": { "$in": query_params["topLevelFilterIds"]}})
matches["$and"].append({ "executionDateTime": { '$lte': execution_date_time}})
matches["$and"].append({ "effectiveDateTime": { '$lte': effective_date_time}})

if 'Filter' in query_params:
    for search_filter in query_params['Filter']:
      matches["$and"].append({'ruleCategory': search_filter['value']})
summary_by_category_to_project_query.append({'$match': matches})

# second stage of group aggregate summary_by_category_to_project_query
zero_stage_grouping = {}
zero_stage_grouping = {'_id':  {'ruleId': "$ruleId"}}
zero_stage_grouping['ruleType'] = {'$min': '$ruleType'}
zero_stage_grouping['ruleCategory'] = {'$min': '$ruleCategory'}
zero_stage_grouping['ruleDescription'] = {'$min': '$ruleDescription'}
zero_stage_grouping['summaryStatus'] = {'$min': '$summaryStatus'}
zero_stage_grouping['topLevelFilter'] = {'$min': '$topLevelFilter'}
summary_by_category_to_project_query.append({'$group': zero_stage_grouping})

pprint.pprint(summary_by_category_to_project_query)

# third stage of group aggregate summary_by_category_to_project_query
first_stage_grouping = {}
first_stage_grouping = {'_id':  {'groupByColumn': f'${query_params["category"]}','topLevelFilter': '$topLevelFilter.id'}}
first_stage_grouping['name'] = {'$first': '$topLevelFilter.name'}
first_stage_grouping['type'] = {'$first': '$topLevelFilter.type'}
first_stage_grouping['fail'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 0]}, 1, 0]}}
first_stage_grouping['pass'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 2]}, 1, 0]}}
first_stage_grouping['warn'] = {'$sum': {'$cond': [{'$eq': ['$summaryStatus', 1]}, 1, 0]}}
summary_by_category_to_project_query.append({'$group': first_stage_grouping})

# fourth stage of group aggregate summary_by_category_to_project_query
second_stage_grouping = {}
second_stage_grouping = {'_id': '$_id.groupByColumn'}
second_stage_grouping['fail'] = {'$sum': '$fail'}
second_stage_grouping['pass'] = {'$sum': '$pass'}
second_stage_grouping['warn'] = {'$sum': '$warn'}
second_stage_grouping['portfolio'] = {'$push': {'id': '$_id.topLevelFilter','name': '$name', 'type': '$type', 'fail': '$fail', 'pass': '$pass', 'warn': '$warn'}}
summary_by_category_to_project_query.append({'$group': second_stage_grouping})

# fifth stage of group aggregate summary_by_category_to_project_query
third_stage_grouping = {}
third_stage_grouping = {'_id': 0}
third_stage_grouping['result'] = {'$push': {'category': '$_id', 'fail': '$fail', 'pass': '$pass', 'warn': '$warn', 'portfolio': '$portfolio'}}
third_stage_grouping['fail'] = {'$sum': '$fail'}
third_stage_grouping['pass'] = {'$sum': '$pass'}
third_stage_grouping['warn'] = {'$sum': '$warn'}
summary_by_category_to_project_query.append({'$group': third_stage_grouping})

# sixth stage of group aggregate summary_by_category_to_project_query
projection = {}
projection = {'_id': 0, 'data': '$result', 'total': {'fail': '$fail', 'pass': '$pass', 'warn': '$warn'}}
summary_by_category_to_project_query.append({'$project': projection})

ruleResults = mycol.aggregate(summary_by_category_to_project_query)

totalData=''
for x in ruleResults:
  pprint.pprint(x['data'])   

totalData=x['total']
pprint.pprint(totalData)
