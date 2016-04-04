# [WIP] riot-progressive-enhancement
An isomorphoc progressive enhancement demo using express, riot, page.js, and superagent.

# What is this?

This repo serves as both a journal website and a tech demo.

# Goals

* Progressively Enhanced (zero JS required--form submission first)
* Isomorphic (can render on server and client)
* Inclusive (you can do everything without JS that you can with JS)
* Mobile First (Referring to much more than @media queries here)
* Insanely Fast (node, http/2, caching, fastclick)
* Secure (https, salt/hash, AES, ENVs)
* Stateless (JWTs)
* Tiny (micro-frameworks)

# Stack

#### Server

Lib | Purpose
-------|---------
Node | server
Express | API/Routing/Middleware
MySQL | Database
Riot | Rendering/templating/data-binding

#### Client

Lib | Prupose | Size (min + gzip)
-----|-----------------|--------
Page | Routing/Middleware | 4.2KB
Riot | Rendering/templating/data-binding | 8.6KB
Pure | CSS | 3.8KB with a custom CDN rollup
Superagent | AJAX | 3.9KB
 | | 20.5KB separately
 | | ~18.8KB packaged together (with CSS separatey)

# Why this stack?

My total client stack size at the moment (browserified/uglified/GZIPped with CSS separate and with none of my own logic) is ~18.8KB. That's pretty great, when you consider that Polymer, React, Angular, Backbone, Ember, and most of the other JS frameworks out there (when bundled with their hard dependencies) are between ~2x - ~8x larger.

Couple this with the fact that this stack can deliver a fully usable web page before any JS assets are even requested by the browser, and we've got a pretty compelling argument for using it.

Granted, React and Angular 2 are both capable of server-side rendering and probably have a lot more developer/community support, but they're a lot bigger and have a much higher learning curve than the components I've listed here. And, hey, new things are fun.

# Scope of progressive enhancement in this project

Progressive Enhancement (PE) is a great big beast to tackle. In this repo, I'm going after a rather limited, though frequently discussed, portion of PE--JavaScript availability. Now, before you assume I'm a crazy who thinks it's 1990, hear me out. By saying "JavaScript availability," I'm not asking whether the user has disabled JavaScript or if the user's browser is capable of running JavaScript (although this code base handles both of these situations like a champ). Rather, I'm referring to scenarios where either `A)` the user's internet connection is not fast enough to download your 100kb angular 1.x browserify bundle in time to make the initial page load [worth the wait](https://econsultancy.com/blog/10936-site-speed-case-studies-tips-and-tools-for-improving-your-conversion-rate/) (twitter encountered this reality and switched from client-side rendering to server-side rendering to address it--you can read about it [here](https://blog.twitter.com/2012/improving-performance-on-twittercom) and [here](http://tomdale.net/2015/02/youre-missing-the-point-of-server-side-rendered-javascript-apps/), and `B)` scenarios in which the user's browser does not run >= ECMAScript 5.

In scenario `A)`, this repo will deliver a usable page on every page load as fast as possible because no page will require JS to work. As of this writing, the landing page is about 6.4kb without JS. In scenario `B)`, because I don't want to make my users download thousands of lines in polyfills, nor do I want to support modern features in old browsers, I'll just let form submissions do what they've always done. A perfect example of a modern practice in an old browser is hash-based routing. This is the default behavior for angular 1.x's router. It's the ugly `/#` in the URL if you don't enable HTML5 Mode. Not only is it ugly, but because browsers don't send anything after the `#` to the server, it also prevents isomorphic rendering.

All this boils down to a server-rendered web page that, if possible, enhances into a single-page app.

# Bennefits of this Progressive Enhancement Approach

* Nearly everyone can use it
* Insanely fast initial page loads
* Becomes a single-page app where internet connections and browser support allow
* Decreased server load when single-page app conversion is successful
* Better SEO (Yes, yes, Google does run JS, but it won't wait several seconds for your JS to download and run and Google is not the only search engine on the planet)

# Deploy

At some point not too long from now, I hope to have all JS bundles generated as part of the deploy script. I also hope to write thorough steps for how to get this running on your own Heroku instance. Additionally, I would like to better organize and clearly outline the code.

# To Do

#### Security:

- [x] Add SSL to database connection
- [x] Change DB password since it has been transferred without SSL while developing
- [x] Ensure that database encrypts data at rest as well as dumps, backups, and logs
- [x] Encrypt JWT
- [ ] Make usernames and passwords require a minimum number of characters
- [ ] Add password resets--this means I need an email address on account creation. Should that just be the "username"?
- [ ] Consider making login requests take longer to make brute force attacks less useful
- [ ] Consider adding two-factor authentication on accounts with 5 failed login attempts in a row

#### Enhancements:

- [x] Add plain-text search for entries
- [x] Paginate the entries list (when querying too)--right now it's limited to the most "recent" 20 items
- [x] Add background save to the New Entry page so hitting back doesn't accidentally get rid of data
- [ ] Add error handling--error's are already sent from the back end but need to be shown on the front end
- [ ] If you click `Cancel` on the New Entry page, delete the background saved entry
- [ ] If you click `Cancel` on the New Entry page and an entry has been background saved, show a confirm modal
- [ ] Delete background saved entry on `Cancel` when on the New Entry page
- [x] Add a loading state when AJAX calls are happening
- [ ] Look into using page.js' `state` object to better handle not loading data I already have
- [ ] Consider adding an HTML post-processor that replaces all custom tags with `<div>`s or something to attempt to increase browser support (currently, this app supports back through IE7, I believe)
- [ ] Add confirm delete page/modal
- [ ] Make `New Entry`, `Edit`, `Delete`, `Save`, and `Cancel` buttons all float in the bottom-right/left of the screen. Lossy buttons should always be on the left.
- [ ] Use http/2 and get `bundle.js` onto a CDN if possible

#### Code Organization:

- [ ] Remove `middleware/service-wrapper.js` to flatten and simplify code
- [ ] Move tag-specific CSS out of `wrapper.ejs` into each tag file and [do this](https://github.com/riot/riot/issues/1250) for server-side rendering

#### Bug Fixes:

- [x] Hide edit/delete buttons when not the entry owner
- [ ] Prevent the back button from allowing users to see data after logging out. It currently only works with the history state immediately before the logout page, perhaps only with JS routing and not form submission routing?
- [x] Hide menu bar when not logged in
- [ ] Prevent empty entry creation
- [x] Disable fastclick on inputs and textareas or consider removing it completely

#### Make Deployable:

- [ ] Use sequelize's `sync` feature so that it can generate the database schema on first run
- [ ] Generate `bundle.js` at deploy so I can remove it from github

... more incoming.
