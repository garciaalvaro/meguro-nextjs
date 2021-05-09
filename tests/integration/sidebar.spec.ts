describe("Sidebar", () => {
	it("does not render in home", () => {
		cy.visit("/");

		cy.get("[data-testid=sidebar]").should("not.exist");
	});

	it("closes when clicking the overlay", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=sidebar]").as("sidebar");
		cy.get("[data-testid=sidebar_overlay]").as("sidebar_overlay");

		cy.get("@sidebar_overlay").should("not.be.visible");
		cy.get("@sidebar").should("have.attr", "aria-expanded", "false");

		cy.get("@sidebar").click("center");

		cy.get("@sidebar_overlay").should("be.visible");
		cy.get("@sidebar").should("have.attr", "aria-expanded", "true");

		// Wait for the animation to finish
		cy.wait(1000);

		cy.get("@sidebar_overlay").click("right");

		cy.get("@sidebar").should("have.attr", "aria-expanded", "false");

		// Wait for the animation to finish
		cy.wait(1000);

		cy.get("@sidebar_overlay").should("not.be.visible");
	});

	it("should load home when clicking the logo", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=sidebar_link]").eq(0).click();
		cy.url().should("eq", Cypress.config().baseUrl);
	});

	it("should load project-2 when clicking from project-1 page", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=sidebar]").click();

		// Wait for the animation to finish
		cy.wait(1000);

		cy.get("[data-testid=sidebar_link]").eq(2).click();
		cy.url().should("eq", Cypress.config().baseUrl + "/project-2");

		// Wait for the animation to finish
		cy.wait(1000);

		cy.get("[data-testid=sidebar_overlay]").should("not.be.visible");
	});
});

// Needed for TypeScript
export {};
