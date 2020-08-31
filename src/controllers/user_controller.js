const User = require("../models/User");
const { checkout } = require("../routes");

module.exports = {
  async index(request, response) {
    const users = await User.find();

    users.password = undefined;

    return response.status(200).json(users);
  },
  async store(request, response) {
    const {
      name = null,
      email,
      vehicles = [],
      password,
      phoneNumber = null,
      photoUrl = null,
      adress = null,
      idFacebook = null,
      idGoogle = null,
    } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        vehicles,
        adress,
        password,
        phoneNumber,
        photoUrl,
        idFacebook,
        idGoogle,
      });
    }

    user.password = undefined;

    return response.status(200).send({ success: true, userdata: user });
  },
  async checkout(request, response) {
    const { email } = request.body;
    User.findOne({ email }).then((user) => {
      if (user) return response.status(200).send({ success: true, data: user });
      return response.status(200).send({ success: false, data: null });
    });
  },
};
