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

There's a generator for components:

    ember generate component create-new-post --pod

The generates a template, a js file to back it, and a test.

WTF does `--pod` do? This specifies the structure as `pod`, meaning
that all of the files relating to a component are placed in the
same directory.


## Helpers

HTMLBars helpers create html elements, while action helpers call
js functions:

    <form id=NewPost>
        <p>
            {{input value=newPost.title placeholder="Title"}}
            {{input value=newPost.autor placeholder="Author"}}
        </p>
        <p>
            {{textarea value=newPost.text
                       placeholder="Content"
                       rows="10"
                       cols="140"
            }}
        </p>
        <p>
            <button {{action "createPost"}}>Publish</button>
        </p>
    </form>

## Adding a component to a template

    {{#create-new-post}}{{/create-new-post}}


## Creating actions

Actions are just functions defined inside the `actions {}` of an
`Ember.Component`:

    export default Ember.Component.extend({
      actions: {
        createPost: function() {
          console.log("createPost function applied");
        }
      }
    });

To actually pass data from a template to an action, we need pass the
`model`. First we define an empty object as the model for the index
route: *TODO: Why???* I guess cos index is the template that holds the
search component...

    export default Ember.Route.extend({
      model: function() {
        return {};
      }
    });

Next we pass that index model through from the index template to the
create-new-post action::

    {{#create-new-post newPost=model createPost="createPost"}}
    {{/create-new-post}}

And inside the component template we need to pass the post object to
the createPost action:

    <button {{action "createPost" newPost}}>Publish</button>

Then receive this model in the action:

    createPost: function (newPost) {
      console.log("createPost", newPost);
    }

Next we need to send the action up the chain with the model: *TODO:
where does it get sent???* interesting that it throws an error if
we don't handle this action.. apparently it goes up to the *index
route*...

    createPost: function (model) {
      this.sendAction ('createPost', model);

      this.set ('model.title', null);
      this.set ('model.author', null);
      this.set ('model.content', null);
    }

Now in the *index route* (of all places!) we send the model to our
firebase store (we re-define the createPost action the same way again
here...)

    actions: {
      createPost: function (model) {
        let post = this.store.createRecord(
          'post', {
            title: model.title,
            text: model.text,
            author: model.author,
            createdAt: new Date()
          }
        );
        post.save();
      }
    }

