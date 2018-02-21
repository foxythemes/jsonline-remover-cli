#!/usr/bin/env node

"use strict";

// Include native libs
const fs = require( 'fs' );

// Include extrernal libs
const commandLineArgs = require( 'command-line-args' );

// Declare CLI options
const optionDefinitions = [
  { name: 'src', alias: 's', type: String },
  { name: 'file', alias: 'f', type: String },
  { name: 'pattern', alias: 'p', type: String }
];

// CLI arguments lib
const options = commandLineArgs( optionDefinitions, { partial: true } );
var filepath = './' + options.src + options.file;
var lines;
var outputLines = [];
var output = "";

// Validate that pattern is an Regular Expression
if(!options.pattern instanceof RegExp) {
  console.log("Value passed in was not RegExp Type. Creating New RegExp with String Passed In.");
  options.pattern = new RegExp(options.pattern);
}

// Match pattern in each line
var evaluatePattern = function(line, outputLines) {
  if ( !line.match( options.pattern ) ) {
  	// @todo : Fix remaining comma when removing last object element
    outputLines.push( line );
  }
};  

// Validate that path and file exist
if( !fs.existsSync( filepath ) ) {
  console.log( ' ' + filepath + ' not found.' );
} else {
	// Read file
  fs.readFile( filepath, 'utf8', (err, data) => {
	  if (err) throw err;

	  // Read each line of file
  	lines = data.split('\n');
  	lines.forEach( function( line ) {
			evaluatePattern(line, outputLines);  		
  	});

  	if( outputLines < 1 ){
  		console.log( ' ' + options.file + ' Destination not written because no lines were remaining.' );
  	} else {
  		output = outputLines.join('\n');

  		// Write Json Updated
  		fs.writeFile( options.src + options.file, JSON.stringify( JSON.parse(output), null, 2 ), function( err ) {
			  if( err ) return console.log( err );
			  console.log( ' ' + options.pattern + ' was removed in ' + options.src + options.file );
			});
  	}
	});
}