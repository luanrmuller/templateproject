class DashboardController {
  dashboardModules(req, res, next) {
    const modules = [];

    const permissionLevel = 50;
    const customersPermissionLevelList = [100, 90, 80, 70, 60];

    // if (customersPermissionLevelList.contains(permissionLevel)) {
    modules.push({ title: "Customers", url: "customers" });
    // }
    const registerPermissionLevelList = [100, 90, 80];

    modules.push({ title: "Ordens de servico", url: "serviceorders" });
    modules.push({ title: "Registers", url: "/registers" });
    modules.push({ title: "Atendimento", url: "/api/" });
    modules.push({ title: "Agendamento", url: "attends" });
    modules.push({ title: "Outros", url: "" });

    return res.json(modules);
  }
}

module.exports = new DashboardController();
