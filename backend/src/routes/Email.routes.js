const EmailController = require("../controllers/registrations/EmailController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (router, permission) => {
  // POST ROUTES
  router.get(
    `/api/emails`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    EmailController.getAll
  );
  router.get(
    `/api/emails/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    EmailController.getById
  );
  router.get(
    `/api/emailsCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    EmailController.count
  );
  router.post(
    `/api/emails`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    EmailController.insert
  );
  router.put(
    `/api/emails/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    EmailController.update
  );
  router.patch(
    `/api/emails/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    EmailController.patch
  );
  router.delete(
    `/api/emails/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    EmailController.delete
  );
};
