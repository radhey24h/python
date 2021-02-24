import pymongo
import pprint
import json
#from dateutil.parser import parse
from datetime import datetime

myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['compliance']
mycol = mydb['rule_execution_results']

with open('../query/drilldown_data.json') as q:
    msg_body = json.load(q)

rule_results_query = []
top_level_filter = msg_body['topLevelFilter']
# date query
if 'executionDateTime' in top_level_filter:
    execution_date_time = top_level_filter['executionDateTime']
else:
    execution_date_time = datetime.utcnow()

if 'effectiveDateTime' in top_level_filter:
    effective_date_time = top_level_filter['effectiveDateTime']
else:
    effective_date_time = datetime.utcnow()

pprint.pprint(datetime.utcnow())


# first stage of aggregate match rule_results_query
matches = {}
matches["$and"] = []
matches["$and"].append({"topLevelFilter.id": { "$in": [top_level_filter["_id"]]}})
matches["$and"].append({"executionDateTime": {'$lte': execution_date_time}})
matches["$and"].append({"effectiveDateTime": {'$lte': effective_date_time}})

if 'status' in msg_body and msg_body['status'] > -1:
    matches["$and"].append({"summaryStatus": msg_body['status']})

# filter criteria query
if 'ruleResultFilterCriteria' in msg_body:
    for filter_criteria in msg_body['ruleResultFilterCriteria']:
        matches["$and"].append({filter_criteria['category']: filter_criteria['value']})

rule_results_query.append({'$match': matches})

# second stage of sort rule_results_query
sort_stage = {}
sort_stage = {'executionDateTime': -1, 'effectiveDateTime': -1}
rule_results_query.append({'$sort': sort_stage})


ruleResults = mycol.aggregate(rule_results_query)


for x in ruleResults:
  pprint.pprint(x)  

#pprint.pprint(rule_results_query)