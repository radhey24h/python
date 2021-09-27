import pymongo
import pprint
import json
from datetime import datetime


myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['compliance']
mycol = mydb['rule_execution_result']

with open('../query/drilldown_data.json') as q:
    msg_body = json.load(q)


summary_by_category_to_project_query = []
top_level_filter = msg_body['topLevelFilter']
if 'executionDateTime' in top_level_filter:
    execution_date_time = top_level_filter['executionDateTime']
else:
    execution_date_time = datetime.now().isoformat()

if 'effectiveDateTime' in top_level_filter:
    effective_date_time = top_level_filter['effectiveDateTime']
else:
    effective_date_time = datetime.now().isoformat()

# first stage of aggregate match summary_by_category_to_project_query
matches = {}
matches["$and"] = []
matches["$and"].append({"topLevelFilter.id": {"$in": top_level_filter["_id"]}})
matches["$and"].append({"executionDateTime": {'$lte': execution_date_time}})
matches["$and"].append({"effectiveDateTime": {'$lte': effective_date_time}})

if 'status' in msg_body and msg_body['status'] > -1:
    matches["$and"].append({"summaryStatus": msg_body['status']})

# filter criteria query
if 'ruleResultFilterCriteria' in msg_body:
    for filter_criteria in msg_body['ruleResultFilterCriteria']:
        matches["$and"].append({filter_criteria['category']: filter_criteria['value']})

summary_by_category_to_project_query.append({'$match': matches})

# second stage of sort and aggregate rule_results_query
sort_stage = {}
sort_stage = {'effectiveDateTime': -1}
summary_by_category_to_project_query.append({'$sort': sort_stage})

# second stage of group aggregate summary_by_category_to_project_query
zero_stage_grouping = {}
zero_stage_grouping = {'_id':  {'ruleId': "$ruleId"}}
zero_stage_grouping['executionDateTime'] = {'$max': '$executionDateTime'}
zero_stage_grouping['effectiveDateTime'] = {'$max': '$effectiveDateTime'}
zero_stage_grouping['ruleType'] = {'$max': '$ruleType'}
zero_stage_grouping['ruleCategory'] = {'$max': '$ruleCategory'}
zero_stage_grouping['ruleDescription'] = {'$max': '$ruleDescription'}
zero_stage_grouping['summaryStatus'] = {'$max': '$summaryStatus'}
zero_stage_grouping['topLevelFilter'] = {'$max': '$topLevelFilter'}
zero_stage_grouping['portfolio'] = {'$max': '$portfolio'}
zero_stage_grouping['ruleId'] = {'$max': '$ruleId'}
zero_stage_grouping['testResult'] = {'$max': '$testResult'}
zero_stage_grouping['cushion'] = {'$max': '$cushion'}
zero_stage_grouping['limitValue'] = {'$max': '$limitValue'}
zero_stage_grouping['operator'] = {'$max': '$operator'}
zero_stage_grouping['numerator'] = {'$max': '$numerator'}
zero_stage_grouping['denominator'] = {'$max': '$denominator'}
zero_stage_grouping['summaryStatusLabel'] = {'$max': '$summaryStatusLabel'}
zero_stage_grouping['outcome'] = {'$max': '$outcome'}
zero_stage_grouping['breachSince,'] = {'$max': '$breachSince,'}
zero_stage_grouping['requirement'] = {'$max': '$requirement'}
zero_stage_grouping['filteredDatasets'] = {'$max': '$filteredDatasets'}
summary_by_category_to_project_query.append({'$group': zero_stage_grouping})

pprint.pprint(summary_by_category_to_project_query)
