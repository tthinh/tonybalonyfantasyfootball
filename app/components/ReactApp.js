/** @jsx React.DOM */

var React = require('react/addons');
var Promise = require('promise');
/* create factory with griddle component */
var Griddle = React.createFactory(require('griddle-react'));

var ffs = require('../server/fantasyfootball-service.js');
var columnMeta = require('../data/columnMeta.js').columnMeta;
var resultsPerPage = 200;
var fakeData;
ffs.findplayer("SD").then(function(res){
    fakeData= res;
    console.log(fakeData);
});
var ReactApp = React.createClass({

      componentDidMount: function () {
        console.log(fakeData);

      },
      render: function () {
        return (
          <div id="table-area">

              <Griddle results={fakeData}
                       columnMetadata={columnMeta}
                       resultsPerPage={resultsPerPage}
                       tableClassName="table"/>

          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;