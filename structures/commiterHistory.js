var _ = require('lodash');

var commitTotals = function(data, options) {
    var commiters = {};

    options = options || {};

    _.each(data, function(commit) {

        var commitPoint = commiters[commit.author.name];

        if(!commitPoint) {
            commiters[commit.author.name] = {
                commits: 1
            }
        } else {
            commitPoint.commits++;
        }
    });

    if(options.toArray) {
       return _.map(commiters, function(val, key) {
            return {
                name: key,
                commits: val.commits
            }
       });
    }

    return commiters
};

var allCommitsHistory = function(data, options) {
    var commiters = {

    };

    _.each(data, function(commit) {
        var commiter = commiters[commit.author.name];
        if(!commiter) {
            commiters[commit.author.name] = [{
                date: commit.date,
                count: commit.files.length
            }];
        } else {
            commiter.push({
                date: commit.date,
                count: commit.files.length
            });
        }

    });

    return commiters;
};

exports.totals = commitTotals;
exports.history = allCommitsHistory;
