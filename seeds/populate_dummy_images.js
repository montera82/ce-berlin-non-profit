
const seedImages = require('../app/config/config').seedImages;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('slider').del()
    .then(function () {
      // Inserts seed entries
      return knex('slider').insert([
        {id: 1, image_url: seedImages.image_url_1, created_at: new Date(), updated_at: new Date()},
        {id: 2, image_url: seedImages.image_url_2, created_at: new Date(), updated_at: new Date()},
        {id: 3, image_url: seedImages.image_url_3, created_at: new Date(), updated_at: new Date()}
      ]);
    });
};
