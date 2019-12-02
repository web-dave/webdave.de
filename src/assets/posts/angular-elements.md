# Angular Elements

Since Angular Version 6 was released, there is a new cool features available: `Angular-Elements`.

## What are Angular-Elements?

It's the possibility to produce standalone Angular Components.

#### But:

    What I mostly see is that people use this feature to ship complete features (modules) within it.
    Which is very cool!

From an architecture perspective this means, we can finally build micro frontends. Something you may know from the backend. There you call this pattern Microservices.

Here I want to show you how to build and use them.

### What is a Angular-Element?

It's a wrapper to convert an Angular Component into a Custom Element.

Custom Elements are part of something you might know as WebComponent.
WebComponents are HTML tags you can define.

I don't want to go into WebComponents here, but let me show you some interesting facts about them.

WebComponents are an umbrella combining three techniques:

- Template `<template></template>`
- Shadow DOM `<#shadow-root></shadow-root>`
- CustomElement `<foo-bar></foo-bar>`

#### People mostly mean CustomElements when they talk about WebComponents

### How does a CustomElement look like?

It's an `ES6 class` which extends `HTMLElement` and so it inherits the entire `DOM API`.
That means any properties/methods that you add to the class become part of the element's DOM interface and it creates a public JavaScript API for your tag.

```typescript
class MoinComponent extends HTMLElement {}
```

You must define it to introduce it to the Browser, therefore you have to call `customElements.define()` which takes two parameters. The first parameter is the TagName, the second parameter is the Class you want to register for this TagName.
There are some very important rules you have to follow when it comes to creating CustomElements.

1. The TagName must be lowercase and MUST contain a dash `-` (kebab-case). So the HTML parser can distinguish CustomElements from regular elements. It also ensures forward compatibility when new tags are added to HTML (HTML tags are without dashes).
2. TagNames must be Unique and can only defined once.
3. CustomElements are NEVER self-closing

```typescript
customElements.define('moin-moin', MoinComponent);
```

#### Custom Elements are unknown until they are defined and the Browser will ignore them!

### CustomElements API

In the Class you can use getter and setter to reflect values to HTML Attributes

#### `this` inside a class definition refers to the DOM element itself

```typescript
 get name() {
     return this.getAttribute('name');
 }

 set name(val) {
     this.setAttribute('name', val);
 }
```

You can also Observe HTML Attributes changes.

```typescript
 static get observedAttributes() {
   return ["name"];
 }
```

And you can use the attributeChangedCallback, which is called whenever an attribute from the `observedAttributes` array has changed.

```typescript
 attributeChangedCallback(attr, oldValue, newValue) {
   if (attr === "name") {
     // ...
   }
 }

```

### Events

You can create CustomEvents like in every Javascript environment. So nothing special.

```typescript
this.dispatchEvent(
  new CustomEvent('name-change', {
    detail: `name has changes from ${o} to ${n}`
  })
);
```

### Reactions

A CustomElement can define special Methods which are called at special times during its "life".
These are called reactions.

- `constructor(){...}` CustomElement is created
- `connectedCallback() {...}` CustomElement was inserted into the DOM
- `disconnectedCallback() {...}` CustomElement was removed from the DOM
- `attributeChangedCallback(attr, oldValue, newValue) {...}` Observed Attribute has changed

Q: _But, Why are you telling me this?_

A: _Angular has been designed very similar to CustomElements_

Here is a list of equalities
| CustomElements | Angular Components |
|---|---|
| Attributes | @Input() |
| Properties | @Input() |
| Events | @Output() |
| connectedCallback | OnInit |
| disconnectedCallback | OnDestroy |
| attributeChangedCallback | OnChanges |
| slot | ng-content |
| template | ng-template |
| ShadowDom | ViewEncapsulation |

Q: _Why should I go with Angular Elements?_

A: _CustomElements with Angular Power_

## How do you build it?

We start from empty Angular Project we create.

```bash
ng new ce-moin
```

    Please keep in mind: Angular Elements are available since Angular version 6.
    So, you need @angular/cli 6+ for this.

next we want to use Schematics to add all required resources and tooling to our small project.

```bash
ng add @angular/elements
ng add ngx-build-plus
ng g ngx-build-plus:wc-polyfill
```

#### ngx-build-plus

_by Manfred Steyer_

    Extend the Angular CLI's default build behavior to build a single bundle (and many more, but we only use this single Bundle thing)

Now we want to turn our `AppComponent` into a CustomElement.

##### app.module.ts

```typescript
import { createCustomElement } from "@angular/elements";
...
constructor(private injector: Injector) {
   customElements.define(
       "moin-moin",
       createCustomElement(AppComponent, { injector })
    );
 }

```

##### createCustomElement:

    Creates a custom element class based on an Angular component.(doku)

Normally we tell Angular which Component is our root Component (`bootstrap`). But since our `AppComponent` is now used as a standalone Custom Element, Angular doesn't need to bootstrap it any more. As such we remove it from the `AppModule.bootstrap` array. We also have to define it as a `entryComponent`.

However, we need to tell Angular to use the AppModule for bootstrapping. For this we use the `ngDoBootstrap` method.

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
       "moin-moin",
       createCustomElement(AppComponent, { injector })
    );
  }

  ngDoBootstrap() {}
}
```

### That's it!

so let's build it. Thanks to `ngx-build-plus` we have this nice feature to build all we need in one bundle.

```bash
ng build --prod --single-bundle
```

`--single-bundle`: Puts everything reachable from the main entry point into one bundle. Polyfills, scripts, and styles stay in their own bundles as the consuming application might have its own versions of these. - Manfred Steyer -

We'll find all needed files in the dist folder.

## How can we you use it?

### In a non Angular environment

#### Create

In a non Angular App you need to add all the needed scripts
and styles in to your `index.html`

```html
    <link rel="stylesheet" href="styles.css"></head>

    <script src="polyfills-es5.js" nomodule defer></script>
    <script src="polyfills-es2015.js" type="module"></script>
    <script src="scripts.js" defer></script>
    <script src="main-es2015.js" type="module"></script>
    <script src="main-es5.js" nomodule defer></script>
```

And define the tag of your CustomElement.

```html
<moin-moin></moin-moin>
```

Or create it dynamic via javascript

```javascript
const script = document.createElement('script');
script.src = './main-es2015.js';
document.body.appendChild(script);

document.body.appendChild(document.createElement('moin-moin'));
```

#### Interact

And you can use vanilla JavaScript to interact with this element. In my example the CustomElement has an Input name and an Output.

```javascript
moin.addEventListener('namechange', e => console.log(e));
const moin = document.querySelector('moin-moin');
moin.name = 'Paul';
```

### In a Angular environment

#### Create

Works exactly as in a non Angular App.

#### Interact

##### Event binding

Eventbinding works the Angular way.

```html
<moin-moin (namechange)="foo($event)"></moin-moin>
```

##### Attribute binding

Attributebinding works nearly the Angular way.

```html
<moin-moin [attr.name]="user.name"></moin-moin>
```

#### Conclusion

Angular Elements are great. It's a powerful feature to implement a micro frontend architecture.

#### Special Thanks

I would like to give special thanks to the awesome people that reviewed this post and gave me pointers:

- <a href="https://twitter.com/ManfredSteyer"  target="_blank">Manfred Steyer</a>
- <a href="https://twitter.com/GregOnNet"  target="_blank">Gregor Woiwode</a>
