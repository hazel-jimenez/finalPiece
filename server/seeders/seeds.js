const userSeeds = require('./userSeed.json');
const adSeeds = require('./adSeed.json');
const db = require('../config/connection');
const { Ad, User } = require('../models');

db.once('open', async () => {
  try {
    await Ad.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < adSeeds.length; i++) {
      const { _id, adAuthor } = await Ad.create(adSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: adAuthor },
        {
          $addToSet: {
            ad: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});