const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
      title: { type: String, unique: true, required: true },
      description: { type: String, required: false }, // todo: required: true
      startingPrice: { type: Number, required: true },
      duration: { type: String, required: true },
      isMostPopular: { type: Boolean, required: true },
      isActive: { type: Boolean, required: true },
      cityName: { type: String, required: true },
      plans:[{
          name: { type: String, required: false },
          value: { type: Number, required: false, default:0 },
      }],
  },
  { timestamps: true }
);

// indices
// text index for name
schema.index({ title: "text" });

schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
schema.index({ startingPrice: 1 });
schema.index({ description: 1 });
schema.index({ duration: 1 });
schema.index({ cityName: 1 });

// reference model
const Package = mongoose.model("Package", schema);
const ModelName = "Package";

module.exports = { Model: Package, name: ModelName };
