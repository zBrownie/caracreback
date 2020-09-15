const { DocumentProvider } = require("mongoose");
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
      password = null,
      phoneNumber = null,
      photoUrl = null,
      adress = null,
      id = null,
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
        idFacebook: id,
        idGoogle,
      });
    }

    user.password = undefined;

    return response.status(200).send({ success: true, userdata: user });
  },
  async update(request, response) {
    const email = request.params.email;

    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        console.log("Erro update user", err);
        return response.send({ success: false, data: [] });
      } else {
        if (!doc) {
          console.log("OBJETO NAO ENCONTRADO", err);
          return response.send({
            success: false,
            data: [{ message: "objeto nao encontrado" }],
          });
        } else {
          const vehicles = request.body.vehicles;
          if (vehicles) {
            doc.vehicles = vehicles;

            doc.save((err, updateDoc) => {
              if (err) {
                console.log(err);
                return response.send({ success: true, data: err });
              } else {
                return response.send({ success: true, data: updateDoc });
              }
            });
          }
        }
      }
    });
  },
  async checkout(request, response) {
    const { email } = request.body;
    User.findOne({ email }).then((user) => {
      if (user) return response.status(200).send({ success: true, data: user });
      return response.status(200).send({ success: false, data: null });
    });
  },
};
