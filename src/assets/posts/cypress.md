# e2e Testing with Cypress.io

Usually my topic is Angular and the entire ecosystem.
But testing is also a matter close to my heart.

When it comes to testing, you have to differentiate between two types.

1. Unit tests (code based)
2. e2e tests (user flow)

In this article I cover e2e testing.
My goal is to get as many developers as possible interested in tests.

## What is e2e testing?

It is the type of test that is run on the finished application.
This is used to test complete user storie or user journey.
So not just individual components (that would be unit tests) but the behavior of the application.

You can use various tools for this, I became aware of Cypress some time ago and think it's great.

## What is cypress?

Cypress is an e2e testing tool.
This tool comes with its own Electron App in which the app to be tested is executed.
This tool is an Electron App that comes with bundled Electron browser where your web app can be loaded and tested, or Cypress can load the web app in a browser already installed on your machine: Chrome, Edge, Firefox.

<img src="assets/images/cypress_1.png" width="400" class="" />

The advantage: Cypress behaves like an interceptor or proxy.
All communication that comes from the app to be tested can be monitored, manipulated and mocked by Cypress.

What all e2e tools have in common is that they were not built for a specific Javascript framework, you can use it to test any WebApp.

## How can I use Cypress for my Angular app?

I'm starting here with a freshly started Angular Project (ng new cypress-test)

The great advantage of Angular is that, thanks to the CLI, the switch from Protractor (as the standard e2e testing tool) to Cypress can be carried out fully automatically.
Prerequisite is a project that was built with the CLI version 6+.

All we have to do is tell the CLI to install Cypress.

```bash
ng add @briebug/cypress-schematic
```

This prompts the CLI to install Cypress (npm install cypress) and to configure the project for Cypress.

The CLI then asks if Protractor should be removed

```bash
Would you like to remove Protractor from the project?
```

Sure, it doesn't make sense for us to have two e2e tools in one project.

Then all projector files are deleted and cypress files are created.

```bash
DELETE e2e
```

The next step is the automatic configuration of the CLI to use Cypress.

```bash
CREATE cypress.json (48 bytes)
CREATE cypress/tsconfig.json (196 bytes)
CREATE cypress/integration/spec.ts (123 bytes)
CREATE cypress/support/commands.ts (838 bytes)
CREATE cypress/support/index.ts (689 bytes)
UPDATE package.json (1401 bytes)
UPDATE angular.json (4333 bytes)
```

### This is where the magic happen

Task e2e is configured in angular.json. This is rewritten by the `@briebug/cypress-schematic` to use the Cypress functionality.

The angular.json turns from:

```json
"e2e": {
  "builder": "@angular-devkit/build-angular:protractor",
  "options": {
    "protractorConfig": "e2e/protractor.conf.js",
    "devServerTarget": "my-project:serve"
  },
  "configurations": {
    "production": {
      "devServerTarget": "my-project:serve:production"
    }
  }
}
```

to this:

```json
"e2e": {
  "builder": "@briebug/cypress-schematic:cypress",
  "options": {
    "devServerTarget": "cypress-test:serve",
    "watch": true,
    "headless": false
  },
  "configurations": {
    "production": {
      "devServerTarget": "cypress-test:serve:production"
    }
  }
}
```

Preparation done! Thanks to the awesome work of teh CLI Team <3

## Our first Test

The tests are started as usual (if you have already worked with Protractor)

```bash
ng e2e
```

The first time you run it, a folder structure and some config files are created.

<img src="assets/images/cypress_2.png" class="" />

- fixtures: Mock data can be stored here, which can then be used in the test.
- integration: The tests are written here.
- plugins: Here plugins (if you need them) can be integrated.
- support: Here you can write your own commands or overwrite existing ones.

Then the Cypres UI is started.

<img src="assets/images/cypress_3.png" width="400" class="" />

With the `Run all specs` button you can run all existing test files and the tests written in them. In the `INTEGRATION TESTS` list all test files are listed and I would have the option to run individual test files here.

So far, we only have one file, but you can guess how easy it is to organize your tests: Simply write tests for different features in different files.

## The Cypress UI

We click on Run all specs and the Cypress Client is started.
The client is an Electron (or external) browser that loads our website and runs the tests.

The client GUI can be divided into 3 areas.

<img src="assets/images/cypress_4.png" width="400" class="" />

Area 1 is the reporter area, here the test results are output.
If you move the mouse over the test, you can see in area 2 the interactions that were carried out in the app. In area 3 you will find the address bar and the playground.

If you click on the playground button (1) (the crosshairs), the playground is displayed.
Here you have the selector button (2) as a tool, once clicked, you can now select an element in the app (area 2) and you get a selector (3) for this element. 4) put in the clipboard.
If you clicked the selector button (2), you will get information about the elements (5) when you run over elements in the app.

<img src="assets/images/cypress_5.png" width="400" class="" />

Initially there are no sensible tests, just a "must failing" test.

```JavaScript
it("loads examples", () => {
  cy.visit("http://localhost:4200");
  cy.contains("Replace me with something relevant");
});
```

Must failing because the expected text 'Replace me with something relevant' is not found.

But we can already see something important here.

Each `it()` is a separate test with its own Cypress commands inside the callback function.

### We can also organize the tests further.

For example, we can define test suits and then write the tests in them.
A test suit is defined using `describe()`

```JavaScript
describe('Next Steps', () => {...})
```

Within a `describe()` I can define any number of `it()` or further `describe()` to organize my tests.
In addition, `describe()` gives you the option of working with preflies or rollbacks. Cypress uses the standard Mocha's BDD callback names: `it`, `describe`, `beforeEach`, `afterEach` etc.

For example:

```JavaScript
describe("Hooks", () => {
  before(() => {
    /* Run once before all tests */
  });

  after(() => {
    /* Run once after all tests */
  });

  beforeEach(() => {
    /* Run before each tests */
  });

  afterEach(() => {
    /* Run after each tests */
  });
});
```

The `it()` as well as the `describe()` have 2 parameters, the first is a string and is output as a title in the test result. So the test result is clearly legible and meaningful afterwards.

<img src="assets/images/cypress_6.png" class="" />

The second parameter is our test.

Remember, e2e tests are like a user test. Everything the user does can be done in the test.

In the tests you have access to the global cypress object (cy)

I have access to many methods via cy, let's take a look at some of them.
The first method is one of the most important.

`.visit (url)`
So I can call a certain url in the browser (in the Cypress client).

in our example we want to call the standard URL of our Angular Project.

```JavaScript
cy.visit("http://localhost:4200");
```

## What do I want to test?

## What should I test?

### You should test:

- Everything in the user stories. (the expectations are just too perfect as a test title = first parameter of an it).
- Everything that seems critical.
- Everything that required a little more brain power when developing or that seemed uncanny.
- Everything that was broken before. There is nothing more annoying than finding a mistake again later.

### What I want to test here:

1. When visiting the page, the user should be greeted with the name of the project, in the form of: ProjektName app is running
2. When you click on one of the next steps, the display (looks like a console) should show a certain output.

## Cypress methods

The global Cypress object gives access to methods that I can use for testing:

### [.visit(url)](https://on.cypress.io/visit)

As already mentioned, I can open certain URLs in the browser

### [.get(selector)](https://on.cypress.io/get)

This allows me to select elements to run stocks or tests on. The selector is the standard CSS selector.

### [.contains(content)](https://on.cypress.io/contains)

This can be used to check whether a text / content was found, but it can also be used to filter. (I'll show that right away)

### [.should(chainer, ...arguments)](https://on.cypress.io/should)

With this method tests can be carried out. The chainer is the expectation that is checked against the arguments. (We'll see that too soon), the chainer are also typed so your IDE can help with intellisense.

## Our first test (really real test):

In app.component.html you will find the following.

```html
<span>{{ title }} app is running!</span>
```

We want to check whether cypress-test app is running! is issued in a span.

```JavaScript
it(`When visiting the page, the user should be greeted with the name of the project, in the form of: ProjektName app is running`, () => {
  cy.visit('http://localhost:4200');
  cy.contains('span', 'cypress-test app is running!');
});
```

### OK, what's going on here?

1. We have defined a test case with the title of our first test.
2. We go to the start page of the app.
3. We are looking for a span that contains our expected text

_That's how easy it can be.
If it is not so easy to find elements, the Cypress Client gives us the selector button as an aid._

We see in the reporter area that the test is green.
If you now move the mouse over line 2 of the test, you will see all the spans found in the app.

<img src="assets/images/cypress_7.png" width="400" class="" />

If there was no span with the text searched for, there would be a timeout and an error.

<img src="assets/images/cypress_8.png" class="" />

## Interact with elements

Any element found via `.get()` can receive actions. These are the usual actions that a user can perform f.e. Click, type text.
Here is a list of actions (I find their names very self-explanatory):

```js
// example clicking on an element
cy.get('jQuery CSS selector').click();
```

- .click()
- .dblclick()
- .type()
- .clear()
- .check()
- .uncheck()
- .select()
- .trigger()

## second test

So now we want to write the second test.

So first we create a new `it()` with the title

```JavaScript
it(`When user click on one of the next steps, the display (looks like a console) should show a certain output.`, () => {
  cy.visit('http://localhost:4200');
});
```

now we want to test all "next steps" buttons.
I built a small object with everything “Next Steps” and the associated messages.

```JavaScript
const commands = {
  'New Component': 'ng generate component xyz',
  'Angular Material': 'ng add @angular/material',
  'Add PWA support': 'ng add @angular/pwa',
  'Add Dependency': 'ng add _____',
  'Run and Watch Tests': 'ng test',
  'Build for Production': 'ng build --prod'
};
```

I would now like to iterate over this object and run a test in each iteration.

```JavaScript
it(`When user click on one of the next steps...`, () => {
  cy.visit('http://localhost:4200');
  for (const step in commands) {
    cy.contains('span', step)
      .click();
  }
});
```

I have already made sure that the buttons exist,
thats what this `contains()` does.
Now I have to check whether the expected text is displayed.

For this we will have to get the element and check its content.

```JavaScript
cy.get('div.terminal').should('contain', commands[step]);
```

Here is the complete `it()`

```JavaScript
it(`When user click on one of the next steps, the display (looks like a console) should show a certain output.`, () => {
  cy.visit('http://localhost:4200');
  for (const step in commands) {
    cy.get('span')
      .contains(step)
      .click();
    cy.get('div.terminal').should('contain', commands[step]);
  }
});
```

## Alias

With Cypress we have the possibility to store elements as alias in order to be able to access them multiple times. With the method `.as('myAlias')` we create the alias and can then use the method `.get('@myAlias')` access. the preceding `@` gives Cypress the crucial hint that this is an alias.

You would do that in a beforeEach ().

```JavaScript
describe('Cypress Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('span').as('spans');
    cy.get('div.terminal').as('terminal');
  });
  ...
});
```

We can now use these aliases in our last test written.

```JavaScript
 cy.get('@spans')
    .contains(step)
    .click();
cy.get('@terminal').should('contain', commands[step]);
```

## Reallife

Our app is very limited, but in a real project, we have forms that we would fill and send.

A test must be shot like this:

```JavaScript
it('create User', () => {
    // go to ne User Form
    cy.get('button.new-user').click();
    // check routing works
    cy.get('.headline').contains('Nutzer anlegen');
    // Type name
    cy.get('input[formcontrolname="name"]').type('Hannes');
    // check validation works and send data
    cy.get('button.save').should('be.enabled').click();
  });
```

## http calls

We can also check whether sending the data works.
For this we need to activate this feature which comes with many other features with the Server Module.
This module offers the possibility to intercept, manipulate or answer http communication.
_That means we don't need to address a backend._

The server module must be started first, this also happens in `beforEach()`.

```JavaScript
cy.server()
```

Optional I can transfer various configurations to the server, you can find this information in the documentation.
Now if we want to mock an end point, it's very easy.

A route is defined like this:

```JavaScript
cy.route(url)
cy.route(url, response)
cy.route(method, url)
cy.route(method, url, response)
```

You see, this API is very flexible.
Here is an example:

```JavaScript
// stub application's call and respond with the given object
cy.route('http://my.api.com', { name: 'Hannes' });
```

As long as the response is so tiny, it is OK to write it directly in the mock (my personal opinion).
But that very rarely corresponds to the real developer life.
Cypress offers the possibility to use mocked data in the form of files as a response.

The folder `cypress\fixtures` is intended for this.
We can store files here, which I can then use as a response.
Here you'll find an example.json.
If we want to use this as a response, we have to write a (strange looking) cypress syntax in the mock instead of the object `{name: 'Hannes'}`,
namely the keyword fixture: followed by the name of the file.

```JavaScript
cy.route('http://my.api.com', 'fixture:example.json');
```

Of course, everyone immediately noticed that I was talking about sending the data, if I don't pass an HTTP method to `.route()`, it's a GET by default.
POST mock would look like this:

```JavaScript
cy.route('POST', 'http://my.api.com/users', 'fixture:example.json').as(
  'new-user'
);
```

_This Endppoint will be available as a alias `@new-user`_ and we can test the request as followed:

```JavaScript
// the test will wait until the application
// makes the POST call to http://my.api.com/users endpoint
// and then we will assert what the application sends
cy.wait('@new-user')
  .its('request.body')
  .should('deep.equal', {
    name: 'Hannes',
    kundennummer: '1597',
  });
```

You see, cypress brings a lot of possibilities and is also fun.

Based on the participants of my workshops, I see that getting started in Cypress is very easy and that you can achieve good test coverage after a short time.

Way more details about Cypress can be found in the <a href="https://docs.cypress.io/">official documentation</a>

Found a typo?
Or wanna add something?
<a href="https://github.com/web-dave/webdave.de/blob/master/src/assets/posts/cypress.md">PR are welcome</a>.

#### Special Thanks

I would like to give special thanks to the awesome people that reviewed this post and gave me pointers:

- <a href="https://twitter.com/mokkapps"  target="_blank">Michael Hoffmann</a>
- <a href="https://twitter.com/bahmutov"  target="_blank">Gleb Bahmutov</a>
- <a href="https://twitter.com/tobmaster"  target="_blank">Tobias Struckmeier</a>
- <a href="https://twitter.com/SchmagaHimself"  target="_blank">Sebastian Kleinschmager</a>
