import express from "express";
import EcoTax from "../models/EcoTax.js";

const router = express.Router();

// POST /api/ecotax/calculate - Розрахунок та збереження
router.post("/calculate", async (req, res) => {
  try {
    const { pollutant, object_type, Mi, Rate, K_time, K_terr, K_benefit } =
      req.body;

    if (Mi < 0 || Rate < 0 || K_time < 0 || K_terr < 0 || K_benefit < 0) {
      return res
        .status(400)
        .json({ success: false, error: "Усі значення мають бути додатними" });
    }

    const taxAmount = Mi * Rate * K_time * K_terr * K_benefit;

    const record = new EcoTax({
      pollutant,
      object_type,
      parameters: { Mi, Rate, K_time, K_terr, K_benefit },
      result_tax: taxAmount,
    });

    await record.save();

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/ecotax/history - Історія розрахунків
router.get("/history", async (req, res) => {
  try {
    const history = await EcoTax.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
