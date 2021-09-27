
import * as fs from 'fs';
import { GetFinalQuery } from './dynamic-mongo-query';


let finalQuery=GetFinalQuery();

// writing query in json file
fs.writeFile('../query/genrated_query.json',finalQuery, function(err){
    if(err) return console.log(err);
    console.log('query updated');
});
