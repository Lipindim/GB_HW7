const moment = require('moment');
const fs = require('fs');
const logFile = 'server/db/stats.json';

let writeLog = (action, product_id) => {
    fs.readFile(logFile, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        } else {
            let logs = JSON.parse(data);
            logs.events.push(
                {
                    action,
                    product_id,
                    ts:moment().format('YYYY-MM-DD HH:mm:ss')
                }
            );
            logs.total = logs.events.length;
            logs.last_change = moment().format('YYYY-MM-DD HH:mm:ss');
            fs.writeFile(logFile, JSON.stringify(logs, null, 4), (err) => {
                if(err){
                    console.log(err);
                }
            })
        }
    })
};

module.exports = {
    writeLog
};