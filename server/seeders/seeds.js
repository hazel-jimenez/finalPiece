const faker = require('faker');

const db = require('../config/connection');
const { Ad, User } = require('../models');

db.once('open', async () => {
  await Ad.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create favorites
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let favoriteId = userId;

    while (favoriteId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      favoriteId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { favorites: favoriteId } });
  }

  // create ads
  let createdAds = [];
  for (let i = 0; i < 100; i += 1) {
    const adText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdAd = await Ad.create({ adText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { ads: createdAd._id } }
    );

    createdAds.push(createdAd);
  }

  // create reviews
  for (let i = 0; i < 100; i += 1) {
    const reviewBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomAdIndex = Math.floor(Math.random() * createdAds.length);
    const { _id: adId } = createdAds[randomAdIndex];

    await Ad.updateOne(
      { _id: adId },
      { $push: { reviews: { reviewBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
