var _ = require('lodash');
var fileTree = require('./structures/fileTree.js');
var commiterHistory = require('./structures/commiterHistory.js');

var GitStruct = {
    fileTree: fileTree,
    commiterHistory: commiterHistory
};

module.exports = GitStruct;
