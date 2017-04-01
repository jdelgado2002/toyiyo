## Documentation
http://bit.ly/ion2fullapp-with-functionalities-documentation

# Workflow
##To run your app in the browser (great for initial development):
`npm install`
`ionic serve`

##To run on iOS:
`ionic run ios`

##To run on Android:
`ionic run android`

# fix the google map error
Install the TypeScript Definition Manager CLI151 using npm... 
`npm install typings --global`

Then use your CLI to navigate into your Ionic 2 project's folder

And finally, install the google map definition files using the typings CLI... 
`typings install dt~google.maps --global`

##Review ionic CHANGELOG when updating ionic-angular version
https://github.com/driftyco/ionic/blob/master/CHANGELOG.md

# Configs
## Cordova (uses config.xml)
### [Mass saving platforms on an existing project](http://cordova.apache.org/docs/en/latest/platform_plugin_versioning_ref/index.html#mass-saving-platforms-on-an-existing-project)
`cordova platform save`
Use it when you have a pre-existing project and you want to save all the currently added platforms in your project.

## Ionic (uses package.json)
### [Clean and install](https://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature/)
`ionic state reset`
This will remove everything then bring back what you have specified in the package.json file.

### [Store current state](https://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature/)
`ionic state save`
To store the current platforms and plugins to the package.json

### [Restore current state](https://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature/)
`ionic state restore`
This will add in the appropriate plugins and platforms from the package.json
