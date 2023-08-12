const router = require("express").Router();
const xxxRouter = require("../controllers/xxx");
const userRouter = require("../controllers/user");
const authRouter = require("../controllers/auth");
const typeRouter = require("../controllers/type");
const viaRouter = require("../controllers/via");
const positionRouter = require("../controllers/position");
const conditionRouter = require("../controllers/condition");
const finalRouter = require("../controllers/finalResult");
const jobListRouter = require("../controllers/jobList");

router.use("/api/xxxs", xxxRouter);
router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/types", typeRouter);
router.use("/api/vias", viaRouter);
router.use("/api/positions", positionRouter);
router.use("/api/conditions", conditionRouter);
router.use("/api/final-results", finalRouter);
router.use("/api/job-lists", jobListRouter);

router.get("/", (req, res) => {
  res.json({ message: "Backend Services of Synt Application." });
});

module.exports = router;
