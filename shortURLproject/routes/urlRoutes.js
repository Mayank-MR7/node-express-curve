const express = require("express");
const { handleGenerateNewShortURL, handleRedirectId, handleGetAnalaytics } = require("../controllers/urlController");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectId);
router.get("/analaytics/:shortId",handleGetAnalaytics );


module.exports = router;