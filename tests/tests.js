// TODO: use ember-qunit's moduleFor
var carousel;

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

setResolver(Ember.DefaultResolver.create({
  namespace: App
}));

module('Integration Tests', {
  setup: function() {
    App.reset();
  }
});

test('Basic Carousel renders', function() {
  visit('/').then(function() {
    var $carousel = $('.ss-carousel');

    strictEqual($carousel.length, 1, 'Carousel found');
    strictEqual($carousel.find('.ss-carousel-container').length, 1, 'Carousel container found');
    strictEqual($carousel.find('.ss-carousel-item').length, 4, 'Carousel items found');
  });
});

test('Infinite Carousel renders', function() {
  visit('/infinite').then(function() {
    var $carousel = $('.ss-carousel');

    strictEqual($carousel.length, 1, 'Carousel found');
    strictEqual($carousel.find('.ss-carousel-container').length, 1, 'Carousel container found');
    strictEqual($carousel.find('.ss-carousel-item').length, 6, 'Carousel items found');
  });
});

module('Unit Tests - Basic Carousel', {
  setup: function() {
    App.reset();
  }
});

test('Carousel properly initializes', function() {
  visit('/').then(function() {
    carousel = getCarousel();

    strictEqual(carousel.get('index'), 0, 'Initialized with index 0');
    strictEqual(carousel.$('.ss-carousel-item').length, 4, 'Initialized with 4 items');
    ok(carousel.$('.ss-carousel-item').first().hasClass('active'), 'active class found on first item');
  });
});

module('Unit Tests - Infinite Carousel', {
  setup: function() {
    App.reset();
  }
});

test('Carousel properly initializes', function() {
  visit('/infinite').then(function() {
    carousel = getCarousel();

    strictEqual(carousel.get('index'), 1, 'Initialized with index 1');
    strictEqual(carousel.$('.ss-carousel-item').length, 6, 'Initialized with 6 items');
    ok(carousel.$('.ss-carousel-item:nth-of-type(2)').hasClass('active'), 'active class found on correct item');
  });
});
