const DrugTypes = require("../models/drugTypes");
const crypto = require("crypto");

exports.createDrugType = async (req, res) => {
  try {
    const { name, category } = req.body;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const count = await DrugTypes.countDocuments();
    const paddedId = (count + 1).toString().padStart(3, "0");
    const drugId = `DT${year}${paddedId}`;

    const drugType = new DrugTypes({ drugId, name, category });

    await drugType.save();
    res.status(201).json(drugType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDrugTypes = async (req, res) => {
  try {
    const drugTypes = await DrugTypes.find();
    res.json(drugTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDrugTypeById = async (req, res) => {
  try {
    const drugType = await DrugTypes.findById(req.params.id);
    if (!drugType) {
      return res.status(404).json({ message: "Drug type not found" });
    }
    res.json(drugType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateDrugType = async (req, res) => {
  try {
    const drugType = await DrugTypes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!drugType) {
      return res.status(404).json({ message: "Drug type not found" });
    }
    res.json(drugType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteDrugType = async (req, res) => {
  try {
    const drugType = await DrugTypes.findByIdAndDelete(req.params.id);
    if (!drugType) {
      return res.status(404).json({ message: "Drug type not found" });
    }
    res.json({ message: "Drug type deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
