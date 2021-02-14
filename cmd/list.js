const chalk = require('chalk');
const { types } = require('./values');

// export function to list coffee
module.exports = function() {
    console.log('COFFEE MENU');
    console.log('------------------');

    // list on separate lines
    types.forEach((type) => {
        console.log('%s %s', chalk.bold(type.name), chalk.grey('/ '+ type.price));
    });
};