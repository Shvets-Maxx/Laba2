import mongoose from "mongoose";

const EcoTaxSchema = new mongoose.Schema({
  pollutant: { type: String, required: true },
  object_type: { type: String, default: "Стаціонарне джерело" },

  parameters: {
    Mi: { type: Number, required: true }, // Маса викидів
    Rate: { type: Number, required: true }, // Ставка податку
    K_time: { type: Number, default: 1 }, // Часовий коефіцієнт
    K_terr: { type: Number, default: 1 }, // Територіальний коефіцієнт
    K_benefit: { type: Number, default: 1 }, // Коефіцієнт пільги
  },

  result_tax: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("EcoTax", EcoTaxSchema);
