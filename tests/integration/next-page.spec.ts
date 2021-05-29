describe("Next button", () => {
	it("does not render in home", () => {
		cy.visit("/");

		cy.get("[data-testid=next_page]").should("not.exist");
	});

	it("does not render in the last page", () => {
		cy.visit("/project-5");

		cy.get("[data-testid=next_page]").should("not.exist");
	});

	it("loads the next page when clicking the button", () => {
		cy.visit("/project-3");

		// Click on the left to avoid clicking on the Next.js loader
		cy.get("[data-testid=next_page]").click("left");

		cy.url().should("eq", Cypress.config().baseUrl + "/project-4");
	});
});

// Needed for TypeScript
export {};
