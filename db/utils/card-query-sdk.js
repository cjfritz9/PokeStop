const pokemon = require('pokemontcgsdk');

pokemon.configure({ apiKey: 'f8582a5f-8295-407b-a0eb-3754b59126a8' });

pokemon.card.find('gym2-2').then((result) => {
  console.log(result.name, result.cardmarket.prices.averageSellPrice, result.rarity, result.attacks[0], result.attacks[1], result.images.small)
});

pokemon.card.where({q: 'name:charizard'}).then((results) => {
  results.data.forEach((result) => {
    console.log(result.name, result.id)
  })
});