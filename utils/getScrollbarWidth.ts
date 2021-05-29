export const getScrollbarWidth = (): number => {
	const $container = document.createElement("div");
	const $element = document.createElement("div");

	$container.style.position = "fixed";
	$container.style.overflowY = "auto";
	$container.style.top = "100%";
	$container.style.width = "100px";
	$container.style.height = "1px";

	$element.style.width = "100%";
	$element.style.height = "200%";

	$container.append($element);
	document.body.append($container);

	const scrollbar_width = $container.offsetWidth - $container.scrollWidth;

	$container.remove();

	return scrollbar_width;
};
