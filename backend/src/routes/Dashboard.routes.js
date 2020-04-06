const DashboardController = require("../controllers/DashboardController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = router => {
  router.get("/", (request, response) => {
    return response.json({ msg: "Hello world from backend!" });
  });

  router.get(`/api/modules`, DashboardController.dashboardModules);
};
