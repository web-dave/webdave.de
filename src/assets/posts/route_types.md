<strong>Route types</strong>

Angular comes with a great router. Here I wanna show you the different route types and how they work.

- Standard Route Types
- Custom Route Matcher

I assume that you have some experience with the Angular router.

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

> ⚠️ Very important to know: The router goes through your router config array topdown.
> And he checks every path of the config and test it with a Regular Expression against the current route. That means: The order of your rout config matters!

The Regular Expression expression for a wildcard looks like:

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

You can change the matching strategy to make sure that the path covers the whole unconsumed URL.<br>
This is particularly important when redirecting empty-path routes.

#### Empty Path

These type of route do not 'consume' any URL segments. It is a perfect fit if you wanna use child-routing.

```js
[
  {
    path: '',
    component: WelcomeComponent
  }
];
```

#### standard routes

These are the most known rout types. Nothing special.

```js
[
  {
    path: 'start',
    component: StartComponent
  }
];
```

The regex for <code>start</code> looks like this:

```js
const regex = '/^/start$/';
```

#### Routes with params

These are the most common way to transport data in the route and have a variable route. The string at the segment which is marked with <code>:id</code> will be stored in the Observable <code>ActivatedRoute.params</code>.

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

The regex for a <code>blog/:id</code> looks like:

```js
const regex = '/^/blog/(?:([^/]+))$/';
```

### Custom Route Matcher

Definetly a FAQ in my workshops is:
<i>Q: Can I define a specific regex for a route?</i><br>
<b>A: Yes!</b>

Ok, this is not enough so I will explain how you can do this.

A 'Standard' route config has a path to define how this rule will be applied.
If you wanna set an own rule, you can define a 'matcher'.
A custom URL matcher can be provided when a combination of <code>path</code> and <code>pathMatch</code> isn't expressive enough.

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

The problem with this is: We don't have defined any routeParams yet.
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

Now we can read the Observable <code>ActivatedRoute.params</code> as always.

```json
{
  "id": "5"
}
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

#### credits

Thx to

- <a href="https://twitter.com/brandontroberts"  target="_blank">Brandon Roberts</a> for the inspiration.

Thanks, friends! It means a lot!
