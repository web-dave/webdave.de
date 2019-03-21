<strong>I love StackBlitz</strong>

Stackblitz is an awesome tool for prototyping and for sharing live examples. But it can do even more: With StackBlitz you can kick off a GitHub repo with little to no effort.

And you can run unit tests, too.

Here I want to show you how to run your Karma / Jasmine tests within StackBlitz.

First things first, though.

### What is StackBlitz?

StackBlitz is an online live editor based on Visual Studio Code. You can use the same keyboard shortcuts which are availabe in your local installation.

#### My favourite key bindings (on Windows)

| Keys                 | Function                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| `alt+key-up`         | Move the line where the Cursor is located one line up                       |
| `alt+key-down`       | Move the line where the Cursor is located one line down                     |
| `alt+shift+key-up`   | Copy the line where the Cursor is located one line up                       |
| `alt+shift+key-down` | Copy the line where the Cursor is located one line down                     |
| `ctrl+d`             | Set Multi Cursor. On the selected word and the next occurrence of that word |
| `ctrl+#`             | comment the line where the cursor is located                                |

#### StackBlitz and GitHub

Often you want to show your projects to someone or you want to test something in a project.

With StackBlitz this is a no-brainer.

Just visit

```bash
https://stackblitz.com/github/userName/repoName
```

to open your master Branch in the Browser

or

```bash
https://stackblitz.com/github/userName/repoName/tree/branch
```

to open a specific Branch.

Stackblitz can run your JavaScript project no matter the framework.

#### Set up for Karma and Jasmine

To run your unit tests in StackBlitz you have to add some config in the `main.ts`.

```ts
// Import Jasmine from node_modules
import jasmineRequire from 'jasmine-core/lib/jasmine-core/jasmine.js';
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';

import './polyfills';

import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// declare it in the window object
window['jasmineRequire'] = jasmineRequire;

// setup jasmine as a global var
declare var jasmine;

// Spec files to include in the StackBlitz tests
import './tests.sb.ts';

//

bootstrap();

//

function bootstrap() {
  if (window['jasmineRef']) {
    location.reload();
    return;
  } else {
    window.onload(undefined);

    window['jasmineRef'] = jasmine.getEnv();
  }

  // First, initialize the Angular testing environment.
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
}
```

But for now, we have no Jasmine Styling
We have to add it in the `styles.scss`

```scss
@import '~jasmine-core/lib/jasmine-core/jasmine.css';
```

Maybe, you already noticed this line in the `main.ts`

```ts
// Spec files to include in the StackBlitz tests
import './tests.sb.ts';
```

In this file, we have to import all the testing files `(*.spec.ts)`.

Here is an example:

```ts
import './app/app.component.spec.ts';
import './app/my-nav/my-nav.component.spec.ts';
```

That's it.

## Yes, it's that easy!

#### credits

Thx to

- <a href="https://twitter.com/gnomeontherun" rel="noopener" target="_blank">Jeremy Wilken</a> for the inspiration.
- <a href="https://twitter.com/bwilmsmann" rel="noopener" target="_blank">Björn Wilmsmann</a> for Spelling, style and grammar checks.
- <a href="https://twitter.com/GregOnNet" rel="noopener" target="_blank">Gregor Woiwode</a> for Spelling, style and grammar checks.
