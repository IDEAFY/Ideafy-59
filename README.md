This repository contains a version of the Ideafy source code for the purpose of 59DAYSOFCODE.

WHAT IS IDEAFY ?
===============

Ideafy is a cost-effective software platform designed to boost enterprise innovation and allow employees and/or external contributors to take an active part in the process.

Ideafy seamlessly integrates collaborative brainstorming and innovation management software into a user-friendly application for both tablets and PCs. Entirely based on web technologies (nodejs, couchdb, HTML5), the solution can be easily deployed for as many users as required with no other cost to the customer but the server license and the hardware infrastructure (in-house or PaaS) necessary to support it.

WHO DEVELOPS IDEAFY ?
=====================

Ideafy is a platform including client and server software that leverages a LOT of components.

On the server side:
It runs on nodejs.
It interfaces with Apache CouchDB.
It utilizes couchdb-lucene (http://rnewson.github.com/couchdb-lucene/ for full text search)
It takes advantage of socket.io for realtime web communications 
It uses the popular connect framework designed by Sencha Labs and plenty of middleware (cookies, parsing, sessions, caching etc.)
It sends outgoing emails using nodemailer (http://nodemailer.com/)

On the client side:
Here it is mostly about HTML5, CSS and javascript.
For the time being several methods and CSS properties (e.g. --webkit-) are used which are not supported by browsers other than webkit-based (e.g. Chrome and Safari).
Deployment on iPad is done using Apache Phonegap and has been fully tested (the main application is live at http://appstore.com/ideafy).
Deployment on Android platforms has been tested with SDK simulators and is not officially supported as of yet.

	What do we actually DO then ?

We try to magically make all the above work together and deliver great user experience and great features for our users and enterprise customers.

Ideafy includes:

1) A complete MVC framework developed in javascript including a component drastically simplifying communication with couchdb.
This framework currently consists of 3 components : Emily.js, Olives.js and couchdb-emily-tools.
Its author is Olivier Scherrer and Olivier is part of the Ideafy team.

2) Server and client source code.
The server code is located at the root of the repository. It currently consists of a main server file and several javascript modules. The application is launched using node server-main.js
The client code is located in the public/ directory for browser clients. The phonegap code for iPad (that can be used to deploy via Xcode) will be added to the repository as well.
The main components of the applications can be accessed in the public/js-default directory and include:

- the public wall (public ideas and content)
- the private library (my ideas / my decks / my sessions)
- the brainstorming engine (single / multi-user)
- the communication center (messages / contacts / twocents & twoquestions)
- the dashboard (profile / settings / about)

Vincent Weyl is the author of this code and also the founder and CEO of Ideafy LLC


3) User experience and content. 
The directory public/img contains a collection of custom-made icons and a library of licensed pictures used throughout the application.
New icons and visuals are currently in development and will be designed by Rudy Contreras who is a member of the Ideafy team.


59DAYSOFCODE SCOPE OF WORK
===========================

Ideafy obviously competes in the work in progress category.
Below are the scope of work and objectives for the 59DAYSOFCODE EVENT:

	IDEAFY 59 -- What are we competing with ?

We are entering the competition with:

1- a business proposal (innovation management for businesses through a unique combination of idea generation, idea management, social networking and serious gaming)

2- a technology & product proposal (a web application for browser clients and mobiles using an open-source javascript MVC framework developed by Olivier and proprietary features and functionalities developed by Vincent)

3- a user-experience proposal (a UI refresh of Ideafy proposed by Rudy)

This is how we split the roles and responsibilies - (this sounds so serious... well it is... in some way)


BUSINESS PROPOSAL (lead: Vincent)

Given the short time frame, the business proposal will not evolve much from the existing Ideafy pitch. It will include a few of the Ideafy R2 features, most importantly “official browser support”, ie. it is no longer an iPad app but a business-grade solution ready for sale.

Good news is we have the product positioning, market experience, go-to-market strategy, business plan and first client feedback. All we need to do (:-0 !!!) is to provide, nice, crispy-looking and convincing deliverables.

PRODUCT PROPOSAL

A). Framework (lead: Olivier)

The deliverable will include and feature the latest delivery of Olivier’s framework with the most notable evolutions:

		- removed dependency on requirejs
		- split of emily, olives into smaller, separately-available components
		- refactoring of couchdb-emily-tools required by the above split
		- couchdb-emily-tools evolutions / bug fixes
		- fix unsync() function to avoid socket hang up error
		- fix truncated json issue for large documents
		- pass optional admin parameters for CouchUser create function

B). Application (lead: Vincent)

Given the short time frame and the demands of the event, only a few of the scheduled developments of Ideafy R2 can be included. A lot of the focus will be placed on the platform and client-support to ensure a ready-to-sell (not just demo) end result.

	Server-side
		Adapt / rework the server-side code to the new framework
		Performance optimization
		Packaging (npm install ideafy!)
		Functional evolutions (scheduled notifications)

	Client-side
		Adapt / rework the client-side code to the new framework
		Functional evolutions
		Scheduled multi-user sessions
		Table mode sessions
		UI enhancements
		iOS (iPad), browser (chrome and safari) and mobile browser (iOS and Android) deliverables

USER EXPERIENCE PROPOSAL (lead: Rudy)

One of the key differentiator of Ideafy as a business software is the user-experience concept and a new way for users to interact with enterprise software.
While some of this is inherent to the delivery model (web-based, cloud-based, availability on any device through browsers or mobiles with rich-client experience and at anby time) a huge part is based on the look and feel of the product.

Building on the existing Ideafy concept,the deliverable for 59daysofcode will take us one step further to a finished product:

	Revisit the overall visual identity and squirrel theme
	Adapt existing app accordingly (CSS templates, color schemes)
	Propose new app splash screen and background (see work done for Total)
	Propose new app icon
	Rework certain (all?) app icons to make them crisper / easier to understand
	Replace flag icons with real photos for characters

This work will be the basis of the visual identity used throughout the event including the various presentations. It should be consistent with the existing Ideafy logo and allow reuse of existing Ideafy brochures.


OPERATIONAL ASPECTS
===================

ACCESSING THE 59DAYSOFCODE DEMO PLATFORM

A dedicated Ideafy instance has been setup for the 59daysofcode event.
It is located at http://ideafy59.ideafy.com. This is a SmartOS machine hosted by Joyent.

To access the demo from a browser only type in the URL.
The default port is forwarded to the application's port and the index.html file will be served, redirecting client to the proper version.

To access the development platform, currently enter the URL http://ideafy59.ideafy.com:5959/index-dev.html


RUNNING IDEAFY ON IPAD

The Xcode project will be added to the repository prior to the event deadline.


SETTING UP AN IDEAFY INSTANCE

-- PRE-REQUISITES

In order to run an Ideafy instance, you need:
- node v0.10.26 or later
- couchdb 1.4 or later (require erlangR16.1)
- redis-server
- a working build of couchdb-lucene
- a SMTP server to send mail notifications

-- INSTALLATION

To install Ideafy, for the time being :

	git clone https://github.com/59DAYSOFCODE/Ideafy.git
	
Then run Ideafy with :

	node server-main.js

-- CONFIGURATION

Before you launch the Ideafy server, make sure you update the configuration settings.
For the time being they are centralized in the server-main.js file.

Configuration settings include:

- IP address and port of the redis server
- SMTP server parameters and login credentials for nodemailer
- Name, IP address, port and admin credentials for the database
- Name and secret for the cookie configuration (needs to be configured in couchdb-emily-tools as well)
- path to file storage (e.g. mount drive) for attachments and other user-generated contents

-- BUILDING GUIDELINES

The client code is currently build using requirejs optimizer.
Edit the rbuild.js file in the root directory to select target and adjust dependencies.
By default the output is the /built directory.

Run the command:

	./tools/r.js -o rbuild.js
	
All javascript files/modules are concatenated and minified in the ./built/main.js file.
Copy main.js file to target directory and add the script to the appropriate index file (e.g. index-defautl.html or index-touch.html).








