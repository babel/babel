function assertElement(assertFn, shouldBeElement, opt_message) {
	return /** @type {!Ele	ment} */ (
	  assertType_(
		assertFn,
		shouldBeElement,
		isElement(shouldBeElement),
		'Element expected',
		opt_message
	  )
	);
}
