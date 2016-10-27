angular.module('todoApp')
.config(function($mdThemingProvider) {

  var forestGreenMap = $mdThemingProvider.extendPalette('green', {
    '500': '#adff2f'//, //  darkgreen: #006400 forestgreen: #228b22 limegreen: #adff2f
    //'contrastDefaultColor': '#ffd700'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('forestGreen', forestGreenMap);


  $mdThemingProvider.theme('default')
    .primaryPalette('forestGreen')  //indigo
    .accentPalette('orange') //pink
    .warnPalette("red")             //red
    .backgroundPalette("grey")
    .dark();     //grey
});