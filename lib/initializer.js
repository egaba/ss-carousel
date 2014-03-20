import { Application } from 'ember';

var Carousel = requirejs(['carousel-widget']).default;

Application.initializer({
  name: 'ss-carousel',
  initialize: function() {
    Ember.Handlebars.registerHelper('ss-carousel', function(options) {
      return Ember.Handlebars.helpers.view.call(this, Carousel, options);
    });
  }
});
