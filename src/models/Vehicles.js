const mongoose = require("mongoose");

const VehiclesSchmea = new mongoose.Schema(
  {
    referencia: { type: String },
    time: { type: Number },
    idMarca: { type: Number },
    fipeCodigo: { type: String },
    name: { type: String },
    combustivel: { type: String },
    marca: { type: String },
    anoModelo: { type: String },
    preco: { type: String },
    key: { type: String },
    veiculo: { type: String },
    placa: { type: String, required: true, createIndexes: { unique: true } },
    cpfcnpj: { type: String },
    id: { type: String },
    idModelo: { type: String },
    idAno: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicles", VehiclesSchmea);
