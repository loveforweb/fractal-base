'use strict';

/*
 * Require the path module
 */
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = (module.exports = require('@frctl/fractal').create());

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Sports Score Card');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'ui'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

/*
 * Tell Fractal where to put the build files
 */
fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Tell Fractal what is your default preview page
 */
fractal.components.set('default.preview', '@preview');
