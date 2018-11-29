const seedBodyImages = {
  image_url: {
      1: '/body_images/placeholder_image_1.jpg',
      2: '/body_images/placeholder_image_2.png'
  },
  display_text: {
      1: 'We provide branding & marketing services mostly as digital solutions to match the reality of web design, development & branding. Our clients\' trust proves that we chose the right path when we began to offer these services.',
      2: 'We provide branding & marketing services mostly as digital solutions to match the reality of web design, development & branding. Our clients\' trust proves that we chose the right path when we began to offer these services.',
  },
  learn_more_url: {
      1: 'https://learn_more.org',
      2: 'https://learn_more.org'
  }
}

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
