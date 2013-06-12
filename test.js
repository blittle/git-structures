var GitStruct = require('./app.js');
var assert = require('assert');
var fs = require('fs');
var parsedData = require('./test.json');

describe('Git Structures', function() {
    describe('Tree structure', function() {
        
        var tree;

        beforeEach(function() {
            tree = GitStruct.fileTree(parsedData);
        });

        it('Should map a base file', function() {
            assert.equal(true, tree.c['package.json'].file);
            assert.equal(true, tree.c['bower-installer.js'].file);
        });

        it('Should map a base directory', function() {
            assert.equal(false, tree.c.test.file);
        });

        it('Should map a subdirectory', function() {
            assert.equal(false, tree.c.test.c.full.file);
            assert.equal(false, tree.c.test.c.multiPath.file);
            assert.equal(false, tree.c.test.c.basic.file);
        });

        it('Should map a file in a sub directory', function() {
            assert.equal(true, tree.c.test.c.full.c['component.json'].file);
        });
    });
});
