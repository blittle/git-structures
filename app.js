var _ = require('lodash');

var GitStruct = {};

var actions = {
    "A": function addFile(path, map) {
        var folders = path.split('/');
        
        _.each(folders, function(f, i) {
            var isFile = (i === folders.length-1);

            if(!map.c[f]) {
                map.c[f] = {
                    file: isFile
                }
            } 

            if(!isFile) {
                map = map.c[f];
                if(!map.c) map.c = {};
            } else {
                map.changes = 1;
            }
            
        });
    },
    "M": function modifyFile(path, map) {
        var folders = path.split('/'); 

        _.each(folders, function(f, i) {
            console.log(map, f);
            map = map.c[f]
        });

        map.changes++;
    },
    "D": function removeFile(path, map) {

    }
}

GitStruct.fileTree = function(data) {
    var mappedFiles = {c: {}};

    // The parsed data comes in with newest commits
    // first, we want to build a tree structure based
    // upon the actual order of commits
    for(var i=data.length-1; i >= 0; i--) {
        _.each(data[i].files, function(file) {
            actions[file.type](file.path, mappedFiles);                        
        });
    }
    return mappedFiles;
}


module.exports = GitStruct;
