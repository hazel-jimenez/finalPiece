const userSeeds = require('./userSeed.json');
const advertiseSeeds = require('./advertiseSeed.json');
const db = require('../config/connection');
const { Advertise, User } = require('../models');

db.once('open', async () => {
  try {
    await Advertise.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < advertiseSeeds.length; i++) {
      const { _id, advertiseAuthor } = await Advertise.create(advertiseSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: advertiseAuthor },
        {
          $addToSet: {
            advertise: _id,
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