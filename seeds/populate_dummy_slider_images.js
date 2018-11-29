
const seedSliderImages = {
  image_url_1: '/sliders/placeholder_image_1.jpg',
  image_url_2: '/sliders/placeholder_image_2.png',
  image_url_3: '/sliders/placeholder_image_3.jpg'
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('slider').del()
    .then(function () {
      // Inserts seed entries
      return knex('slider').insert([
        {id: 1, image_url: seedSliderImages.image_url_1, created_at: new Date(), updated_at: new Date()},
        {id: 2, image_url: seedSliderImages.image_url_2, created_at: new Date(), updated_at: new Date()},
        {id: 3, image_url: seedSliderImages.image_url_3, created_at: new Date(), updated_at: new Date()}
      ]);
    });
};
