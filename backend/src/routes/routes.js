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

router.get("/policy", controller.getPolicy);
router.get("/policy/detail", controller.getPolicyDetail);

module.exports = router;
