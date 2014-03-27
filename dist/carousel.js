Ember.TEMPLATES["carousel-widget"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "ItemContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n  ");
  stack1 = helpers['if'].call(depth0, "showDotIndicators", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  stack1 = helpers['if'].call(depth0, "showButtons", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "DotContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ss-carousel-btn :ss-carousel-next nextBtnDisabled:disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "slideNext", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n      <div class=\"ss-carousel-btn-icon\"></div>\n    </div>\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ss-carousel-btn :ss-carousel-prev prevBtnDisabled:disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "slidePrev", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n      <div class=\"ss-carousel-btn-icon\"></div>\n    </div>\n  ");
  return buffer;
  }

  stack1 = helpers['with'].call(depth0, "view", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
define("carousel-item", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /**
     * The CarouselItem is a sub-view of the Carousel which binds its active class
     * to the Carousel's current index. The template that the CarouselItem uses first looks for a yielded template.
     * If no yielded template is found, it will look for the template defined in the `itemTemplateName` property.
     *
     * @class CarouselItem
     * @extends Ember.View
     * @requires Carousel
    **/
    var CarouselItem = Ember.View.extend({
      tagName: 'div',

      classNames: ['ss-carousel-item'],

      classNameBindings: ['isActive:active', 'isLoaded:loaded'],

      attributeBindings: ['style'],

      /**
       * This is the index of this particular item in the ItemContainer array.
       *
       * @property {Integer} index
       * @default 0
      **/
      index: 0, // TODO: change this to carousel's index - cloneDepth

      /**
       * This checks against the Carousel's current index to see if this item is active.
       *
       * @property {Boolean} isActive
      **/
      isActive: function() {
        return this.get('index') === this.get('carousel.index');
      }.property('carousel.index'),

      /**
       * This adjusts the item's width to the Carousel's `itemWidth` property.
       *
       * @method adjustItemWidth
      **/
      adjustItemWidth: function() {
        this.set('style', 'width: ' + this.get('carousel.itemWidth') + 'px;');
      }.observes('carousel.itemWidth').on('willInsertElement')
    });

    __exports__["default"] = CarouselItem;
  });
define("carousel-widget", 
  ["touch-mixin","carousel-item","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var TouchMixin = __dependency1__["default"];
    var CarouselItem = __dependency2__["default"];

    var TRANSITION_END = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

    var VENDOR_PREFIX = (function() {
      var userAgent = window.navigator.userAgent;

      if (/webkit/i.test(userAgent)) {
        return '-webkit-';
      }
      else if (/windows\sphone|msie/i.test(userAgent)) {
        return '-ms-';
      }
      else if (/^mozilla/i.test(userAgent)) {
        return '-moz-';
      }
      else if (/opera/i.test(userAgent)) {
        return '-o-';
      }

      return '';
    })();

    /**
     * The Carousel is an Ember view that can be used either as an image slider
     * or product display. This component is based heavily off of the [Soysauce Carousel](http://www.soysaucejs.com/#!/api/carousel/intro),
     * and implements many of its features.
     *
     * #### Creating a basic Carousel
     * A basic Carousel is a simple image slider, does not re-loop, and is swipeable.
     * An item template can be specified one of two ways:
     *
     * 1) Through the `itemTemplateName` property:
     *
     * ```
     * {{ss-carousel items=products itemTemplateName="partials/product-item"}}
     * ```
     *
     * 2) Using an inline template:
     *
     * ```
     * {{#ss-carousel items=images}}
     *   <img class='my-image' {{bind-attr src=1x alt=alt}}>
     * {{/ss-carousel}}
     * ```
     *
     * #### Creating an infinite Carousel
     * An infinite Carousel re-loops its indicies when it reaches a boundary (either min or max index). It allows the user
     * to flawlessly progress from the last index to the first index, and vice versa, without
     * noticing a jump. It can be invoked through specifying the `isInfinite` property:
     *
     * ```
     * {{ss-carousel
     *   items=images
     *   itemTemplateName="partials/images"
     *   isInfinite=true}}
     * ```
     *
     * ## Visual Displays
     *
     * The Carousel comes equipped with visual accessories, such as dot indicators and buttons.
     * The following properties can be enabled in order to show the accessory:
     *
     * * `showButtons`
     * * `showDotIndicators`
     * * `showZoomIcon` // TBI
     *
     * For example, in order to show dots and buttons, you would specify:
     * ```
     * {{ss-carousel
     *   items=images
     *   itemTemplateName="partials/images"
     *   showButtons=true
     *   showDotIndicators=true}}
     * ```
     *
     * @class Carousel
     * @extends Ember.View
     * @uses Ember.Freezable
     * @uses TouchMixin
     */
    var Carousel = Ember.Component.extend(Ember.Freezable, TouchMixin, {
      tagName: 'div',

      classNames: ['ss-carousel'],

      classNameBindings: [
        'showZoomIcon:with-zoom-icon',
        'showDotIndicators:with-dots',
        'showButtons:with-buttons',
        'noTransition:no-transition'
      ],

      layout: Ember.TEMPLATES['carousel-widget'], // TODO: Use AMD import

      /**
       * The Carousel revolves around the `content` property (get it?). The Carousel's container width,
       * active item classes, active dot classes, and many other properties are dependent on this.
       *
       * This is the context in which the Carousel creates and initializes its items. This
       * is the only required property; however, unless you're only creating an image carousel,
       * an `itemTemplateName` should also be provided.
       *
       * It's recommended to create a context array within the controller that the Carousel will be used,
       * whether it's the application controller for a global banner Carousel, or the product controller
       * for an image Carousel.
       *
       * Any changes to the upstream property to which `content` is bound will cause the Carousel
       * to adjust accordingly.
       *
       * @property {Array} content
       * @required
      **/
      content: Ember.required(),

      /**
       * This property defines the template in which to use for the CarouselItems. The context that this template
       * uses is defined in the required `content` property that is passed to the Carousel. This property will not
       * be used if a yielded template is found.
       *
       * @property {String} itemTemplateName
      **/
      itemTemplateName: null,

      /**
       * This is the number of clones to create for the Carousel. In order for a
       * Carousel to loop-around, this value must be greater than 0.
       *
       * @property {Integer} cloneDepth
       * @readOnly
      **/
      cloneDepth: function() {
        if (this.get('isInfinite') && this.get('hasMultipleItems')) {
          return 1; // TODO: later calculate a higher clone depth depending on peek or multiple items
        }
        return 0;
      }.property().readOnly(),

      /**
       * Gestures to register with the Carousel; used by the TouchMixin
       *
       * @property {Array} gestures
       * @required
      **/
      gestures: ['tap', 'doubletap'],

      /**
       * These are the gestures used for swiping the Carousel. These gestures will only be
       * registered if the container `isSwipeable` and `hasMultipleItems`.
       *
       * @property {Array} swipeGestures
      **/
      swipeGestures: ['touch', 'drag', 'release', 'swipe'],

      /**
       * If a positive `cloneDepth` is provided, the Carousel will switch to an
       * "infinite" mode, where the Carousel does not end.
       *
       * @property {Boolean} isInfinite
       * @default false
      **/
      isInfinite: false,

      /**
       * This property determines whether the Carousel should be swipeable or finite.
       *
       * @property {Boolean} hasSingleItem
       * @readOnly
      **/
      hasMultipleItems: Ember.computed.gt('items.length', 1).readOnly(),

      /**
       * This property allows the user to transition indicies through touch events.
       * This property is automatically disabled if there is only one image.
       *
       * @property {Boolean} isSwipeable
       * @default `hasMultipleItems`
      **/
      isSwipeable: Ember.computed.defaultTo('hasMultipleItems'),

      /**
       * Enables the Carousel to automatically progress through its items.
       *
       * @property {Boolean} isAutoslide
       * @default false
      **/
      isAutoslide: false,

      /**
       * When `true`, zoom icons will be displayed over the image indicating
       * that the image can be zoomed in and out.
       *
       * @property {Boolean} showZoomIcon
       * @default false
      **/
      showZoomIcon: false, // TBI

      /**
       * When `true`, dots will be displayed over the image indicating the
       * current position in the carousel's image set.
       *
       * @property {Boolean} showDotIndicators
       * @default false
      **/
      showDotIndicators: false,

      /**
       * When `true`, buttons will be enabled on the carousel, which when clicked,
       * send actions to the v to slide to the next/prev item.
       *
       * @property {Boolean} showButtons
       * @default false
      **/
      showButtons: false,

      /**
       * Disables the "prev" button if conditions are met.
       *
       * @property {Boolean} prevBtnDisabled
       * @readOnly
      **/
      prevBtnDisabled: function() {
       return !this.get('isInfinite') && this.get('index') === this.get('minIndex');
      }.property('index').readOnly(),

      /**
       * Disables the "next" button if conditions are met.
       *
       * @property {Boolean} nextBtnDisabled
       * @readOnly
      **/
      nextBtnDisabled:function() {
        return !this.get('isInfinite') && this.get('index') === this.get('maxIndex');
       }.property('index').readOnly(),

      /**
       * When `true`, this removes CSS transitions from the Carousel.
       *
       * @property {Boolean} noTransition
       * @default true
      **/
      noTransition: true,

      /**
       * The minimum distance that the user can drag an item before it triggers an
       * index transition.
       *
       * @property {Integer} minDragTransitionDistance
       * @default 60
      **/
      minDragTransitionDistance: 60,

      /**
       * This zero-based integer is the index of the current active CarouselItem in the
       * ItemContainer array.
       *
       * @property {Integer} index
       * @default `minIndex`
      **/
      index: Ember.computed.defaultTo('minIndex'),

      /**
       * This is the minimum index that the Carousel can transition to. This value
       * increases with the number of clones.
       *
       * @property {Integer} minIndex
       * @readOnly
      **/
      minIndex: function() {
        return this.get('cloneDepth');
      }.property('items.@each').readOnly(),

      /**
       * This is the maximum index that the Carousel can transition to. This value
       * increases with the number of CarouselItems.
       *
       * @property {Integer} maxIndex
       * @readOnly
      **/
      maxIndex: function() {
        return this.get('items.length') + this.get('cloneDepth') - 1;
      }.property('items.@each').readOnly(),

      /**
       * This is the width of a single CarouselItem in the ItemContainer
       *
       * @property {Integer|null} itemWidth
      **/
      itemWidth: null,

      /**
       * This function resets the Carousel to its original state. This function should
       * be extended to reset properties of newly added features. This should represent
       * reset the initial state of the Carousel (ex. unzoomed, first index, etc.).
       *
       * @method reset
      **/
      reset: function() {
        this.set('index', this.get('cloneDepth'));
      }.observes('items.@each'),

      /**
       * Calculates the width of the CarouselItems. This method will need to be adjusted as new features are
       * added, such as item peek and multiple items.
       *
       * @method setupItemWidth
      **/
      setupItemWidth: function() {
        this.set('itemWidth', this.$().innerWidth());
      }.on('didInsertElement'),

      /**
       * The auto-slide interval in which the Carousel waits to change its index.
       *
       * @property {Integer} autoslideInterval
       * @default 5000
      **/
      autoslideInterval: 5000,

      /**
       * If auto-slide is enabled, this queues the `slideNext` function on the interval
       * given by `autoslideInterval`.
       *
       * @method enableAutoslide
      **/
      enableAutoslide: function() {
        if (this.get('isAutoslide')) {
          this.set('_isAutoslideTimerActive', true);
        }
      },

      /**
       * Cancels the auto-slide timer.
       *
       * @method disableAutoslide
      **/
      disableAutoslide: function() {
        if (this.get('isAutoslide')) {
          this.set('_isAutoslideTimerActive', false);
        }
      },

      _autoslideTimer: null,

      _isAutoslideTimerActive: Ember.computed.defaultTo('isAutoslide'),

      _setAutoslideTimer: function() {
        Ember.run.cancel(this.get('_autoslideTimer'));

        if (this.get('_isAutoslideTimerActive')) {
          this.set('_autoslideTimer', Ember.run.later(this, this.slideNext, this.get('autoslideInterval')));
        }
      },

      _startAutoslideTimer: function() {
        Ember.run.once(this, this._setAutoslideTimer);
      }.observes('_isAutoslideTimerActive', 'index').on('didInsertElement'),

      /**
       * The CarouselItem is a sub-component of the Carousel which binds its active class
       * to the Carousel's current index. The template that the CarouselItem uses first looks for a yielded template.
       * If no yielded template is found, it will look for the template defined in the `itemTemplateName` property.
       *
       * @class CarouselItem
       * @extends Ember.View
       * @requires Carousel
      **/
      CarouselItem: Ember.computed(function() {
        var layout =  this.get('template')
                      || this.templateForName(this.get('itemTemplateName'));

        return CarouselItem.extend({
          carousel: this,
          layout: layout
        });
      }),

      /**
       * The CarouselDot is a sub-component of the Carousel. Like the CarouselItem, it binds its
       * active class to the Carousel's current index.
       *
       * @class CarouselDot
       * @extends Ember.View
       * @requires Carousel
      **/
      CarouselDot: Ember.computed(function() {
        return Ember.View.extend({
          carousel: this,

          tagName: 'div',

          classNames: ['ss-carousel-dot'],

          classNameBindings: ['isActive:active'],

          /**
           * This is the index of this particular dot in the DotContainer array.
           *
           * @property {Integer} index
          **/
          index: 0,

          /**
           * This checks against the Carousel's current index to see if this dot is active.
           *
           * @property {Boolean} isActive
          **/
          isActive: function() {
            return this.get('index') === this.get('carousel.index');
          }.property('carousel.index'),

          /**
           * Attaches FastClick listeners to the dots, if FastClick is available.
           *
           * @method attachFastclickListeners
          **/
          attachFastclickListeners: function() {
            var fastclick = window.FastClick;

            if (typeof fastclick !== 'undefined') {
              this.get('carousel._fastclickListeners').push(fastclick.attach(this.$()[0]));
            }
          }.on('didInsertElement'),

          /**
           * Transitions the Carousel to the index of the clicked dot.
           *
           * @event click
          **/
          click: function() {
            var carousel = this.get('carousel');

            if (!carousel.get('isFrozen')) {
              carousel.jumpTo(this.get('index'));
            }

            return false;
          }
        });
      }),

      /**
       * The ItemContainer holds the Carousel's CarouselItems. This container is set
       * up in the `setupContainerItems` method. This container is modified and based
       * on the required `content` property.
       *
       * @class ItemContainer
       * @extends Ember.ContainerView
       * @requires Carousel
      **/
      ItemContainer: Ember.computed(function() {
        return Ember.ContainerView.createWithMixins({
          carousel: this,

          classNames: ['ss-carousel-container'],

          /**
           * This property is the `x` offset of the container.
           *
           * @property {Integer} containerOffset
           * @readOnly
          **/
          containerOffset: function() {
            return this.get('carousel.index') * this.get('carousel.itemWidth') * -1;
          }.property('carousel.index', 'carousel.itemWidth').readOnly(),

          /**
           * This is a heavily accessed property is very sensitive to read access time. This
           * property gets cached when the ItemContainer is inserted into the DOM.
           *
           * @property {Element} _containerStyle
          **/
          _containerStyle: null,

          /**
           * Caches the container style declaration into a variable for faster access.
           *
           * @method setupContainer
          **/
          setupContainer: function() {
            this.set('_containerStyle', this.$()[0].style);
          }.on('didInsertElement'),

          /**
           * Adjusts the ItemContainer's offset. Should there be any need to adjust the container's style, such as
           * using a different CSS property (ex. `matrix` or `left`), this is where it should be changed. The
           * ItemContainer's offset is automatically adjusted as items are added/removed, or if the Carousel is resized.
           *
           * @method adjustContainerStyle
          **/
          adjustContainerStyle: function() {
            var containerOffset = this.get('containerOffset');

            Ember.run.schedule('render', this._containerStyle || this.$()[0].style, function() {
              this.webkitTransform =
              this.msTransform =
              this.OTransform =
              this.MozTransform =
              this.transform = 'translate3d(' + containerOffset + 'px, 0, 0)';
            });

          }.observes('carousel.items.@each', 'containerOffset'),

          /**
           * Calculates the ItemContainer's width which depends on the `itemWidth` and number of
           * CarouselItems in the array.
           *
           * @method adjustContainerWidth
          **/
          adjustContainerWidth: function() {
            var containerWidth;

            containerWidth = this.get('carousel.itemWidth') * (this.get('carousel.items.length') + this.get('carousel.cloneDepth') * 2);

            Ember.run.schedule('render', this._containerStyle || this.$()[0].style, function() {
              this.width = containerWidth + 'px';
            });

          }.observes('carousel.items.@each', 'carousel.itemWidth'),

          _registerListeners: function() {
            var carousel = this.get('carousel');

            this.$().on(TRANSITION_END, function() {
              carousel.set('noTransition', true);
            });
          },

          _teardownListeners: function() {
            this.$().off(TRANSITION_END);
          }
        });
      }),

      /**
       * The DotContainer holds the Carousel's CarouselDots.
       *
       * @class DotContainer
       * @extends Ember.ContainerView
      **/
      DotContainer: Ember.computed(function() {
        return Ember.ContainerView.create({
          carousel: this,
          classNames: ['ss-carousel-dots']
        });
      }),

      /**
       * This initializes the Carousel by pushing CarouselItems into
       * the ItemContainer. The CarouselItems are based on the `content`
       * and `cloneDepth`.
       *
       * In addition, this also creates the dots if `showDotIndicators` is
       * set to `true`.
       *
       * This watches the `content` property and will automatically adjust
       * the Carousel as content items are added/removed.
       *
       * @method setupContainerItems
      **/
      setupContainerItems: function() {
        var itemContainer = this.get('ItemContainer');
        var cloneDepth = this.get('cloneDepth');
        var item = this.get('CarouselItem');
        var dot = this.get('CarouselDot');
        var dotContainer = this.get('DotContainer');
        var showDots = this.get('showDotIndicators');
        var items = this.get('items');

        // Clear containers
        // TODO: optimize this to only remove/add items where needed
        itemContainer.removeAllChildren();
        dotContainer.removeAllChildren();

        // Create items and dots and push into containers
        items.forEach(function(context, index) {
          itemContainer.pushObject(item.create({
            context: context,
            index: index + cloneDepth
          }));

          if (showDots) {
            dotContainer.pushObject(dot.create({
              index: index + cloneDepth
            }));
          }
        });

        // Create clones and push into item container
        if (this.get('isInfinite') && this.get('hasMultipleItems')) {
          var contentLength = items.get('length');
          var lastIndex = contentLength - 1;
          var prependedClones = items.slice(contentLength - cloneDepth, contentLength);
          var appendedClones = items.slice(0, cloneDepth);
          var _viewBuffer = [];

          prependedClones.forEach(function(context, index) {
            _viewBuffer.pushObject(item.create({
              context: context,
              index: index + contentLength
            }));
          });

          itemContainer.unshiftObjects(_viewBuffer);
          _viewBuffer.clear();

          appendedClones.forEach(function(context, index) {
            _viewBuffer.pushObject(item.create({
              context: context,
              index: index + cloneDepth
            }));
          });

          itemContainer.pushObjects(_viewBuffer);
        }

      }.observes('items.@each').on('didInsertElement'),

      /**
       * This simply increases the index of the Carousel. If a positive `cloneDepth`
       * is provided, this Carousel will loop around to the first item index in the Container
       * when it reaches the end.
       *
       * @method slideNext
       * @return {Integer|Boolean}
      **/
      slideNext: function() {
        if (this.get('isFrozen')) return false;

        if (this.get('index') < this.get('maxIndex')) {
          this.set('noTransition', false);
          return this.incrementProperty('index');
        }
        else {
          if (this.get('isInfinite')) {
            return this._recurLoop('next');
          }
          else {
            this.set('noTransition', false);
            Ember.run.once(this.get('ItemContainer'), this.get('ItemContainer.adjustContainerStyle'));
          }
        }

        return false;
      },

      /**
       * This simply decreases the index of the Carousel. If a positive `cloneDepth`
       * is provided, this Carousel will loop around to the last item index in the Container
       * when it reaches the beginning.
       *
       * @method slidePrev
       * @returns {Integer|Boolean}
      **/
      slidePrev: function() {
        if (this.get('isFrozen')) return false;

        if (this.get('index') > this.get('minIndex')) {
          this.set('noTransition', false);
          return this.decrementProperty('index');
        }
        else {
          if (this.get('isInfinite')) {
            return this._recurLoop('prev');
          }
          else {
            this.set('noTransition', false);
            Ember.run.once(this.get('ItemContainer'), this.get('ItemContainer.adjustContainerStyle'));
          }
        }

        return false;
      },

      /**
       * This method sets the current active index of the Carousel.
       *
       * @method jumpTo
       * @params {Integer} The target zero-based index in which to change
       * @returns {Integer|Boolean}
      **/
      jumpTo: function(index) {
        var inMinBounds, inMaxBounds;

        if (this.get('isFrozen')) return false;

        inMinBounds = index >= this.get('minIndex');
        inMaxBounds = index <= this.get('maxIndex');

        if (inMinBounds && inMaxBounds) {
          this.set('noTransition', false);
          return this.set('index', index);
        }

        return false;
      },

      /**
       * Manually set up the Component's touch gestures in the TouchMixin.
       *
       * @method deferredSetup
      **/
      deferredSetup: function() {
        var isSwipeable = this.get('isSwipeable');
        var hasMultipleItems = this.get('hasMultipleItems');

        // Decide whether to register touch events
        if (isSwipeable && hasMultipleItems) {
          Ember.$.merge(this.get('gestures'), this.get('swipeGestures'));
        }

        // Sets up gestures that are defined in the `gestures` property
        // Inherited from TouchMixin
        return this.setupTouchGestures({
          ignore: ['.ss-carousel-btn', '.ss-carousel-dots']
        });
      },

      _handleDrag: function(e) {
        var containerOffset;
        var gesture = e.gesture;
        var angle, direction, eventType;

        if (!gesture) return;

        angle = Math.abs(gesture.angle);
        direction = gesture.direction;
        eventType = e.type;

        // Handle autoslide
        if (eventType === 'touch') {
          this.disableAutoslide();
        }
        else if (eventType === 'release') {
          Ember.run.once(this, this.enableAutoslide);
        }

        // Remove transitions, pre-drag
        if (eventType === 'touch' || !gesture.distance) {
          this.set('noTransition', true);
          return;
        }

        // Lock the Carousel if the user is attempting to swipe down the page
        if (direction === Hammer.DIRECTION_LEFT || direction === Hammer.DIRECTION_RIGHT) {
          if (angle >= 60 && angle <= 120) {
            return;
          }
          else {
            this.stifle(e);
          }
        }
        else if (eventType !== 'release') {
          return;
        }

        containerOffset = this.get('ItemContainer.containerOffset');

        Ember.run.schedule('render', this.get('ItemContainer._containerStyle'), function() {
          this.webkitTransform =
          this.msTransform =
          this.OTransform =
          this.MozTransform =
          this.transform = 'translate3d(' + (containerOffset + gesture.deltaX) + 'px, 0, 0)';
        });

        // Decides whether to change indices
        if (eventType === 'release') {
          var overSwipeThreshold = gesture.distance > this.get('minDragTransitionDistance');

          if (overSwipeThreshold && direction === Hammer.DIRECTION_LEFT) {
            return Ember.run.once(this, this.slideNext);
          }
          else if (overSwipeThreshold && direction === Hammer.DIRECTION_RIGHT) {
            return Ember.run.once(this, this.slidePrev);
          }
          else {
            this.set('noTransition', false);
            Ember.run.once(this.get('ItemContainer'), this.get('ItemContainer.adjustContainerStyle'));
          }
        }
      }.on('touch', 'drag', 'release'),

      _handleSwipe: function(e) {
        var direction = e.gesture.direction;

        this.stifle(e);

        if (direction === Hammer.DIRECTION_LEFT) {
          return Ember.run.once(this, this.slideNext);
        }
        else if (direction === Hammer.DIRECTION_RIGHT) {
          return Ember.run.once(this, this.slidePrev);
        }

        return null;
      }.on('swipe'),

      _fastclickListeners: [],

      _registerListeners: function() {
        var carousel = this;
        var itemContainer = this.get('ItemContainer');
        var fastclick = window.FastClick;
        var listeners = this._fastclickListeners;

        // Component resize handler
        Ember.$(window).on('resize', Ember.$.proxy(this.setupItemWidth, this));

        // Calculate container width / position
        Ember.run.once(itemContainer, itemContainer.get('adjustContainerStyle'));

        // Register listeners for container
        Ember.run.once(itemContainer, itemContainer.get('_registerListeners'));

        // Enable autoslide
        Ember.run.once(this, this.enableAutoslide);

        // Setup FastClick if it exists
        if (typeof fastclick !== 'undefined') {
          Ember.$('.ss-carousel-btn').each(function() {
            listeners.push(fastclick.attach(this));
          });
        }

      }.on('didInsertElement'),

      _teardownListeners: function() {
        var $this = this.$();

        // Teardown resize handler
        Ember.$(window).off('resize', this.setupItemWidth);

        // Run teardown for container
        this.get('ItemContainer')._teardownListeners();

        // Teardown FastClick
        if (typeof window.FastClick !== 'undefined') {
          this._fastclickListeners.forEach(function(obj) {
            obj.destroy();
          });

          this._fastclickListeners.clear();
        }

        // Autoslide
        Ember.run.cancel(this.get('_autoslideTimer'));

      }.on('willDestroyElement'),

      _handleListenersOnFreeze: function() {
        if (this.get('isFrozen')) {
          this._teardownListeners();
        }
        else {
          this._registerListeners();
        }
      }.observes('isFrozen'),

      _recurLoop: function(direction) {
        var matrix, values, offset, newOffset;
        var contentLength = this.get('items.length');
        var itemWidth = this.get('itemWidth');
        var carousel = this;
        var isNext = direction === 'next';
        var nextIndex = isNext ? this.get('minIndex') : this.get('maxIndex');
        var container = this.get('ItemContainer');
        var $container = container.$();

        Ember.run.schedule('sync', this, function() {
          matrix = $container.css(VENDOR_PREFIX + 'transform');
          values = getArrayFromMatrix(matrix);
          offset = window.parseInt(values[4], 10);

          if (isNext) {
            newOffset = contentLength * itemWidth + offset;
          }
          else {
            newOffset = (contentLength * itemWidth * -1) + offset;
          }

          this.set('noTransition', true);

          Ember.run.next(this, function() {
            this.set('noTransition', false);
            this.set('index', nextIndex);
          });
        });

        Ember.run.schedule('render', container.get('_containerStyle'), function() {
          this.webkitTransform =
          this.msTransform =
          this.OTransform =
          this.MozTransform =
          this.transform = 'translate3d(' + newOffset + 'px, 0, 0)';
        });

        return nextIndex;
      },

      actions: {
        slideNext: function() {
          this.slideNext();
        },

        slidePrev: function() {
          this.slidePrev();
        },

        jumpTo: function(index) {
          this.jumpTo(index);
        }
      }
    });

    function getArrayFromMatrix(matrix) {
      return matrix.substr(7, matrix.length - 8).split(', ');
    }

    __exports__["default"] = Carousel;
  });
(function(__dependency1__) {
  "use strict";
  var Application = __dependency1__.Application;

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
})(window.Ember);