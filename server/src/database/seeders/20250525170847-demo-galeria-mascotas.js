'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('galeria_mascotas', [
      { foto: 'https://media.istockphoto.com/id/2195402595/es/foto/golden-retriever-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=ShXlKX2L2-gePDrlyEWqVeJK0KAuiUgLJI24Av_t6y0=', mascotaId: 1 },
      { foto: 'https://images.unsplash.com/photo-1625794084867-8ddd239946b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRlbiUyMHJldHJpZXZlcnxlbnwwfHwwfHx8MA%3D%3D', mascotaId: 1 },
      { foto: 'https://media.istockphoto.com/id/1838410260/photo/cute-labrador-retriever-puppy-playing-with-ball-on-green-grass-in-park.jpg?s=612x612&w=0&k=20&c=3nJXtcvv7yTfvY1ZBFrwvFV5RkSnDmg7b5thQdZtWFE=', mascotaId: 2 },
      { foto: 'https://media.istockphoto.com/id/1838409624/photo/cute-labrador-retriever-puppy-in-park-space-for-text.jpg?s=612x612&w=0&k=20&c=CtiqhAw-iI8bujSf_MOhh78ymefeixPXTGeO2nn1bEs=', mascotaId: 2 },
      { foto: 'https://images.unsplash.com/photo-1613064504039-bb89104af499?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhdG8lMjBzaWFtZXN8ZW58MHx8MHx8fDA%3D', mascotaId: 3 },
      { foto: 'https://images.unsplash.com/photo-1568309386325-ef86f13ac533?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2F0byUyMHNpYW1lc3xlbnwwfHwwfHx8MA%3D%3D', mascotaId: 3 },
      { foto: 'https://media.istockphoto.com/id/2171627512/es/foto/bulldog-franc%C3%A9s-con-novia-en-el-fondo-prepar%C3%A1ndose-para-la-boda.webp?a=1&b=1&s=612x612&w=0&k=20&c=0TFIbZ1PTpYGx07hk1e9PEGB_1ORC_yxw77ZQYcFv1s=', mascotaId: 4 },
      { foto: 'https://media.istockphoto.com/id/1199907866/photo/portrait-of-black-dog-looking-away.jpg?s=612x612&w=0&k=20&c=7-1d-b9IkS_7w5mqv_L3Bmajqi7mUtdHUthdkSWFag0=', mascotaId: 4 },
      { foto: 'https://media.istockphoto.com/id/1176091130/photo/big-beautiful-cat-looking-forward-brown-hair-and-big-green-eyes-pet.jpg?s=612x612&w=0&k=20&c=e_LRdecIXz3Pbs0YoxNiumInhygeRwoD07IzX-li6Ik=', mascotaId: 5 },
      { foto: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdG9yJTIwYWxlbWFufGVufDB8fDB8fHww', mascotaId: 6 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('galeria_mascotas', null, {});
  }
};
