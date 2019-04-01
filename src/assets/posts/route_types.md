<strong>Route types</strong>

Angular comes with a great router. Here i wanna show you the different rout types and how they work. I assume that you have some experience with the angular router.

### Standard route types

You can define several routing rules which a kind of standard.

#### Wild Cards

No matter where you navigate to, the router will find this and instantiate LumpenSammlerComponent.

```js
[
  {
    path: '**',
    component: LumpenSammlerComponent
  }
];
```

<b>
Very important to know: The router goes through your router config array topdown.
And he checks every path of the config and test it with a regex against the current route. That means: The order of your rout config matters!</b>
<br>
<br>
The regex for a wildcard looks like:

```js
const regex = '^(?:([^/]+))$';
```

#### Redirect

The default route wich brings you to a default route if no route is given.<br>

```ts
[
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];
```

Important is the flag <code>pathMatch</code> which specifies the matching strategy.<br>
Options are:

- <code>prefix</code>
- <code>full</code>

By default the router will look at what is left in the url, and check if it starts with the specified path

```ts
'/blog/11'  => 'blog/:id'
```

You can change the matching strategy to make sure that the path covers the whole unconsumed url.<br>
This is particularly important when redirecting empty-path routes.

#### Empty Path

These type of route do not 'consume' any url segments. It is perfect fit if you wanna use child-routing.

```js
[
  {
    path: '',
    component: WelcomeComponent
  }
];
```

#### standard routes

These is the most known rout types. Nothing special.

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

These is the most common way to transport data in the route and have a variable route. The string at the segment which is marked with <code>:id</code> will be stored in the Observable <code>ActivatedRoute.params</code>.

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

### Custome route matcher

Definetly a FAQ in my workshops is:
<i>Q: Can I define a specific regex for a route?</i><br>
<b>A: Yes!</b>

Ok this is ot enough, so I will explain how you can do this.

A 'Standard' route config has a path to define how this rule will be applied.
If you wanna set a own rule, you can define a 'matcher'.
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

The problem with this is: We dont have defined any routeParams yet.
So let's fix this.
To do so, we have to define them in the returned object as a UrlSegment wich can be resolved by the router. Sounds complicated? It isn't.

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

This nex example is a great way to have internationalisation in the routes.

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
