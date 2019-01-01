const cron = require('node-cron');

const config = { scheduled: false }

const task = cron.schedule('*/1 * * * *', function() {
    console.log('running from cron job');
}, config);

module.exports = task;