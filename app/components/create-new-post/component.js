import Ember from 'ember';

export default Ember.Component.extend({
  actions: {

    createPost: function (newPost) {
      this.sendAction ('createPost', newPost);

      this.set ('newPost.title', null);
      this.set ('newPost.author', null);
      this.set ('newPost.text', null);
    }

  }
});
