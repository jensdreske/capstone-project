/// <reference types="Cypress" />;

const testId = (id) => `[data-test-id="${id}"]`;

const GOAL_BUTTON = testId("goal-button");
const PRESET_GOAL_CHECKBOX = testId("preset-goal-checkbox");
const GOAL_SCORE = testId("goal-score");
const COMMUNITY_GOALS = testId("community-goals");
const GOAL_NAME_FIELD = testId("goal-name-field");
const GOAL_CO2_FIELD = testId("goal-co2-field");
const GOAL_FORM_SUBMIT = testId("goal-form-submit");
const CUSTOM_GOAL_TITLE = testId("custom-goal-title");
const CUSTOM_GOAL_CHECKBOX = testId("custom-goal-checkbox");
const CUSTOM_GOAL_REMOVE_BUTTON = testId("custom-goal-remove-button");

describe("Clicking on the goal button leads to goalpage", () => {
  it("open the goals page", () => {
    cy.visit("/");
    cy.get(GOAL_BUTTON).click();
    cy.url().should("include", "/goals");
  });
});

describe("checking a goal should update the calculation of goal emissions", () => {
  it("checks goals to sum them up", () => {
    cy.visit("/");
    cy.get(GOAL_BUTTON).click();
    cy.get(PRESET_GOAL_CHECKBOX).first().click();
    cy.get(GOAL_SCORE).should("contain.text", "258 kg");
    cy.get(PRESET_GOAL_CHECKBOX).last().click();
    cy.get(GOAL_SCORE).should("contain.text", "7476 kg");
  });
});

describe("check if community goals from the cloud are displayed", () => {
  it("checks if items are present", () => {
    cy.visit("/goals");
    cy.get(COMMUNITY_GOALS).should("be.visible");
  });
});

describe("custom goals", () => {
  it("can be added to the list by filling and submitting the form", () => {
    cy.visit("/goals");
    cy.get(GOAL_NAME_FIELD).type("test goal");
    cy.get(GOAL_CO2_FIELD).type(123);
    cy.get(GOAL_FORM_SUBMIT).click();
    cy.get(CUSTOM_GOAL_TITLE).should("contain", "test goal");
  });
  it("can be chosen as a goal and contributes to the sum of emissions", () => {
    cy.get(CUSTOM_GOAL_CHECKBOX).click();
    cy.get(GOAL_SCORE).should("contain.text", "123 kg");
  });
  it("can be deleted from the list of goals", () => {
    cy.get(CUSTOM_GOAL_REMOVE_BUTTON).click();
    cy.get(CUSTOM_GOAL_TITLE).should("not.exist");
  });
});
