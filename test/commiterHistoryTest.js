var GitStruct = require('../app.js');
var assert = require('assert');
var parsedData = require('./test.json');
var _ = require('lodash');

describe('Commiter History', function() {
        
    var commiters;

    describe('Commiter Totals', function() {

        beforeEach(function() {
            commiters = GitStruct.commiterHistory.totals(parsedData);
        });

        it("Should return the amount of commiters that have ever contributed to the library", function() {
            assert.equal(3, _.size(commiters));    
        });

        it("Should return correct counts for each commiter", function() {
            assert.equal(31, commiters["Bret Little"].commits);
            assert.equal(1, commiters["Patrick Mulder"].commits);
            assert.equal(2, commiters["mitermayer reis"].commits);
        });

        it("Should return an array of values when the option is set", function() {
            commiters = GitStruct.commiterHistory.totals(parsedData, {toArray: true});    
            assert.equal(3, commiters.length);
            assert.equal("Bret Little", commiters[0].name);
            assert.equal(31, commiters[0].commits);
        });
    });

    describe('Commiter Time History', function() {
        var commits; 

        beforeEach(function() {
            commits = GitStruct.commiterHistory.history(parsedData);
        });

    
        it("Should return a history array for each commiter", function() {
            assert.equal(31, commits['Bret Little'].length);
            assert.equal(1, commits['Patrick Mulder'].length);
            assert.equal(2, commits['mitermayer reis'].length);
        });

        it("Should populate counts", function() {
            assert.equal(2, commits['Bret Little'][0].count);
            assert.equal(1, commits['Bret Little'][1].count);
            assert.equal(0, commits['Bret Little'][2].count);
        });
    });
    
});
