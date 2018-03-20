OK, most of us started developing Angular Apps with one of these tutorials.

All authors of this tutorial have done a great job (I am also one)
But these are very small example projects that are far away from a real world example app.
The real challenges come mostly from a certain size of the codebase.

I'm now in the lucky situation that I was already allowed to participate in several large Angular apps.

And I realized that all teams are facing the same problem at the beginning.
btw these are the questions that I hear most often in my workshops.

I'll try to skim on some examples of what I have come up with as good solutions for myself.


<blockquote>
It is important: these are my solutions. Maybe you disagree, then let us discuss this, here or on twitter.</blockquote>


Here are the questions and problems:
<ol>
	<li>Which folder structure should I have with my app to stay scalable?</li>
	<li>Where do I cut modules?</li>
	<li>Is it possible to have too much modules?</li>
	<li>Which components are there?</li>
	<li>What belongs in a component, what in a service?</li>
	<li>Where should I provide services?</li>
	<li>The imports are too long!</li>
	<li>How is my code maintainable, even for colleagues?</li>
</ol>

<h2>Folder structure</h2>

Since Angular CLI steped in, most of the Angular Projects are scaffold with it.
That means we very often have a well known Project structure.

<img src="https://www.webdave.de/wp-content/uploads/2018/03/architecture_1-150x150.png" alt="" width="150" height="150" class="alignnone size-thumbnail wp-image-446" />

In the project root we see some files  and three folders (e3e, node_modules, src)
We want to focus on the <code>src</code> folder.
Her is our application code located.
in ther we'll find the <code>app</code> where our application logic is located.

So we have a nice stort point. kudos to the cli team.

But that's not enough, we want to structure our application in the <code>app</code> folder.

in there we decide to split in some sub folders to organize our code.
it’s very common to do it like that.


First of all, we want to create a <code>feature</code> folder for our features we want to implement in our app.
We also want to have a <code>framework</code> folder and a <code>shared</code> folder.

<blockquote> They seem to be very similar, but if we take a look at the funtionalities we can see the different.</blockquote>

<ul>
	<li><strong>shared</strong>: is used at multiple places</li>
	<li><strong>framework</strong>: is used generaly</li>
</ul>

That’s the outline of our architecture.

Ok, now let's have a look at a very common UI.

Most of the apps have a navigation, header and something very often called container or view.

# IMG_2

Those together are known as <strong>app shell</strong>.
The appshell is a very important part of your app. it's almost everywhere visible and a importatnt piece of code when you start thinking about PWA.

So where would we expect it to be located?
Right in <code>framework</code> because it's a general used functionality.

<h2>Cut your code into modules</h2>

Next let's talk about the <code>features</code>.
To get a glu of the features of a app it's always a good strategy to take a look at the menu/navigation.

# IMG_3

All this entries are features.

<blockquote>very important priciple:
split your modules by features.
every feature should have it’s own module.
that’s called
single responsibility
ore 
single responsibility of concern
</blockquote>

in fact that means:
<ul>
	<li><h3>no amme <small>(sorry sheldon)</small></h3></li>
<li><h3>no asme</h3></li>
<li><h3>no acme <small>(sorry bugs bunny)</small></h3></li>
<li><h3>no adme</h3></li>
</ul>

<h2>FAQ</h2>

<i>Q: But if i split everything into modules, it is possible to have to many modules?</i>

A: No! The maintainability grows by the number of modules.Split your app into modules and your modules into sub modules

# IMG_4

<h2>Type of components</h2>

OK, whats about Components?
They are the UI stuff of our app.
we can break them into two categories:

container components and prenetional (or dump) components.
<ol>
<li>Container Components are hosting components and logic. They are connected to services to get data from the api and provide this data to their child componnets</li>
<li>Dump Components have no dependencies,
they only have logic which are directliy used for the view they get all the data they need through the @Inputs, they communicate with their parents through @Outputs
and they are reusable.</li>
</ol>

# IMG_4

Just a small explanaiton of the connection and the data flow here


we have a container with some logic
and it holds some presentational components
all data these presentational components need are coming though the @Inputs
and if the want to talk to their parents, the use the @Output.
If we use a service for some stuff we only use it in the container.

# IMG_6

To identify these kind of Components, take a look at the mookups. Sections which can be splitted into smaller parts are container Components.

# IMG_7

Those small parts can be presentational Components

# IMG_8

<h2>Reuse code</h2>

So, components can be reused, but logic can be reused also.
We can relocate logic to services.

Almost all logic in a app could fit to one of these categories:
<ol>
<li>View logic</li>
<li>Reused logic (the logic we copy ‘n paste in a bunch of components)</li>
<li>Logic to call the api and manage the data</li>
<li>All the other logic ;) .</li>
</ol>

<blockquote>Dont mess arround with the dependency tree.
Provide them at the top most point where they are used.
It might be a component or a module or even another service
</blockquote>

<h2>Stay maintainable</h2>

Maybe your structure is very deep.
and this means you have looooong imports.

# IMG_9

Thats no problem if your IDE is able to manage the imports automaticly, but if you move modules to another place, it’s hard to refactor.
Yes it is a pain, but there is a solution.

<code>pathmap</code>. 
It's a awesome typescript feature.
you define a mapping table in your tsconfig.json

# IMG_10

and you maybe change your developer life

# IMG_11

<h2>Follow the style guide</h2>

that’s the structure of our companies feature

# IMG_12

The naming conventions is very important.

<ul>
<li>Modules should be named as <code>.modules</code></li>
<li>componnet should be named as <code>.components</code></li> 
<li>etc</li>
</ul>
find meaningfull names for your methods and attributes.
<blockquote>I once was fighting with a project where every method and every file had a variable called tmp!
that is not helpfull</blockquote>





