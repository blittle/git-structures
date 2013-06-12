var _ = require('lodash');

var PathElement = function(isFile) {
    this.isFile = isFile;
    if(!isFile) this.children = {};
};


Folder.prototype = {
    addChild: function(child) {
       this 
    }
};

module.exports = Folder;
