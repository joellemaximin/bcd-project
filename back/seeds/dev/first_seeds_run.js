
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {id: 1, title: 'Gravure et impression technique et création', editor: 'Edition Eyrolles', author: 'Judy Martin', category_id: '1', collection: '', oeuvre: ''},
        {id: 2, title: 'Poule rousse', editor: 'Les classiques en musique', author: 'Pere Castor', category_id: '2', collection: '', oeuvre: ''},
      ]);
    });
};
