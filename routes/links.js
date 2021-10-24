const router = require("express").Router();
const { updateLinks, getLinks, deleteLink } = require("../controllers/links");

router.patch("/update", updateLinks);
router.patch("/delete", deleteLink);
router.post("/get", getLinks);

module.exports = router;
