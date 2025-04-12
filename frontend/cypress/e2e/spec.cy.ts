import "../support/commands";

const namePlanet = `Other Planet ${Date.now()}`;

describe("Sistema Solar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Exibe toast ao errar o login", () => {
    cy.get("input[name=email]").type("errado@email.com");
    cy.get("input[name=password]").type("senhaerrada");
    cy.get("button[type=submit]").click();

    cy.contains("Email ou senha inválidos").should("exist");
  });

  it("Redireciona para /home ao logar corretamente", () => {
    cy.get("input[name=email]").type("admin@solar.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/home");
    cy.contains("Earth").should("exist");
  });

  it("Filtra planetas por nome", () => {
    cy.login();
    cy.wait(2000);
    cy.get('input[placeholder="Buscar planeta"]').type("Earth");

    cy.contains("Earth").should("exist");
    cy.get(".planeta-card").should("have.length", 1);
  });

  it("Cria planeta e verifica se aparece", () => {
    cy.login();
    cy.contains("button", "Novo planeta").click();

    cy.get("input[name=name]").type(namePlanet);
    cy.get("input[name=diameter]").type("12104");
    cy.get("input[name=rotationPeriod]").type("243 dias");
    cy.get("input[name=distanceFromSun]").type("108200000");
    cy.get("input[name=imageUrl]").type(
      "https://scx2.b-cdn.net/gfx/news/hires/2015/whatsimporta.jpg"
    );

    cy.get("input[name=hasRings]").check();

    cy.get("button").contains("Criar").click();

    cy.contains(namePlanet).should("exist");
  });

  it("Navega para planeta criado e valida dados", () => {
    cy.login();
    cy.contains(namePlanet).click();
    cy.url().should("include", "/planet");

    cy.contains(namePlanet).should("exist");
  });

  it("Exibe erro ao tentar criar planeta com nome já existente", () => {
    cy.login();
    cy.get("button").contains("Novo planeta").click();

    cy.get("input[name=name]").type("Earth"); // nome duplicado
    cy.get("input[name=diameter]").type("12104");
    cy.get("input[name=rotationPeriod]").type("243 dias");
    cy.get("input[name=distanceFromSun]").type("108200000");
    cy.get("input[name=imageUrl]").type("https://example.com/venus.jpg");
    cy.get("input[name=hasRings]").check();

    cy.get("button").contains("Criar").click();

    cy.contains("Planeta com esse nome já existe").should("exist");
  });
});
