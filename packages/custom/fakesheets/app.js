'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Fakesheets = new Module('fakesheets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Fakesheets.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Fakesheets.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Fakesheets.menus.add({
    title: 'fakesheets example page',
    link: 'fakesheets example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Fakesheets.aggregateAsset('css', 'fakesheets.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Fakesheets.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Fakesheets.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Fakesheets.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Fakesheets;
});
