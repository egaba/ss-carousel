import { Application } from 'ember';

var module = requirejs(['carousel-widget']);

Application.initializer({
  name: 'ss-carousel',
  initialize: function() {
    var module = requirejs(['carousel-widget']);

    // Uses loader
    if (module.default) {
      Ember.Handlebars.registerHelper('ss-carousel', function(options) {
        return Ember.Handlebars.helpers.view.call(this, module.default, options);
      });
    }
    else {
      requirejs(['carousel-widget'], function(module) {
        Ember.Handlebars.registerHelper('ss-carousel', function(options) {
          return Ember.Handlebars.helpers.view.call(this, module.default, options);
        });
      });
    }
  }
});
