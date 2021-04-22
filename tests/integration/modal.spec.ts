describe("Modal", () => {
	it("opens the modal", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=column] img").last().click();

		cy.get("[data-testid=modal]").should("exist");
	});

	it("can navigate clicking the image", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=column] img").last().click();

		cy.get("[data-testid=modal]").find("img").as("modal_img");

		cy.get("@modal_img").then($el => {
			const image_src = $el.attr("src");

			cy.get("@modal_img").click("right");

			// Wait for the animation to finish
			cy.wait(1000);

			cy.get("@modal_img").should("not.have.attr", "src", image_src);

			cy.get("@modal_img").click("left");

			// Wait for the animation to finish
			cy.wait(1000);

			cy.get("@modal_img").should("have.attr", "src", image_src);
		});
	});

	it("can navigate clicking the navigation", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=column] img").last().click();

		cy.get("[data-testid=modal]").find("img").as("modal_img");

		cy.get("@modal_img").then($el => {
			const image_src = $el.attr("src");

			cy.get("[data-testid=modal_navigation_right]").click("right");

			// Wait for the animation to finish
			cy.wait(1000);

			cy.get("@modal_img").should("not.have.attr", "src", image_src);

			cy.get("[data-testid=modal_navigation_left]").click("left");

			// Wait for the animation to finish
			cy.wait(1000);

			cy.get("@modal_img").should("have.attr", "src", image_src);
		});
	});

	it("closes", () => {
		cy.visit("/project-1");

		cy.get("[data-testid=column] img").eq(0).click();

		cy.get("[data-testid=modal_navigation_close]").click();

		cy.get("[data-testid=modal]").should("not.exist");
	});
});
