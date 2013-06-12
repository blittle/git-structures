var _ = require('lodash');

var actions = {
    "A": function addFile(path, map) {
        var folders = path.split('/');
        
        _.each(folders, function(f, i) {
            var isFile = (i === folders.length-1);

            if(!map.c[f]) {
                map.c[f] = {
                    file: isFile,
                    parent: map,
                    name: f
                }
            } 

            if(!isFile) {
                map = map.c[f];
                if(!map.c) map.c = {};
            } else {
                map.c[f].changes = 1;
                if(map.deleted) delete map.c[f].deleted;
            }
            
        });
    },
    "M": function modifyFile(path, map) {
        var folders = path.split('/'); 

        _.each(folders, function(f, i) {
            map = map.c[f]
        });
        map.changes = map.changes + 1;
    },
    "D": function removeFile(path, map, options) {
        var folders = path.split('/');

        _.each(folders, function(f) {
            map = map.c[f]; 
        });

        if(options.preserveDeletions) {
            map.deleted = true;
        } else {

            delete map.parent.c[map.name];
            map = map.parent;

            while(map && map.parent && _.isEmpty(map.c)) {
                delete map.parent.c[map.name];
                map = map.parent;
            }  
        }
    }
}

fileTree = function(data, options) {
    var mappedFiles = {c: {}};

    options = options || {};

    // The parsed data comes in with newest commits
    // first, we want to build a tree structure based
    // upon the actual order of commits
    for(var i=data.length-1; i >= 0; i--) {
        _.each(data[i].files, function(file) {
            actions[file.type](file.path, mappedFiles, options);                        
        });
    }
    return mappedFiles;
}

module.exports = fileTree;
