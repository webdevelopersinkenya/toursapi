const Destination = require("../models/destinationModel");

exports.getAll = async (req, res) => {
  res.json(await Destination.find());
};

exports.create = async (req, res) => {
  res.json(await Destination.create(req.body));
};

exports.update = async (req, res) => {
  res.json(await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.delete = async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};