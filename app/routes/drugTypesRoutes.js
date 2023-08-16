const express = require("express");
const router = express.Router();
const {
  createDrugType,
  getDrugTypes,
  getDrugTypeById,
  updateDrugType,
  deleteDrugType,
} = require("../controllers/drugTypesController");

router.post("/", createDrugType);
router.get("/", getDrugTypes);
router.get("/:id", getDrugTypeById);
router.put("/:id", updateDrugType);
router.delete("/:id", deleteDrugType);

module.exports = router;
