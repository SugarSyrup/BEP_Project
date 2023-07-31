const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/type", controller.getType);

//

router.get("/asks", controller.getAsks);
router.get("/asks/typeDetail", controller.getAsksTypeDetail);
router.get("/asks/:askID", controller.getAsksDetail);

router.post("/asks/:askID/recommendation", controller.postAsksRecommendation);
router.post("/asks/write", controller.postAsks);

//

router.get("/policy/detail", controller.getPolicyDetail);
router.get("/policy/:id", controller.getSinglePolicy);
router.get("/policy", controller.getPolicy);

router.get('/policy/:id/comment', controller.getComments);
router.post("/policy/:id/comment", controller.postComment);

module.exports = router;
