
var helpers = {

    /**
     * {{#compare}}...{{/compare}}
     *
     * @credit: OOCSS
     * @param left value
     * @param operator The operator, must be between quotes ">", "=", "<=", etc...
     * @param right value
     * @param options option object sent by handlebars
     * @return {String} formatted html
     *
     * @example:
     *   {{#compare unicorns "<" ponies}}
     *     I knew it, unicorns are just low-quality ponies!
     *   {{/compare}}
     *
     *   {{#compare value ">=" 10}}
     *     The value is greater or equal than 10
     *     {{else}}
     *     The value is lower than 10
     *   {{/compare}}
     */
    compare: function(left, operator, right, options) {

        if (arguments.length < 3) {
            throw new Error('Handlebars Helper "compare" needs 2 parameters');
        }

        if (options === undefined) {
            options = right;
            right = operator;
            operator = '===';
        }

        var operators = {
            '==':     function(l, r) {return l == r; },

            '===':    function(l, r) {return l === r; },

            '!=':     function(l, r) {return l != r; },

            '!==':    function(l, r) {return l !== r; },

            '<':      function(l, r) {return l < r; },

            '>':      function(l, r) {return l > r; },

            '<=':     function(l, r) {return l <= r; },

            '>=':     function(l, r) {return l >= r; },

            typeof: function(l, r) {return typeof l === r; }
        };

        if (!operators[operator]) {
            throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
        }

        var result = operators[operator](left, right);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    /**
     * Format money using thousand separator
     * @param money
     * @returns {*}
     */
    formatMoney: function(money) {
        return numeral(money).format('0,0');
    },

    /**
     * Get attributes from a bookshelf model
     *
     * @param data
     * @param attribute
     * @return {*}
     */
    get: function(data, attribute) {
        var value = [];

        data.forEach(item => {
            if (item.hasOwnProperty(attribute)) {
                value.push(item[attribute]);
            }
        });

        return value.join(', ');
    },

    /**
     * Capitalize a text
     *
     * @param text
     * @return {*}
     */
    capitalize: function(text) {
        if (text && typeof text == 'string') {
            return text.toUpperCase();
        } else {
            return '';
        }
    },

    printMessages: function(messages) {
        return messages();
    },

    time: function(dateString) {
       return (new Date(dateString).getHours()+'H'+new Date(dateString).getMinutes());
    }
};

//check if code is called from the browser
if (typeof process === 'undefined') {

    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            Handlebars.registerHelper(helper, helpers[helper]);
        }
    }

} else {
    module.exports = helpers;
}