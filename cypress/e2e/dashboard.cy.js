/// <reference types="cypress" />

describe("Dashboard app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Dashboard titles displayed correctly", () => {
    cy.get("#dashboards li").should("have.length", 5);

    cy.get("#dashboards li #accordion-header p")
      .first()
      .should("have.text", "Antenatal Care");

    cy.get("#dashboards li #accordion-header p")
      .last()
      .should("have.text", "Immunization");
  });

  it("Dashboards items displayed correctly", () => {
    cy.get(".MuiAccordionDetails-root  div")
      .should("have.length", 11)
      .last("p")
      .should("have.text", "ANC: Fixed vs Outreach last year");
  });

  it("Filtering dashboard items works", () => {
    cy.get(".MuiNativeSelect-select").select("Visulizations");

    cy.get(".MuiAccordionDetails-root  div")
      .should("have.length", 8)
      .last("p")
      .should("have.text", "ANC: Fixed vs Outreach last year");

    cy.contains("ANC: IPT 2 Coverage this year").should("not.exist");
  });
});
