// loading ember-qunit helpers manually
// Cannot load global ember-qunit file: [Uncaught Error: Mismatched anonymous define() module]

var testContext;

function setTestContext(context) {
  testContext = context;
}

function getTestContext() {
  return testContext;
}

var testResolver;

function setResolver(resolver) {
  testResolver = resolver;
}

function getResolver() {
  if (testResolver == null) throw new Error('you must set a resolver with `testResolver.set(resolver)`');
  return testResolver;
}

function isolatedContainer(fullNames) {
  var resolver = getResolver();
  var container = new Ember.Container();
  container.optionsForType('component', { singleton: false });
  container.optionsForType('view', { singleton: false });
  container.optionsForType('template', { instantiate: false });
  container.optionsForType('helper', { instantiate: false });
  container.register('component-lookup:main', Ember.ComponentLookup);
  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    container.register(fullName, resolver.resolve(fullName));
  }
  return container;
}

function moduleFor(fullName, description, callbacks, delegate) {
  var container;
  var context;

  var _callbacks = {
    setup: function(){
      callbacks = callbacks || { };

      var needs = [fullName].concat(callbacks.needs || []);
      container = isolatedContainer(needs);

      callbacks.subject   = callbacks.subject || defaultSubject;

      callbacks.setup     = callbacks.setup    || function() { };
      callbacks.teardown  = callbacks.teardown || function() { };

      function factory() {
        return container.lookupFactory(fullName);
      }

      setTestContext({
        container:            container,
        factory:              factory,
        dispatcher:           null,
        __setup_properties__: callbacks
      });

      context = getTestContext();

      if (delegate) {
        delegate(container, context, defaultSubject);
      }

      if (Ember.$('#ember-testing').length === 0) {
        Ember.$('<div id="ember-testing"/>').appendTo(document.body);
      }

      buildContextVariables(context);
      callbacks.setup.call(context, container);
    },

    teardown: function(){
      Ember.run(function(){
        container.destroy();

        if (context.dispatcher) {
          context.dispatcher.destroy();
        }
      });

      callbacks.teardown(container);
      Ember.$('#ember-testing').empty();
    }
  };

  QUnit.module(description || fullName, _callbacks);
}

function defaultSubject(options, factory) {
  return factory.create(options);
}

// allow arbitrary named factories, like rspec let
function buildContextVariables(context) {
  var cache     = { };
  var callbacks = context.__setup_properties__;
  var container = context.container;
  var factory   = context.factory;

  Ember.keys(callbacks).filter(function(key){
    // ignore the setup/teardown keys
    return key !== 'setup' && key !== 'teardown';
  }).forEach(function(key){
    context[key] = function(options) {
      if (cache[key]) { return cache[key]; }

      var result = callbacks[key](options, factory(), container);
      cache[key] = result;
      return result;
    };
  });
}

function moduleForComponent(name, description, callbacks) {
  var resolver = getResolver();

  moduleFor('component:' + name, description, callbacks, function(container, context, defaultSubject) {
    var templateName = 'template:components/' + name;

    var template = resolver.resolve(templateName);

    if (template) {
      container.register(templateName, template);
      container.injection('component:' + name, 'template', templateName);
    }

    context.dispatcher = Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');

    context.__setup_properties__.append = function(selector) {
      var containerView = Ember.ContainerView.create({container: container});
      var view = Ember.run(function(){

        var subject = context.subject();
        containerView.pushObject(subject);
        // TODO: destory this somewhere
        containerView.appendTo('#ember-testing');

        return subject;
      });

      return view.$();
    };
    context.__setup_properties__.$ = context.__setup_properties__.append;
  });
}

function moduleForHelper(name, description, callbacks) {
  var resolver = getResolver();

  moduleFor('helper:' + name, description, callbacks, function(container, context, defaultSubject) {
    context.dispatcher = Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');

    context.__setup_properties__.append = function(selector) {
      var containerView = Ember.ContainerView.create({container: container});
      var view = Ember.run(function(){

        var subject = context.subject();
        containerView.pushObject(subject);
        // TODO: destory this somewhere
        containerView.appendTo('#ember-testing');

        return subject;
      });

      return view.$();
    };

    context.__setup_properties__.$ = context.__setup_properties__.append;
  });
}

function getCarousel() {
  return Ember.View.views[Ember.$('.ss-carousel').attr('id')];
}
