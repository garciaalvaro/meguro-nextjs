describe("Single page", () => {
	it("renders the h1", () => {
		cy.visit("/project-1");

		cy.get("h1").contains("Project 1");
	});

	it("renders two columns that can be scrolled", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=column]").as("columns");

		cy.get("@columns").should("have.length", 2);

		cy.get("@columns")
			.eq(0)
			.parent()
			.parent()
			.then($element => {
				expect($element[0].scrollTop).to.equal(0);

				$element[0].scrollTop = 5;
				expect($element[0].scrollTop).to.equal(5);

				$element[0].scrollTop = 333;
				expect($element[0].scrollTop).to.equal(333);
			});

		cy.get("@columns")
			.eq(1)
			.parent()
			.parent()
			.then($element => {
				expect($element[0].scrollTop).to.equal(0);

				$element[0].scrollTop = 5;
				expect($element[0].scrollTop).to.equal(5);

				$element[0].scrollTop = 333;
				expect($element[0].scrollTop).to.equal(333);
			});
	});
});

// Needed for TypeScript
export {};
