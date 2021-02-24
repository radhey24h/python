dhow dbs

use compliance

show collections

db.rule_execution_result.find({
    '$ruleCategory': 'Concentration Limitations'
}).pretty()

db.rule_execution_result.find(
    { "ruleId": "4086_ClearCreek_CMPTstGeneric7.clsTstGeneric_04_01_01_1" },
    { 'ruleId': 1, 'executionDateTime': 1, 'effectiveDateTime': 1 }
).pretty()

db.rule_execution_result.aggregate([
    { $match: { "ruleId": "4086_ClearCreek_CMPTstGeneric7.clsTstGeneric_04_01_01_1" } },
    { $group: { _id: { ruleId: '$ruleId' }, count: { $sum: 1 } } }
]).pretty()

db.rule_execution_result.aggregate([
    { $match: { "ruleId": "4086_ClearCreek_CMPTstGeneric7.clsTstGeneric_04_01_01_1" } },
    {
        $group: {
            _id: {
                ruleId: '$ruleId',
                ruleCategory: '$ruleCategory',
                topLevelFilter: '$topLevelFilter.id'
            }, count: { $sum: 1 }
        }
    }
]).pretty()

db.rule_execution_result.aggregate([{
    $match: {
        'topLevelFilter.id': '5fd1bd7868d7ac4e211a7642'
    }
}]).pretty()

db.rule_execution_result.aggregate([
    { '$match': { 'topLevelFilter.id': { '$in': ['5fd1bd7868d7ac4e211a7642'] } } }
]).pretty()

db.rule_execution_result.aggregate([{
    $group: {
        _id: {
            category: '$ruleId'
        },
        count: {
            $sum: 1
        }
    }
}]).pretty()

db.rule_execution_result.aggregate([{
    $group: {
        _id: {
            summaryStatus: '$summaryStatus'
        },
        count: {
            $sum: 1
        }
    }
}]).pretty()

db.rule_execution_result.aggregate([{
    $group: {
        _id: {
            ruleCategory: '$ruleId',
            topLevelFilter: '$topLevelFilter.id'
        },
        name: {
            $first: '$topLevelFilter.name'
        },
        summaryStatus: {
            $first: '$summaryStatus'
        },
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        }
    }
},
{
    $group: {
        _id: '$_id.ruleCategory',
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        },
        fail: {
            $sum: '$fail'
        },
        portfolio: {
            $push: {
                id: '$_id.topLevelFilter',
                name: '$name',
                summary: '$summaryStatus',
                pass: '$pass',
                warn: '$warn',
                fail: '$fail'
            }
        }
    }
}
]).pretty()

db.rule_execution_result.aggregate([{
    $group: {
        _id: '$ruleCategory',
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        portfolios: {
            $push: {
                id: '$$ROOT.topLevelFilter.id',
                name: '$$ROOT.topLevelFilter.name',
                category: '$$ROOT.ruleCategory',
                summary: '$$ROOT.summaryStatus',
                pass: '$$ROOT.ruleCategory',
                warn: '$$ROOT.ruleCategory',
                fail: '$$ROOT.ruleCategory'
            }
        }
    }
},
{
    $addFields: {
        portfolios: {
            $slice: [
                '$portfolios',
                30
            ]
        }
    }
},
]).pretty()


db.rule_execution_result.aggregate([{
    $group: {
        _id: '$ruleCategory',
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        portfolio: {
            $push: {
                id: '$$ROOT.topLevelFilter.id',
                name: '$$ROOT.topLevelFilter.name',
                category: '$$ROOT.ruleCategory',
                summary: '$$ROOT.summaryStatus',
                pass: '$$ROOT.ruleCategory',
                warn: '$$ROOT.ruleCategory',
                fail: '$$ROOT.ruleCategory'
            }
        }
    }
},
{
    $addFields: {
        portfolios: '$portfolio'
    }
}
]).pretty()


db.rule_execution_result.aggregate([{
    $match: {
        'topLevelFilter.id': '5fd1bd7868d7ac4e211a7642'
    }
},
{
    $group: {
        _id: {
            ruleCategory: '$ruleCategory',
            topLevelFilter: '$topLevelFilter.id'
        },
        name: {
            $first: '$topLevelFilter.name'
        },
        summaryStatus: {
            $first: '$summaryStatus'
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        }
    }
},
{
    $group: {
        _id: '$_id.ruleCategory',
        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        },
        portfolio: {
            $push: {
                id: '$_id.topLevelFilter',
                name: '$name',
                summary: '$summaryStatus',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn'
            }
        }
    }
}
]).pretty()


db.rule_execution_result.find({
    '$topLevelFilter.id': '5fd1bd7868d7ac4e211a7642'
}).pretty()


db.rule_execution_result.aggregate([{
    $match: {
        'topLevelFilter.id': '5fd1bd7868d7ac4e211a7642'
    }
},
{
    $group: {
        _id: {
            ruleCategory: '$ruleCategory',
            topLevelFilter: '$topLevelFilter.id'
        },
        name: {
            $first: '$topLevelFilter.name'
        },
        type: {
            $first: '$topLevelFilter.type'
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        }
    }
},
{
    $group: {
        _id: '$_id.ruleCategory',

        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        },
        portfolio: {
            $push: {
                id: '$_id.topLevelFilter',
                name: '$name',
                type: '$type',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn'
            }
        }

    }
},
{
    $project: {
        _id: 0,
        data: {
            category: '$_id',
            fail: '$fail',
            pass: '$pass',
            warn: '$warn',
            portfolio: '$portfolio'
        },
        total: {
            fail: {
                $sum: '$fail'
            },
            pass: {
                $sum: '$pass'
            },
            warn: {
                $sum: '$warn'
            }
        }
    }
}
]).pretty()


db.rule_execution_result.aggregate([{
    $match: {
        'ruleCategory': {
            $nin: ['', null]
        }
    }
},
{
    $group: {
        _id: {
            ruleCategory: '$ruleCategory',
            topLevelFilter: '$topLevelFilter.id'
        },
        name: {
            $first: '$topLevelFilter.name'
        },
        type: {
            $first: '$topLevelFilter.type'
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        }
    }
},
{
    $group: {
        _id: '$_id.ruleCategory',
        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        },
        portfolio: {
            $push: {
                id: '$_id.topLevelFilter',
                name: '$name',
                type: '$type',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn'
            }
        }
    }
},
{
    $group: {
        _id: 0,
        result: {
            $push: {
                category: '$_id',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn',
                portfolio: '$portfolio'
            }
        },
        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        }
    }
},
{
    $project: {
        _id: 0,
        data: '$result',
        total: {
            fail: '$fail',
            pass: '$pass',
            warn: '$warn'
        }
    }
}
]).pretty()


//####################################################

db.rule_execution_result.aggregate([{
    $match: {
        'topLevelFilter.id': {
            $in: ['5fd1bd7868d7ac4e211a7642']
        }
    },
},
{
    $group: {
        _id: {
            ruleCategory: '$ruleCategory',
            topLevelFilter: '$topLevelFilter.id'
        },
        name: {
            $first: '$topLevelFilter.name'
        },
        type: {
            $first: '$topLevelFilter.type'
        },
        fail: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 0]
                }, 1, 0]
            }
        },
        pass: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 1]
                }, 1, 0]
            }
        },
        warn: {
            $sum: {
                $cond: [{
                    $eq: ['$summaryStatus', 2]
                }, 1, 0]
            }
        }
    }
},
{
    $group: {
        _id: '$_id.ruleCategory',
        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        },
        portfolio: {
            $push: {
                id: '$_id.topLevelFilter',
                name: '$name',
                type: '$type',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn'
            }
        }
    }
},
{
    $group: {
        _id: 0,
        result: {
            $push: {
                category: '$_id',
                fail: '$fail',
                pass: '$pass',
                warn: '$warn',
                portfolio: '$portfolio'
            }
        },
        fail: {
            $sum: '$fail'
        },
        pass: {
            $sum: '$pass'
        },
        warn: {
            $sum: '$warn'
        }
    }
},
{
    $project: {
        _id: 0,
        data: '$result',
        total: {
            fail: '$fail',
            pass: '$pass',
            warn: '$warn'
        }
    }
}
]).pretty()



db.z.aggregate([
    { $match: { $not: { $gte: ["$$executionDateTime", new Date()] } } },
    {
        $group: {
            _id: "$ruleId",
            executionDate: { $first: "$executionDateTime" },
            count: { $sum: 1 },

        }
    }
])

db.z.aggregate([{ "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } }]

db.rule_execution_result.aggregate([
    {
        '$match': {
            '$and': [{ 'topLevelFilter.id': { '$in': ['5fd1d3638e26fed94fccb116'] } },
            { 'executionDateTime': { '$lte': '2021-01-29T04:46:33.256' } },
            { 'effectiveDateTime': { '$lte': '2021-01-29T04:46:33.256' } }]
        }
    },

    { '$group': { '_id': '$ruleId' }, 'groupByColumn': '' },

    {
        '$group': {
            '_id': {
                'groupByColumn': '$ruleCategory',
                'ruleId': '$ruleId',
                'topLevelFilter': '$topLevelFilter.id'
            },
            'fail': {
                '$sum': {
                    '$cond': [{ '$eq': ['$summaryStatus', 0] },
                        1,
                        0]
                }
            },
            'name': { '$first': '$topLevelFilter.name' },
            'pass': {
                '$sum': {
                    '$cond': [{ '$eq': ['$summaryStatus', 1] },
                        1,
                        0]
                }
            },
            'type': { '$first': '$topLevelFilter.type' },
            'warn': {
                '$sum': {
                    '$cond': [{ '$eq': ['$summaryStatus', 2] },
                        1,
                        0]
                }
            }
        }
    }
]).pretty()


                                        db.rule_execution_result.aggregate([
    {
        '$match': {
            '$and': [{ 'topLevelFilter.id': { '$in': ['5fd1d3638e26fed94fccb116'] } },
            { 'executionDateTime': { '$lte': '2021-01-29T04:46:33.256' } },
            { 'effectiveDateTime': { '$lte': '2021-01-29T04:46:33.256' } }]
        }
    },

    { '$group': { '_id': '$ruleId' }, 'groupByColumn': { "$push": '$ROOT' } }
]).pretty()

                                        
db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    { "$group": { "_id": "$ruleId", "result": { "$push": '$$ROOT' } } }

]).pretty() 

db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    {
        "$group": {
            "_id": "$ruleId",
            "ruleCategory": { "$first": "$ruleCategory" },
            "ruleDescription": { "$first": "$ruleDescription" },
            "summaryStatus": { "$first": "$summaryStatus" },
            "topLevelFilter": { "$first": "$topLevelFilter" }
        }
    }
]).pretty() 


db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    { "$group": { "_id": "$ruleId", 'result': { $min: '$$ROOT' } } },
    {
        "$group": {
            "_id": {
                "ruleCategory": "$result.ruleCategory",
                "topLevelFilter": "$result.topLevelFilter.id"
            },
            "name": { "$first": "$result.topLevelFilter.name" },
            "type": { "$first": "$result.topLevelFilter.type" },
            "fail": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 0]
                    }, 1, 0]
                }
            },
            "pass": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 1]
                    }, 1, 0]
                }
            },
            "warn": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 2]
                    }, 1, 0]
                }
            }
        }
    },

]).pretty()
//results: { $first: '$$ROOT' }

db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    { "$group": { "_id": "$ruleId", "result": { "$push": '$$ROOT' } } },
    {
        "$group": {
            "_id": { "ruleCategory": "$result.ruleDescription", "topLevelFilter": "$result.topLevelFilter.id" },
            "name": { "$first": "$result.topLevelFilter.name" },
            "type": { "$first": "$result.topLevelFilter.type" },
            "fail": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 0]
                    }, 1, 0]
                }
            },
            "pass": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 1]
                    }, 1, 0]
                }
            },
            "warn": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 2]
                    }, 1, 0]
                }
            }
        }
    }
]).pretty()

// ############################################################################
db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    {
        "$group": {
            "_id": "$ruleId", "ruleCategory": { "$min": "$ruleCategory" },
            "ruleDescription": { "$min": "$ruleDescription" },
            "summaryStatus": { "$min": "$summaryStatus" },
            "topLevelFilter": { "$min": "$topLevelFilter" }
        }
    },
    {
        "$group": {
            "_id": {
                "category": "$ruleCategory",
                "topLevelFilter": "$topLevelFilter.id"
            },
            "name": { "$first": "$topLevelFilter.name" },
            "type": { "$first": "$topLevelFilter.type" },
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
    },
    {
        "$group": {
            "_id": "$_id.category",
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
    },
    {
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
    },
    {
        "$project": {
            "_id": 0,
            "data": "$result",
            "total": {
                "fail": "$fail",
                "pass": "$pass",
                "warn": "$warn"
            }
        }
    }
]).pretty()



db.rule_execution_result.aggregate([
    { "$match": { "executionDateTime": { '$lte': "2021-01-29T04:46:33.256" } } },
    {
        "$group": {
            "_id": "$ruleId",
            "ruleCategory": { "$min": "$ruleCategory" },
            "ruleDescription": { "$min": "$ruleDescription" },
            "summaryStatus": { "$min": "$summaryStatus" },
            "topLevelFilter": { "$min": "$topLevelFilter" }
        }
    },
    {
        "$group": {
            "_id": {
                "category": "$ruleCategory",
                "topLevelFilter": "$topLevelFilter.id"
            },
            "name": { "$first": "$topLevelFilter.name" },
            "type": { "$first": "$topLevelFilter.type" },
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
    }
]).pretty()

//{ "$match": { "executionDateTime": { '$lte': "2021-01-30T04:46:33.256" } } },

db.rule_execution_result.aggregate([
    {
        "$match": {
            "$and": [{
                "topLevelFilter.id": {
                    "$in": ["600dce87f5b3121091f73c80"]
                }
            },
            {
                "executionDateTime": {
                    '$lte': "2021-01-30T04:46:33.256"
                }
            }
            ]
        }
    },
    { "$group": { "_id": "$ruleId", 'result': { $min: '$$ROOT' } } },
    {
        "$group": {
            "_id": {
                "ruleCategory": "$result.ruleCategory",
                "topLevelFilter": "$result.topLevelFilter.id"
            },
            "name": { "$first": "$result.topLevelFilter.name" },
            "type": { "$first": "$result.topLevelFilter.type" },
            "fail": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 0]
                    }, 1, 0]
                }
            },
            "pass": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 1]
                    }, 1, 0]
                }
            },
            "warn": {
                "$sum": {
                    "$cond": [{
                        "$eq": ["$result.summaryStatus", 2]
                    }, 1, 0]
                }
            }
        }
    },
    {
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
    },
    {
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
    },
    {
        "$project": {
            "_id": 0,
            "data": "$result",
            "total": {
                "fail": "$fail",
                "pass": "$pass",
                "warn": "$warn"
            }
        }
    }
]).pretty()