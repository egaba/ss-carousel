App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.route('infinite');
  this.route('autoslide');
});

App.Image = DS.Model.extend({
  src: DS.attr('string')
});

App.Image.FIXTURES = [
  {
    id: 1,
    src: 'http://assets.soysaucejs.com.s3.amazonaws.com/tutorial-assets/carousel/carousel-example-1.jpg'
  },
  {
    id: 2,
    src: 'http://assets.soysaucejs.com.s3.amazonaws.com/tutorial-assets/carousel/carousel-example-2.jpg'
  },
  {
    id: 3,
    src: 'http://assets.soysaucejs.com.s3.amazonaws.com/tutorial-assets/carousel/carousel-example-3.jpg'
  },
  {
    id: 4,
    src: 'http://assets.soysaucejs.com.s3.amazonaws.com/tutorial-assets/carousel/carousel-example-4.jpg'
  }
];

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('image');
  }
});

App.ApplicationController = Ember.Controller.extend({
  showButtons: true,
  showDots: true
});

App.AutoslideController = App.IndexController = App.InfiniteController = Ember.ObjectController.extend({
  needs: ['application']
});
