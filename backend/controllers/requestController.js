import Request from "../models/Request.js";


export const createRequest = async (req, res) => {
  try {
    const { phone } = req.body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Count requests by phone for today
    const requestCount = await Request.countDocuments({
      phone,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (requestCount >= 3) {
      return res.status(429).json({
        message: "This phone number can only request blood 3 times per day",
      });
    }

    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: "Request failed" });
  }
};

// GET ALL REQUESTS
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// DELETE request
export const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: "Request removed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

