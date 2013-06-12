var GitStruct = require('../app.js');
var assert = require('assert');
var fs = require('fs');
var parsedData = require('./test.json');

describe('Tree structure', function() {
    
    var tree;

    beforeEach(function() {
        tree = GitStruct.fileTree(parsedData);
    });

    it('Should map a base file', function() {

        assert.equal(true, tree.c['package.json'].file);
        assert.equal(true, tree.c['bower-installer.js'].file);

        assert.equal(7, tree.c['bower-installer.js'].changes);
        assert.equal(17, tree.c['package.json'].changes);
    });

    it('Should create backwards references', function() {
        assert.equal(true, tree.c['package.json'].parent.c['package.json'].file);
        assert.equal(true, tree.c.test.c.full.c['component.json'].parent.parent.parent.c['package.json'].file);
    });

    it('Should map a base directory', function() {
        assert.equal(false, tree.c.test.file);
        assert.equal(undefined, tree.c.test.changes);
    });

    it('Should map a subdirectory', function() {
        assert.equal(false, tree.c.test.c.full.file);
        assert.equal(false, tree.c.test.c.multiPath.file);
        assert.equal(false, tree.c.test.c.basic.file);
        assert.equal(undefined, tree.c.test.c.basic.changes);
    });

    it('Should map a file in a sub directory', function() {
        assert.equal(true, tree.c.test.c.full.c['component.json'].file);
        assert.equal(1, tree.c.test.c.full.c['component.json'].changes);
    });

    it('Should preserve deletions', function() {

        tree = GitStruct.fileTree(parsedData, {preserveDeletions: true});

        assert.equal(true, tree.c['node_modules'].c.lodash.c['README.md'].deleted);
        assert.equal(true, tree.c['node_modules'].c.lodash.c.test.c.template.c['b.jst'].deleted);
    });

    it('Should remove deleted files from the tree structure', function() {
        assert.equal(undefined, tree.c['component.json']);
    });

    it('Should remove empty directories from the tree structure', function() {
        assert.equal(undefined, tree.c['node_modules']);
    });
});
