/**
 * When document is ready, handle the loginform
 */
JSTEST.domReady(function(){

	// Handle validation and submission of the login form
	JSTEST.formValidator(
		JSTEST.node('loginform').getElementsByTagName('form')[0],
		function(){
			this.innerHTML = '<h2>Yay! Logged in..</h2>';
			return false;
		}
	);

});
