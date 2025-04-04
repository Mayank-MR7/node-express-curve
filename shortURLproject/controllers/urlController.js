const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({
        message: "Please provide a URL to shorten",
      });
    }
    const shortId = shortid.generate();
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.status(201).json({
      shortId: shortId,
      message: "Short URL created successfully",
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(400).json({
      message: "Error creating short URL",
    });
  }
};

const handleRedirectId = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      { $push: { visitHistory: {
        timestamp : Date.now(),
      } } }
    );
    res.redirect(entry.redirectUrl)
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(404).json({
        message: "Short URL not found",
    })
  }
};

const handleGetAnalaytics = async (req, res) => {
    try{
        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});
        return res.status(200).json({
            totalClicks : result.visitHistory.length,
            analaytics : result.visitHistory
        })
    }catch (error){
        console.log(error);
        
        res.status(400).json({
            message: "Error fetching analytics",
        })
    }
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectId,
  handleGetAnalaytics
};
