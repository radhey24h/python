import pymongo
import pprint
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["compliance"]
mycol = mydb["rule_execution_result"]

with open('../query/genrated_query.json') as q:
  query = json.load(q)

ruleResults = mycol.aggregate(query)
totalData=''

for x in ruleResults:
  pprint.pprint(x['data'])
  totalData=x['total']


pprint.pprint(totalData)

#myquery = { 'topLevelFilter.id': '5fd1bd7868d7ac4e211a7642' } #top_level_filter_ids
# mydoc = mycol.find(myquery)

# for x in mydoc:
#   pprint.pprint(x)