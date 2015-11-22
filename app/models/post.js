import DS from 'ember-data';

export default DS.Model.extend({
  title:     DS.attr('string'),
  author:    DS.attr('string'),
  createdAt: DS.attr('date'),
  text:      DS.attr('string')
});
