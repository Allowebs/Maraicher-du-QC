[![Build Status](https://travis-ci.org/teikei/teikei.svg?branch=master)](https://travis-ci.org/teikei/teikei) [![Code Climate](https://codeclimate.com/github/teikei/teikei.png)](https://codeclimate.com/github/teikei/teikei) [![Dependency Status](https://www.versioneye.com/user/projects/52e534e8ec13750d0c0001ba/badge.png)](https://www.versioneye.com/user/projects/52e534e8ec13750d0c0001ba)

# Teikei

A web application for managing groups and farmers following the idea of [community-supported agriculture (CSA)][csa]. The framework is used for the [Ernte teilen][ernteteilen] website which is shown in the screenshot.

![Ernte teilen](screenshot.png "Ernte teilen")

## Getting started

The framework consists of two components: the API back-end and the front-end. The back-end is based on [Ruby on Rails][rubyonrails]. Data is exchanged as JSON. The front-end is built with the help of [Marionette.js][marionettejs] and [Backbone.js][backbonejs]. The website is designed to work as a single-page-application, at least for the major parts of the interface.

### Settings

You need to create an `.env` file which contains the environment variables needed to run the project. The included `.env.sample` file lists the variables which need to be set.

### External dependencies (package managers)

Unlike most classic Rails projects, this application uses separate package management for its client-side dependencies. In order to build the front-end of this application, you will need [bower][bower] in addition to Bundler. Bower will install all external client-side packages into the `/vendor/assets/bower_components` folder.

#### Installing/updating dependencies:

1. Run `bundle install` (installs Ruby dependencies)
2. Run `bower install` (installs client-side dependencies)

#### Prerequisites for using bower:

- a working [node.js][nodejs] installation
- a global installation of [Bower][bower]: `npm install -g bower`

### Test data

* A superadmin account can be generated by running `rake db:seed`.
* Test data in general (users, farms, depots, faqs) can be generated by running `rake db:seed:generate`.
* The task `rake db:seed:all` runs both tasks mentioned before.

## Roadmap

We use [the GitHub issue tracker](https://github.com/teikei/teikei/issues) to plan upcoming features and track our bugs. If you want to participate, it's probably a good idea to look for open issues there. Before working on bigger features, however, it's advisable to get in contact with us, so that we can coordinate progress a little.

## Known issues

On Ubuntu there might be an issue running `bundle install`. There is a dependency for `libcrypto.so.0.9.8`. To circumvend the problem install `libssl0.9.8`.

## Authors & contributors

* [Simon Jockers][sjockers]
* [Christian Rijke][cnrk]
* [Tobias Preuss][johnjohndoe]
* [Daniel Mack][zonque]

## License

* The Teikei source code is released under the [AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.html)
* Assets in this repository are released under the [Attribution-ShareAlike 4.0 International CC license](http://creativecommons.org/licenses/by-sa/4.0/)

[ernteteilen]: https://ernte-teilen.org
[csa]: http://en.wikipedia.org/wiki/Community-supported_agriculture
[sjockers]: https://github.com/sjockers
[cnrk]: https://github.com/cnrk
[johnjohndoe]: https://github.com/johnjohndoe
[zonque]: https://github.com/zonque
[trello]: https://trello.com
[rubyonrails]: http://rubyonrails.org
[backbonejs]: http://backbonejs.org
[marionettejs]: http://marionettejs.com
[bower]: http://bower.io
[nodejs]: http://nodejs.org
