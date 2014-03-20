 /**
  * The CarouselItem is a sub-view of the Carousel which binds its active class
  * to the Carousel's current index. The template that the CarouselItem uses first looks for a yielded template.
  * If no yielded template is found, it will look for the template defined in the `itemTemplateName` property.
  *
  * @class CarouselItem
  * @extends Ember.View
  * @requires Carousel
  */
var CarouselItem = Ember.View.extend({
  init: function() {
    this._super();
    this.set('context', this.get('itemContext'));
  },

  tagName: 'div',

  classNames: ['ss-carousel-item'],

  classNameBindings: ['isActive:active', 'isLoaded:loaded'],

  attributeBindings: ['style'],

  /**
   * This is the index of this particular item in the ItemContainer array.
   *
   * @property {Integer} index
   */
  index: 0,

  /**
   * This checks against the Carousel's current index to see if this item is active.
   *
   * @property {Boolean} isActive
   */
   isActive: function() {
     return this.get('index') === this.get('carousel.index');
   }.property('carousel.index'),

  /**
   * This adjusts the item's width to the Carousel's `itemWidth` property.
   *
   * @method adjustItemWidth
   */
  adjustItemWidth: function() {
    this.set('style', 'width: ' + this.get('carousel.itemWidth') + 'px;');
  }.observes('carousel.itemWidth').on('willInsertElement')
});

export default CarouselItem;
