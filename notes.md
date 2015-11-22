Ember uses HTMLBars templates. In HTMLBars an `outlet` is a special
location that another template can be programmatically rendered in.

For example, when we load the app we enter the index route by
default. If present, the app will look for a template named
`index.hbs` and render it into the outlet in `application.hbs`.

## Generators:

    ember generate route index

This example creates an `index.hbs` file, a `routes/index.js` file and
a `tests/unit/routes/index-test.js` file.


    ember generate model post title:string author:string
    createdAt:date text:string

## Components

Ember components currently consist of:
* a component template
* javascript backing the template

The basic idea is to pass data into a component, and have the
component render a template to the browser with that data.
