Ember.EventDispatcher.reopen({
  events: {
    // touchstart  : 'touchStart',
    // touchmove   : 'touchMove',
    // touchend    : 'touchEnd',
    // touchcancel : 'touchCancel',
    keydown     : 'keyDown',
    keyup       : 'keyUp',
    keypress    : 'keyPress',
    mousedown   : 'mouseDown',
    mouseup     : 'mouseUp',
    contextmenu : 'contextMenu',
    click       : 'click',
    dblclick    : 'doubleClick',
    // mousemove   : 'mouseMove',
    focusin     : 'focusIn',
    focusout    : 'focusOut',
    // mouseenter  : 'mouseEnter',
    // mouseleave  : 'mouseLeave',
    submit      : 'submit',
    input       : 'input',
    change      : 'change',
    // dragstart   : 'dragStart',
    // drag        : 'drag',
    // dragenter   : 'dragEnter',
    // dragleave   : 'dragLeave',
    // dragover    : 'dragOver',
    drop        : 'drop',
    // dragend     : 'dragEnd'
  }
});

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

Ember.Route.reopen({
  model: function() {
    return this.store.find('image');
  }
});

App.ApplicationRoute = Ember.Route.extend({
  activate: function() {
    FastClick.attach(document.body)
  }
});

App.ApplicationController = Ember.Controller.extend({
  showButtons: true,
  freezeCarousel: false,
});

App.IndexController =
App.InfiniteController =
App.AutoslideController = Ember.ObjectController.extend({
  needs: ['application']
});
