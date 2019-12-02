# Angular Elements

Since Angular version 6 was released, there is a new cool features available, called: `Angular Elements`.

## What are Angular Elements?

It's the possibility to produce standalone Web Components written in Angular.

#### But:

    What I mostly see is that people use this feature to ship complete features (modules).
    Which is very cool!

From an architecture perspective, this means we can finally build single purpose micro applications. This pattern is known as Micro Frontends. This is something you may be familiar with on the backend side, as the Microservice pattern.

Here I want to show you how to build and use Angular Elements.

### What is an Angular Element?

An Angular Element is an API to convert an Angular Component into a Custom Element.

Custom Elements are part of the W3C Web Components specifications.

Custom Elements are custom HTML tags you can define and use.

I don't want to go into [WebComponents](https://github.com/w3c/webcomponents) here, but let me show you some interesting facts about them.

Web Components are an umbrella term combining three concepts:

- Template `<template></template>`
- Shadow DOM `<#shadow-root></shadow-root>`
- Custom Element `<foo-bar></foo-bar>`

#### People mostly mean Custom Elements when they talk about Web Components

### How does a Custom Element look like?

Custom Elements are defined as an `ES6 class` which extends `HTMLElement` and so it inherits the entire `DOM API`.
That means any properties/methods that you add to the class become part of the element's DOM interface and it creates a public JavaScript API for your custom tag.

```typescript
class MoinComponent extends HTMLElement {}
```

You must define it to be able to register it within the Browser, therefore you have to call `customElements.define()` which takes two parameters. The first parameter is the TagName, the second parameter is the Class you want to register for this TagName.
There are some very important rules you have to follow when it comes to creating CustomElements.

1. The TagName must be lowercase and MUST contain a dash `-` (kebab-case). So the HTML parser can distinguish CustomElements from regular HTML elements (e.g. `<p>`, `<h1>`...). It also ensures forward compatibility when new tags are added to the HTML specifications (HTML tags are named without using dashes).
2. TagNames must be unique and can only be defined once.
3. CustomElements are NEVER self-closing.

```typescript
customElements.define('moin-moin', MoinComponent);
```

#### Custom Elements are unknown until they are defined. The Browser will ignore any unknown custom element!

### CustomElements API

In the Class you can use `getter` and `setter` to reflect values to HTML Attributes

#### `this` inside a class definition refers to the DOM element itself

```typescript
 get name() {
     return this.getAttribute('name');
 }

 set name(val) {
     this.setAttribute('name', val);
 }
```

You can also observe HTML Attributes changes.

```typescript
 static get observedAttributes() {
   return ['name'];
 }
```

And you can use the `attributeChangedCallback`, which is called whenever an attribute from the `observedAttributes` array has changed.

```typescript
 attributeChangedCallback(attr, oldValue, newValue) {
   if (attr === 'name') {
     // ...
   }
 }

```

### Events

You can create and use a custom event, using the `CustomEvent` constructor, like any other JavaScript event. So nothing special!

```typescript
this.dispatchEvent(
  new CustomEvent('name-change', {
    detail: `name has changes from ${o} to ${n}`
  })
);
```

### Reactions

A CustomElement can define special Methods which are called at special times during its "lifecycle".
These are called reactions.

- `constructor(){...}` CustomElement is created
- `connectedCallback() {...}` CustomElement was inserted into the DOM
- `disconnectedCallback() {...}` CustomElement was removed from the DOM
- `attributeChangedCallback(attr, oldValue, newValue) {...}` Observed Attribute has changed

Q: _But, Why are you telling me this?_

A: _Angular components were designed in a very similar way to CustomElements_

Here is a list of equalities

<table>
  <tr>
    <th>CustomElements</th>
    <th>Angular Components</th>
  </tr>
  <tr>
    <td>Attributes</td>
    <td>@Input()</td>
  </tr>
  <tr>
    <td>Properties</td>
    <td>@Input()</td>
  </tr>
  <tr>
    <td>Events</td>
    <td>@Output()</td>
  </tr>
  <tr>
    <td>connectedCallback</td>
    <td>OnInit</td>
  </tr>
  <tr>
    <td>disconnectedCallback</td>
    <td>OnDestroy</td>
  </tr>
  <tr>
    <td>attributeChangedCallback</td>
    <td>OnChanges</td>
  </tr>
  <tr>
    <td>slot</td>
    <td>ng-content</td>
  </tr>
  <tr>
    <td>template</td>
    <td>ng-template</td>
  </tr>
  <tr>
    <td>ShadowDom</td>
    <td>ViewEncapsulation</td>
  </tr>
</table>

Q: _Why should I use Angular Elements?_

A: _CustomElements with Angular Power_

## How do you build it?

We start with an empty Angular Project we create.

```bash
ng new ce-moin
```

    Please keep in mind: Angular Elements are available since Angular version 6.
    So, you need @angular/cli 6+ for this.

next, we want to use the Angular Schematics to add all required resources and tooling to our small project.

```bash
ng add @angular/elements
ng add ngx-build-plus
ng g ngx-build-plus:wc-polyfill
```

#### [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)

_by Manfred Steyer_

    Extend the Angular CLI's default build behavior to build a single bundle (and many more, but we only use this single Bundle thing)

Now we want to turn our `AppComponent` into a CustomElement.

##### app.module.ts

```typescript
import { createCustomElement } from "@angular/elements";
...
constructor(private injector: Injector) {
   // wrap the Angular Component as a Custom Element
   const wrappedEl = createCustomElement(AppComponent, { injector });

   // register it so the browser knows about it
   customElements.define(
       "moin-moin",
       wrappedEl
    );
 }

```

##### [createCustomElement](https://angular.io/api/elements/createCustomElement):

    Creates a custom element class based on an Angular component.

Normally we tell Angular which Component is our root Component (`bootstrap`).
But since our `AppComponent` is now used as a standalone Custom Element, Angular doesn't need to bootstrap it any more. As such we remove it from the `AppModule.bootstrap` array.
We also have to define it as a `entryComponent`.

However, we need to tell Angular to use the AppModule for bootstrapping, for this, we use the `ngDoBootstrap` lifecycle hook.

```typescript
import { NgModule, Injector, DoBootstrap } from '@angular/core';
...
@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [BrowserModule]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
   customElements.define(
       'moin-moin',
       createCustomElement(AppComponent, { injector })
    );
  }

  ngDoBootstrap() {}
}
```

### That's it!

So let's build it. Thanks to `ngx-build-plus` we have this nice feature to build all we need in one bundle.

```bash
ng build --prod --single-bundle --outputHashing=none
```

- `--single-bundle`: Puts everything reachable from the main entry point into one bundle. Polyfills, scripts, and styles stay in their own bundles as the consuming application might have its own versions of these. - Manfred Steyer -
- `--outputHashing=none`: Output file names get no hashes, this makes it easier to include them in the next steps. You likely don't want that for production.

At the time of writing there is one issue after using the `ngx-build-plus` schematic. If you get this error:

```bash
Schema validation failed with the following errors:
  Data path ".budgets[1].type" should be equal to one of the allowed values.
```

then as a workaround delete the second entry in the `budgets` array in `angular.json` under `projects/ce-moin/architect/build/configurations/production/budgets` (type `anyComponentStyle`).

We'll find all needed files in the `dist` folder.

## How can we you use it?

### In a non Angular environment

#### Create

In a non Angular application you need to add all the needed dependencies and styles in to the `index.html`

```html
<link rel="stylesheet" href="styles.css" />

<script src="polyfills-es5.js" nomodule defer></script>
<script src="polyfills-es2015.js" type="module"></script>
<script src="scripts.js" defer></script>
<script src="main-es2015.js" type="module"></script>
<script src="main-es5.js" nomodule defer></script>
```

And define the custom HTML tag of your CustomElement.

```html
<moin-moin></moin-moin>
```

Or create it programmatically by using javascript

```javascript
const script = document.createElement('script');
script.src = './main-es2015.js';
document.body.appendChild(script);

document.body.appendChild(document.createElement('moin-moin'));
```

#### Interact

And you can use Vanilla JavaScript to interact with this element. In my example the CustomElement has an Input property called `name` and an Output event called `namechange`.

```javascript
const moin = document.querySelector('moin-moin');
moin.addEventListener('namechange', e => console.log(e));
moin.name = 'Paul';
```

### In a Angular environment

#### Create

Works exactly as in a non-Angular App.

#### Interact

##### Event binding

Event binding works the Angular way.

```html
<moin-moin (namechange)="foo($event)"></moin-moin>
```

##### Attribute binding

Attribute binding works nearly the Angular way.

```html
<moin-moin [attr.name]="user.name"></moin-moin>
```

#### Conclusion

Angular Elements are great. It's a powerful feature to implement a Micro Frontend architecture.

#### Special Thanks

I would like to give special thanks to the awesome people that reviewed this post and gave me pointers:

- <a href="https://twitter.com/ManfredSteyer"  target="_blank">Manfred Steyer</a>
- <a href="https://twitter.com/GregOnNet"  target="_blank">Gregor Woiwode</a>
- <a href="https://twitter.com/megadesty"  target="_blank">Michael Raue</a>
- <a href="https://twitter.com/manekinekko"  target="_blank">Wassim CHEGHAM</a>
- <a href="https://twitter.com/jefiozie"  target="_blank">Jeffrey Bosch</a>
- <a href="https://twitter.com/robertSPD"  target="_blank">Robert Willemelis</a>
- <a href="https://twitter.com/juristr"  target="_blank">Juri Strumpflohner</a>
- <a href="https://twitter.com/robwormald"  target="_blank">Rob Wormald</a>
