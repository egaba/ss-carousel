# Soysauce Carousel

Mobile-friendly carousel / image slider component for [Ember](http://emberjs.com/).

## Installation

Install via Bower:
```sh
$ bower install ss-carousel
```

Include JS/CSS scripts into your site:
```
<link rel="stylesheet" href="/bower_components/ss-carousel/dist/carousel.css">
<script src="/bower_components/ss-carousel/dist/carousel.js"></script>
```

## Usage:
The Carousel is an Ember view that can be used either as an image slider
or product display. This component is based heavily off of the [Soysauce Carousel](http://www.soysaucejs.com/#!/api/carousel/intro),
and implements many of its features.

#### Creating a basic Carousel
A basic Carousel is a simple image slider, does not re-loop, and is swipeable.
An item template can be specified one of two ways:

1) Through the `itemTemplateName` property:

```
{{ss-carousel items=products itemTemplateName="partials/product-item"}}
```

2) Using an inline template:

```
{{#ss-carousel items=images}}
  <img class='my-image' {{bind-attr src=1x alt=alt}}>
{{/ss-carousel}}
```
```

#### Creating an infinite Carousel
An infinite Carousel re-loops its indicies when it reaches a boundary (either min or max index). It allows the user
to flawlessly progress from the last index to the first index, and vice versa, without
noticing a jump. It can be invoked through specifying the `isInfinite` property:

```
{{ss-carousel items=images isInfinite=true itemTemplateName="partials/images"}}
```

## Visual Displays

The Carousel comes equipped with visual accessories, such as dot indicators and buttons.
The following properties can be enabled in order to show the accessory:

* `showButtons`
* `showDotIndicators`
* `showZoomIcon` // TBI

For example, in order to show dots and buttons, you would specify:
```
{{ss-carousel items=images showButtons=true showDotIndicators=true}}
```

## Contributing

#### Pre-requisites:
* [npm](http://nodejs.org/download/)
* [bower](http://bower.io/) ***or*** `npm install -g bower`

#### Setting up local development from your project
1) Install the dev packages:
```sh
$ npm install
```

2) Link this project to Bower:
```sh
$ bower link
```

3) Link your project to this local copy:
```sh
$ cd ~/path/to/your/project
$ bower link ss-carousel
```

#### Main Gulp tasks:
* `gulp bundle`: Compiles, bundles, and concats all assets
* `gulp watch`: Starts a server to watch file changes; recompiles/bundles assets after a change is made
* `gulp`: runs `bundle` and `watch`

Assets are placed into `dist` directory.
