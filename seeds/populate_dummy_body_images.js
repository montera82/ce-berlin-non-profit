
const seedBodyImages = require('../app/config/config').seedBodyImages;

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('body_image').del()
    .then(function () {
      // Inserts seed entries
      return knex('body_image').insert([
        { id: 1, image_url: seedBodyImages.image_url[1], display_text: seedBodyImages.display_text[1], learn_more_url: seedBodyImages.learn_more_url[1], created_at: new Date(), updated_at: new Date() },
        { id: 2, image_url: seedBodyImages.image_url[2], display_text: seedBodyImages.display_text[2], learn_more_url: seedBodyImages.learn_more_url[2], created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
