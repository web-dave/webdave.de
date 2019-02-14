<strong>Don't get lost in structure</strong>

Most of us started developing Angular apps with one of these many tutorials out in the internet.

All the authors - which I belong to as well - have done a great job showing the basics and these "how-to-get-started"-articles. But these are very small example projects that are far away from a real world app. The real challenge comes mostly if the code grows starting with a certain size of the codebase.

Luckily I had the possibility to participate in several large Angular applications until now. And I realized that all teams are facing the same problems at the beginning of their project:

> Btw these are the questions that I usually hear in my workshops.

In this blogpost I'll try to skim on some examples of what I have come up with as good solutions for myself.

> Please keep in mind: these are my solutions. If you disagree let's discuss this here or on twitter @webdave_de.

Here are the questions and problems:

1.  Which folder structure should I build to stay scalable?
2.  How do I cut modules?
3.  Is it possible to have too much modules?
4.  Which components are there?
5.  What belongs in a component, what in a service?
6.  Where should I provide services?
7.  The imports are too long!
8.  How to keep my code maintainable even for colleagues?

#### Folder structure

Since Angular CLI stepped in most of the Angular projects are scaffold with it. Hence we often have a well known poject structure.

In the project root folder we see some files and three folders: "e2e", "node_modules" and "src"
We want to focus on the `src` folder for now. Here our application code is located.
Inside the "src" folder we'll see the `app` folder where our application logic is located.

So we have a nice starting point. Kudos to the CLI team btw.!

But that's not enough: The next step should be the structure of our application in the `app` folder.

In there we can split the application in some sub folders to organize our code better. It’s very common to do it like that.

First of all we want to create a `feature` folder for our features we want to implement in our app.
We also want to have a `framework` folder and a `shared` folder.

> They seem to be very similar but if we take a look at the functionalities we can see the differences.

* <strong>shared</strong>: is used at multiple places
* <strong>framework</strong>: is used generaly

That’s the outline of our architecture.

<img src="assets/images/folder.png" class="alignnone size-thumbnail wp-image-446" width="400" />

Now let's have a look at a very common user interface (UI).

Most of the apps have a navigation, a header and something very often called "container" or "view".

<img src="assets/images/architecture.png" width="400" class="alignnone size-thumbnail wp-image-446" />
</br>

Those parts together are known as the <strong>app shell</strong>.
The app shell is a very important part of your app. It's visible almost everywher and an important piece of code when you start thinking about Progressive Web Applications (PWAs).

So where would we expect the app shell to be located?
Right: in `framework` folder because it's a generaly used functionality.

#### Cut your code into modules

Next let's talk about the `features`.
To get the idea of the features of an app it's always a good strategy to look at the menu/navigation.

<img src="assets/images/features.png" class="alignnone size-thumbnail wp-image-446"  width="400"/>
</br>

All this entries are features.

> very important principle:

* split your application into features.
* every feature should have it’s own module.

  that’s called <strong> single responsibility principle (SRP)</strong>

in fact that means:

* <h3>no amme <small>(a module managing everything)</small></h3>
* <h3>no asme <small>(a service managing everything)</small></h3>
* <h3>no acme <small>(a component managing everything)</small></h3>
* <h3>no adme <small>(a directive managing everything)</small></h3>

#### FAQ

> <i>Q: But if I split everything into modules it is possible to have too many modules?</i>

A: No! The maintainability grows by the number of modules. Split your app into modules and your modules into sub modules

#### Type of components

So what about Components? Components represent the UI stuff of our app. We can break them up into two categories:

container components and presentational (or dumb) components.

1.  Container Components can host other components and logic. They are connected to services to get data maybe from an api and provide this data to their child components
2.  Dump Components have no dependencies, they only have logic which is directly used for their view. They get all the data they need through the @Input decorators, communicate with their parents through @Output decorators
    and they are reusable.

<img src="assets/images/components.png" class="alignnone size-thumbnail wp-image-446" width="400" />

Just a small explanation of the connection and the data flow here

We have a container component with some logic and it holds some presentational components.
All the data the presentational components need are passed through the @Input decorators. If they want to talk to their parents they would make use of an @Output decorator. If we use a service for some stuff we only use it in the container component.

<img src="assets/images/dataflow.png" class="alignnone size-thumbnail wp-image-446" width="400" />

To identify these kind of components take a look at the mockups. Sections which can be splitted into smaller parts are container components.

<img src="assets/images/container_component.png" class="alignnone size-thumbnail wp-image-446"  width="400"/>
</br>

Those small parts can be presentational components

<img src="assets/images/dump_component.png" class="alignnone size-thumbnail wp-image-446"  width="400"/>
</br>

#### Reuse code

Components can be reused but logic can be reused, too. We can relocate logic into services.

Almost all logic in am app should fit to one of the following categories:

1.  View logic
2.  Reusable logic (the logic we copy ‘n paste in a bunch of components)
3.  Logic to call the api and manage the data
4.  All the other logic ;)

> Dont mess arround with the dependency tree. Provide the logic at the top most point where it is needed. It might be a component or a module or even another service.

#### Stay maintainable

Maybe your structure is very deep.
And this means you have looooong imports.

```javascript
import { MyService } from "../../../shared/my/logic/services/my-service/my.service";
```

That's no problem if your IDE is able to manage the imports automatically but if you move modules to another place, it can get hard to refactor and maintain. Yes it is a pain but there is a solution.

`pathmap`.
The pathmap is an awesome typescript feature. You can define a mapping table in your tsconfig.json

<strong>tsconfig.json</strong>

```javascript
 "compilerOptions": {
   ...
   "baseUrl": "src",
   "paths": {
     "@my-logic/*": ["app/shared/my/logic/services*"],
   }
 },
```

which can maybe change your developer live

```javascript
import { MyService } from "@my-logic/my-service/my.service";
```

#### Follow the style guide

that’s the structure of our companies feature

<img src="assets/images/naming-conventions.png" width="400" class="alignnone size-thumbnail wp-image-446" />

The naming conventions is very important.

* Modules should be named as `.modules`
* componnet should be named as `.components`
* etc

find meaningful names for your classes, methods and attributes.

> I once was fighting with a project where every method and every file had a variable called tmp!
> that was not helpful at all

You'll find the styleguide <a href="https://angular.io/guide/styleguide" target="_blank">here</a>

#### Conclusion

Huge apps are easy to maintain, if you follow some rules and use the awesome features of Angular CLI and Typescript. Don't be scrared, it's just Angular ;)

#### Special Thanks

I would like to give special thanks to the awesome people that reviewed this post and gave me pointers:

* <a href="https://twitter.com/bobrov1989" target="_blank">Vitalii Bobrov</a>
* <a href="https://twitter.com/FabianGosebrink" target="_blank">Fabian Gosebrink</a>
* <a href="https://twitter.com/mhartington" target="_blank">Mike Hartington</a>
* <a href="https://twitter.com/niklas_wortmann" target="_blank">Jan-Niklas Wortmann</a>
* <a href="https://twitter.com/Sureshkumar_Ash" target="_blank">Ashwin Sureshkumar</a>

Thanks, guys! It means a lot!

<small><i>thx HQLabs for the screenshots</i></small>
