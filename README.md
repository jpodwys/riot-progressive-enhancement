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
Pure | CSS | 5.9KB (with grids-responsive.css)
Superagent | AJAX | 3.9KB
 | | 22.6KB

# Why this stack?

My total client stack size at the moment, before writing any of my own code, is 22.6KB. That's pretty great, when you consider that Polymer, React, Angular, Backbone, Ember, and most of the other JS frameworks out there (when bundled with their hard dependencies) are between ~2x - ~8x larger.

Couple this with the fact that this stack can deliver a fully usable web page before any JS assets are even requested by the browser, and we've got a pretty compelling argument for using it.

Granted, React and Angular 2 are both capable of server-side rendering and probably have a lot more developer/community support, but they're a lot bigger and have a much higher learning curve than the components I've listed here. And, hey, new things are fun.

# Deploy

At some point not too long from now, I hope to have all JS bundles generated as part of the deploy script. I also hope to write thorough steps for how to get this running on your own Heroku instance. Additionally, I would like to better organize and clearly outline the code.

# To Do

#### Security:

- [ ] Add SSL to database connection
- [x] Ensure that database encrypts data at rest as well as dumps, backups, and logs
- [x] Encrypt JWT
- [ ] Make usernames and passwords require a minimum number of characters
- [ ] Add password resets--this means I need an email address on account creation. Should that just be the "username"?

#### Enhancements:

- [x] Add plain-text search for entries
- [ ] Paginate the entries list (when querying too)--right now it's limited to the most "recent" 20 items
- [x] Add background save to the New Entry page so hitting back doesn't accidentally get rid of data
- [ ] Delete background saved entry on `Cancel` when on the New Entry page
- [ ] Add a loading state when AJAX calls are happening
- [ ] Look into using page.js' `state` object to better handle not loading data I already have
- [ ] Consider adding an HTML post-processor that replaces all custom tags with `<div>`s or something to attempt to increase browser support (currently, this app supports back through IE7, I believe)
- [ ] Add confirm delete page/modal
- [ ] Make `New Entry`, `Edit`, `Delete`, `Save`, and `Cancel` buttons all float in the bottom-right/left of the screen. Lossy buttons should always be on the left.
- [ ] Use http/2 and get `bundle.js` onto a CDN if possible

#### Code Organization:

- [ ] Remove `middleware/service-wrapper.js` to flatten and simplify code
- [ ] Move tag-specific CSS out of `wrapper.ejs` into each tag file and [do this](https://github.com/riot/riot/issues/1250) for server-side rendering

#### Bug Fixes:

- [ ] Prevent the back button from allowing users to see data after logging out. It currently only works with the history state immediately before the logout page, perhaps only with JS routing and not form submission routing?
- [ ] Hide menu bar when not logged in and edit/delete buttons when not the entry owner
- [ ] Prevent empty entry creation
- [ ] Disable fastclick on inputs and textareas or consider removing it completely

#### Make Deployable:

- [ ] Use sequelize's `sync` feature so that it can generate the database schema on first run
- [ ] Generate `bundle.js` at deploy so I can remove it from github

... more incoming.
