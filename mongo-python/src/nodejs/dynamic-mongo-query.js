"use strict";
exports.__esModule = true;
exports.GetFinalQuery = void 0;
function GetFinalQuery() {
    var query = [];
    var matchTopLevelFilterIds = ["5fd1bd7868d7ac4e211a7642"];
    var matchRuleCategories = ["Summary"];
    var groupingBy = "ruleDescription";
    // stage 1 mathing
    var matching = {
        "$match": {
            "$and": [{
                    "topLevelFilter.id": {
                        "$in": matchTopLevelFilterIds
                    }
                },
                {
                    "ruleCategory": {
                        "$in": matchRuleCategories
                    }
                }
            ]
        }
    };
    query.push(matching);
    // stage 2 grouping on the basis of id and category
    var firstStageGrouping = {
        "$group": {
            "_id": {
                "ruleCategory": "$" + groupingBy,
                "topLevelFilter": "$topLevelFilter.id"
            },
            "name": {
                "$first": "$topLevelFilter.name"
            },
            "type": {
                "$first": "$topLevelFilter.type"
            },
            "fail": {
                "$sum": {
                    "$cond": [{
                            "$eq": ["$summaryStatus", 0]
                        }, 1, 0]
                }
            },
            "pass": {
                "$sum": {
                    "$cond": [{
                            "$eq": ["$summaryStatus", 1]
                        }, 1, 0]
                }
            },
            "warn": {
                "$sum": {
                    "$cond": [{
                            "$eq": ["$summaryStatus", 2]
                        }, 1, 0]
                }
            }
        }
    };
    query.push(firstStageGrouping);
    // stage 3 grouping on the basis of id and category
    var secondStageGrouping = {
        "$group": {
            "_id": "$_id.ruleCategory",
            "fail": {
                "$sum": "$fail"
            },
            "pass": {
                "$sum": "$pass"
            },
            "warn": {
                "$sum": "$warn"
            },
            "portfolio": {
                "$push": {
                    "id": "$_id.topLevelFilter",
                    "name": "$name",
                    "type": "$type",
                    "fail": "$fail",
                    "pass": "$pass",
                    "warn": "$warn"
                }
            }
        }
    };
    query.push(secondStageGrouping);
    // stage 4 grouping on the basis of id and category
    var thirdStageGrouping = {
        "$group": {
            "_id": 0,
            "result": {
                "$push": {
                    "category": "$_id",
                    "fail": "$fail",
                    "pass": "$pass",
                    "warn": "$warn",
                    "portfolio": "$portfolio"
                }
            },
            "fail": {
                "$sum": "$fail"
            },
            "pass": {
                "$sum": "$pass"
            },
            "warn": {
                "$sum": "$warn"
            }
        }
    };
    query.push(thirdStageGrouping);
    // stage 5 projection
    var projection = {
        "$project": {
            "_id": 0,
            "data": "$result",
            "total": {
                "fail": "$fail",
                "pass": "$pass",
                "warn": "$warn"
            }
        }
    };
    query.push(projection);
    // stage 5 projection
    return JSON.stringify(query);
}
exports.GetFinalQuery = GetFinalQuery;
