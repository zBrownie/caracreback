const { DocumentProvider } = require("mongoose");
const User = require("../models/User");
// const { checkout } = require("../routes");

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
  async updateUserInfo(request, response) {
    const email = request.params.email;

    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        console.log(err);
        return response.send({ success: false, message: "erro request" });
      } else {
        if (!doc) {
          return response.send({
            success: false,
            message: "usuario inexistente",
          });
        } else {
          const data = request.body.userData;
          if (data) {
            doc.name = data.name;
            doc.email = data.email;
            doc.vehicles = data.vehicles;
            doc.password = data.password;
            doc.city = data.city;
            doc.phoneNumber = data.phoneNumber;
            doc.adress = data.adress;
            doc.photoUrl = data.photoUrl;
            doc.idFacebook = data.idFacebook;
            doc.idGoogle = data.idGoogle;

            doc.save((err, newDoc) => {
              if (err) {
                console.log(err);
                return response.send({
                  success: false,
                  message: "erro salvar novos dados",
                });
              } else {
                return response.send({ success: true, userData: newDoc });
              }
            });
          } else {
            return response.send({ success: false, message: "falta de dados" });
          }
        }
      }
    });
  },
};
