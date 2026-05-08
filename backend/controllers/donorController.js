import Donor from "../models/Donor.js";

// CREATE donor
export const createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  show  all donors list
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find({ isAvailable: true });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    res.json(donor);
  } catch (err) {
    res.status(404).json({ error: "Donor not found" });
  }
};

export const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE donor
export const deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
