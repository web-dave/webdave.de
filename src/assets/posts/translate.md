<strong>Translate (i18n) your Angular Apps with @ngx-translate/core</strong>

Our apps are used by different people, with differnet languages and different gender. So, to provide them the best experience, we want to provide them the content of the app in their language, or we want to address our customers according to their gender.
This is only possibile with some translating tools. Angular has one on board, (@angular/i18n) wich is not very handy, in my opinion.
I would like to introduce you to a nice alternative here

#### @ngx-translate/core

##### How to use @ngx-translate/core?

OK, first of all we have to install @ngx-translate/core.

```bash
npm install @ngx-translate/core –save
```

Then we have to import the TranslateModule into our application as you would any other module.

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [BrowserModule, TranslateModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

> Here we want to introduce the TranslateModule for the first time, when we need to translate in other modules, we also have to import it there. But only in your root module do we want to instantiate the TranslateModule and all the things (like services) we get from there. so we need to call the forRoot method and in a child module we would call the forChild () method

Now we have to initialize the TranslateModule

```javascript
...
export class AppModule {
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the language to use, if the language isn't available, it will use the current loader to get them
    this.translate.use("en");
  }
}
```

#### Define the translations

Put your translation files in a json file which will be imported by the TranslateHttpLoader
The following translations should be stored in en.json

```json
{
  "HELLO": "hello {{value}}"
}
```

4.  Use the Service, Pipe or the Directive
    TranslateService

```javascript
// app.component.ts
translate.get("HELLO", { value: "world" }).subscribe((res: string) => {
  console.log(res); //=> 'hello world'
});
```

TranslatePipe

```javascript
// app.component.ts
param = { value: "world" };
```

```html
// app.component.html
{{ 'HELLO' | translate:param }}
```

TranslateDirective

```html
// app.component.html
<h3 translate="HELLO" translate-params="{value: 'world'}" ><h3>
```

#### pluralization and gernderization with ngx-translate-messageformat-compiler

Compiler for ngx-translate that uses messageformat.js to compile translations.
It uses ICU syntax for handling pluralization and gender

#### Installation

This assumes that you've already installed <a href="https://github.com/ngx-translate/core" rel="noopener" target="_blank">ngx-translate</a>

```bash
npm install ngx-translate-messageformat-compiler messageformat --save
```

Setup
You need to configure `TranslateModule` so it uses `TranslateMessageFormatCompiler` as the compiler:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
...
}
```

Please note that while you can still use nesting in your translations (`{ login: { welcome: 'Welcome!' }}`) with respective keys (`login.welcome`), you lose the ability to access object properties in your placeholders: `'Hello {name.first} {name.last}'` won't work. Also note that this format uses single braces instead of double braces for placeholders.

#### Load translation files

To load the files we have to define a loader.
By default, there is no loader available. You can add translations manually using setTranslation but it is better to use a loader. You can write your own loader, or import an existing one. For example you can use the TranslateHttpLoader that will load translations from files using HttpClient.
To use it, you need to install the http-loader package from @ngx-translate:

```bash
npm install @ngx-translate/http-loader --save
```

There are two types of translation files out there. .json and .po
There is a loader for po files aswell but it uses the deprecated Http service so we have to go with our own (because of HttpClient):

```javascript
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { TranslateLoader } from "@ngx-translate/core";
import * as gettext from "gettext-parser";

export class TranslatePoHttpLoader implements TranslateLoader {
  public domain = "";

  constructor(
    protected _http: HttpClient,
    protected _prefix: string = "i18n",
    protected _suffix: string = ".po"
  ) {}

  // Gets the translations from file
  public getTranslation(lang: string): Observable {
    return this._http
      .get(`${this._prefix}/${lang}${this._suffix}`, { responseType: "text" })
      .map((contents: string) => this.parse(contents));
  }

  // Parse po file
  public parse(contents: string): any {
    const translations: { [key: string]: string } = {};

    const po = gettext.po.parse(contents, "utf-8");
    if (!po.translations.hasOwnProperty(this.domain)) {
      return translations;
    }

    Object.keys(po.translations[this.domain]).forEach(key => {
      const translation: string = po.translations[this.domain][
        key
      ].msgstr.pop();
      if (key.length > 0 && translation.length > 0) {
        translations[key] = translation;
      }
    });

    return translations;
  }
}
```

Config the translateService to load the translation from files and use the TranslateMessageFormatCompiler

```javascript
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};

export function createPoTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, "assets/i18n", ".po");
}

@NgModule({
  imports: [
    ...
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createPoTranslateLoader,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      },
      useDefaultLang: true
    })
  ]
  ...
})
export class AppModule {
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
  }
}
```

Translation files
Files look like this
en.po

```text
msgid ""
msgstr ""
"Project-Id-Version: Lingohub 1.0.1\n"
"Report-Msgid-Bugs-To: support@lingohub.com \n"
"Last-Translator: Marko Bošković \n"
"Language: en\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"

msgid "greetings"
msgstr "Hi {gender, select, Male {Mr.} Female {Mrs.} other{dude}}"

msgid "words"
msgstr "{count, plural, =0{No} one{A} other{#}} {count, plural, one{word} other{words}}"

msgid "dude"
msgstr "Coder!!!!!!"
```

en.json

```json
{
  "greetings": "Hi {gender, select, Male {Mr.} Female {Mrs.} other{dude}}",
  "harish": "Coder!!!!!!",
  "words":
    "{count, plural, =0{No} one{A} other{#}} {count, plural, one{word} other{words}}"
}
```

How to use it in templates:

```html
<h3>{{ 'greetings' | translate:{gender: Male} }}</h3>

<h4>{{ 'words' | translate:{count:7} }}</h4>
```

```javascript
// Use the service
Controller: this.translate.get("harish").subscribe(h => console.log(h)); //=> Coder!!!!!!
```

Credits:
Thx <a href="https://twitter.com/SebFlorian" rel="noopener" target="_blank">@SebFlorian</a>, <a href="https://twitter.com/tobmaster">@tobmaster</a> <a href="https://twitter.com/Sureshkumar_Ash" rel="noopener" target="_blank">@Sureshkumar_Ash</a> for reviewing.
