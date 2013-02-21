describe("Form validator", function () {

	var _forms = new Array(
		JSTEST.node('test1'),
		JSTEST.node('test2'),
		JSTEST.node('test3')
	)
	var _submits = new Array(
		JSTEST.node('submit1'),
		JSTEST.node('submit2'),
		JSTEST.node('submit3')
	)
	var submitCallback = jasmine.createSpy().andReturn(false);
	var cancelCallback = jasmine.createSpy().andReturn(false);

	describe("Failed Login", function () {
		it("Attempts to submit an invalid form - no user id or password", function () {
			JSTEST.formValidator(
				_forms[0],
				submitCallback,
				cancelCallback
			);
			_submits[0].click();
			expect(cancelCallback).toHaveBeenCalled();
		});
		it("Attempts to submit an invalid form - no password", function () {
			JSTEST.formValidator(
				_forms[1],
				submitCallback,
				cancelCallback
			);
			_submits[1].click();
			expect(cancelCallback).toHaveBeenCalled();
		});
		it("Attempts to submit a valid form", function () {
			JSTEST.formValidator(
				_forms[2],
				submitCallback,
				cancelCallback
			);
			_submits[2].click();
			expect(submitCallback).toHaveBeenCalled();
		});
	});
});