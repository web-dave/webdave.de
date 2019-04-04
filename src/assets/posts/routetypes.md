<strong>Route types</strong>

Angular comes with a great router. Here I want to show you the different route types and how they work.
I assume that you have some experience with the Angular router.

- Standard Route Types
- Custom Route Matcher

### Standard Route Types

This section introduces you to several routing rules you can specify.

#### Wild Cards

A wild card is specified with two asterisk signs `**`.
This route will be activated if an URL is entered that does not match any other route registered.
The following snippet shows that `LumpenSammlerComponent` will be shown when the wild card gets activated.

```js
[
  {
    path: '**',
    component: LumpenSammlerComponent
  }
];
```

> ⚠️Very important to know: The router goes through your router config array topdown.
> And he checks every path of the config and tests it with a Regular Expression against the current route.
> That means the order of your route config matters!
> On child-modules or lazy loaded modules the angular router is very smart. He merges the child routes _before_ the `**` route.
> So that it really comes last!

The Regular Expression for a wildcard looks like:

```js
const regex = '^(?:([^/]+))$';
```

#### Redirect

The default route which brings you to a default route if no route is given.

```ts
[
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];
```

Important is the flag `pathMatch` which specifies the matching strategy.
Options are:

- `prefix`
- `full`

By default, the router will look at what is left in the URL, and check if it starts with the specified path

```ts
'/blog/11'  => 'blog/:id'
```

You can change the matching strategy to make sure that the path covers the whole unconsumed URL.

This is particularly important when redirecting empty-path routes.

#### Empty Path

This type of route does not "consume" any URL segments. It is a perfect fit if you want to use child-routing.

```js
[
  {
    path: '',
    component: WelcomeComponent
  }
];
```

#### Standard Routes

These are the most known route types. Nothing special.

```js
[
  {
    path: 'start',
    component: StartComponent
  }
];
```

The regex for `start` looks like this:

```js
const regex = '/^/start$/';
```

#### Routes With Params

This is the most common way to transport data in the route and have a dynamic route.
The string at the segment which is marked with `:id` will be stored in the Observable `ActivatedRoute.params`.

```json
{
  "id": "5"
}
```

```js
[
  {
    path: 'blog/:id',
    component: BlogComponent
  }
];
```

The regex for a `blog/:id` looks like:

```js
const regex = '/^/blog/(?:([^/]+))$/';
```

### Custom Route Matcher

Definitely a frequently asked question in my workshops is:

- _Q: Can I define a specific regex for a route?_
- **A: Yes!**

Ok, this is not enough so I will explain how you can do this.

A 'Standard' route config has a path to define how this rule will be applied.
If you want to set your own rule, you can define a 'matcher'.
A custom URL matcher can be provided when a combination of `path` and `pathMatch` isn't expressive enough.

Here is a example to match with any regex, (I use a 'numbers-only' regex here):

```js
const numberRegex = '^[0-9]*$';
const regexMatcher = (url: UrlSegment[]) => {
  return url.length === 1 && url[0].path.match(numberRegex)
    ? { consumed: url }
    : null;
};
[
  {
    matcher: regexMatcher,
    component: BlogComponent
  }
];
```

The problem with this is that we don't have defined any `routeParams` yet.
So let's fix this.
To do so, we have to define them in the returned object as a UrlSegment which can be resolved by the router. Sounds complicated? It isn't.

```js
const numberRegex = '^[0-9]*$';
const regexMatcher = (url: UrlSegment[]) => {
  return url.length === 1 && url[0].path.match(numberRegex)
    ? {
        consumed: url,
        posParams: {
          id: new UrlSegment(url[0].path, {})
        }
      }
    : null;
};
[
  {
    matcher: regexMatcher,
    component: BlogComponent
  }
];
```

Now we can read the Observable `ActivatedRoute.params` as always.

```js
this.ActivatedRoute.params.subscribe(p => {
  console.log(p);
  this.id = p.id;
});
```

This next example is a great way to have internationalisation in the routes.

```js
const i18nRegex = '(needle|nadel)';
const i18nMatcher = (url: UrlSegment[]) => {
  return url.length === 1 && url[0].path.match(i18nRegex)
    ? {
        consumed: url,
        posParams: {
          name: new UrlSegment(url[0].path, {})
        }
      }
    : null;
};
```

I've created a Blitz <a href="https://stackblitz.com/edit/custom-router-matcher" target="_blank">here</a>. BTW: Checkout my posts about <a href="https://www.webdave.de/blog/stackblitz">unittesting in Stackblitz</a>.

Way more details about the Angular Router can be found in the <a href="https://angular.io/api/router/">official documentation</a>

#### Credits

Thx to

- <a href="https://twitter.com/brandontroberts" target="_blank">Brandon Roberts</a> for the inspiration.
- <a href="https://twitter.com/GregOnNet" target="_blank">Gregor Woiwode</a> for Spelling, style and grammar checks.
- <a href="https://twitter.com/FabianGosebrink" target="_blank">Fabian Gosebrink</a> for Spelling, style and grammar checks.

Thanks, friends! It means a lot!
