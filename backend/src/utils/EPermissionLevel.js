module.exports = class EPermissionLevel {
  /** Todas as rotas sao liberadas para o perfil admin */
  static ADMIN = new EPermissionLevel(100, "Admin");
  static CONFIGURACAO = new EPermissionLevel(90, "Director");
  static SUPORTE = new EPermissionLevel(80, "Admin");
  static DIRETOR = new EPermissionLevel(70, "Director");
  static MANAGER = new EPermissionLevel(60, "Manager");
  static COORDINATOR = new EPermissionLevel(50, "Coordinator");
  static SALES_PERSON = new EPermissionLevel(40, "Salesperson");

  constructor(value, description) {
    this.value = value;
    this.description = description;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return `EPermissionLevel.${this.name}`;
  }
};
