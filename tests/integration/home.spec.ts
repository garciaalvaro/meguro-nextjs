describe("Home page", () => {
	it("renders several projects", () => {
		cy.visit("/");

		cy.get("[data-testid=project]").should("have.length.above", 4);
	});

	it("renders the h1", () => {
		cy.visit("/");

		cy.get("h1").contains("Meguro");
	});

	it("renders two columns that can be scrolled", () => {
		cy.visit("/");

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

				// This is the maximum distance that can be scrolled
				// given the content and the default window size.
				$element[0].scrollTop = 555;
				expect($element[0].scrollTop).to.equal(13);
			});

		cy.get("@columns")
			.eq(1)
			.parent()
			.parent()
			.then($element => {
				expect($element[0].scrollTop).to.equal(0);

				$element[0].scrollTop = 5;
				expect($element[0].scrollTop).to.equal(5);

				// This is the maximum distance that can be scrolled
				// given the content and the default window size.
				$element[0].scrollTop = 222;
				expect($element[0].scrollTop).to.equal(222);
			});
	});
});
