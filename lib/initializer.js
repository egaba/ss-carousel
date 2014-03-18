import { Application } from 'ember';

var Carousel = requirejs(['carousel-widget']).default;

Application.initializer({
  name: 'ss-carousel',
  initialize: function(container) {
    container.register('component:ss-carousel', Carousel);
  }
});
