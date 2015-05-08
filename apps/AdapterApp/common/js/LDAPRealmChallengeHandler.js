//Use the WL.Client.createChallengeHandler() method to create a challenge handler object. 
//The realm name is a mandatory parameter.
console.log("LDAPRealmChallengeHandler")
var LDAPRealmChallengeHandler = WL.Client.createChallengeHandler("LDAPRealm");
/*
 * The isCustomResponse function of the challenge handler is invoked each time that a response is received from the server. 
 * It is used to detect whether the response contains data that is related to this challenge handler. 
 * It must return either true or false.
 * */
LDAPRealmChallengeHandler.isCustomResponse = function(response) {
	console.log("LDAPRealmChallengeHandler. custom response")

    if (!response || !response.responseText) {
        return false;
    }  
    //The default login form that is returned from the MobileFirst server contains the j_security_check string. 
    //If the challenge handler detects it in the response, it returns true.
    var idx = response.responseText.indexOf("j_security_check"); 
    if (idx >= 0){ 
    	console.log("LDAPRealmChallengeHandler. j_security_check ")
    	//If isCustomResponse returns true, the framework calls the handleChallenge() function. 
    	//This function is used to perform required actions, such as hiding 
    	// the application screen or showing the login screen.
    	return true;
    }
    return false;
};
/* Create a challenge handler to define a customized authentication flow. 
 * In your challenge handler, do not add code that modifies the user interface when this modification
 *  is not related to the authentication flow.
 *  In addition to the methods that the developer must implement, the challenge handler contains functionality
 *   that the developer might want to use - submitLoginForm(), submitSuccess(), submitFailure() */
LDAPRealmChallengeHandler.handleChallenge = function(response){
	console.log("LDAPRealmChallengeHandler. handleChallenge ")

		$('#AppDiv').hide();
		$('#AuthDiv').show();
		$('#passwordInputField').val('');
};

$('#loginButton').bind('click', function () {
	console.log("LDAPRealmChallengeHandler. login button click bind ")

	// The form-based authenticator uses a hardcoded j_security_check URL component. 
    // You cannot have more than one instance of it.
    var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
    		j_username : $('#usernameInputField').val(),
    		j_password : $('#passwordInputField').val()
    };
    options.headers = {};
    // submitLoginForm() sends the collected credentials to a specific URL. 
    // The developer can also specify request parameters, headers, and callback.
    LDAPRealmChallengeHandler.submitLoginForm(reqURL, options, LDAPRealmChallengeHandler.submitLoginFormCallback);
});

$('#cancelButton').bind('click', function () {
	$('#AppDiv').show();
	$('#AuthDiv').hide();
//	submitFailure() notifies the MobileFirst framework that the authentication process completed with failure. 
//	The framework then disposes of the original request that triggered the authentication.
	LDAPRealmChallengeHandler.submitFailure();
});

LDAPRealmChallengeHandler.submitLoginFormCallback = function(response) {
	console.log("LDAPRealmChallengeHandler. submitLoginForm Callback ")

	
    var isLoginFormResponse = LDAPRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	LDAPRealmChallengeHandler.handleChallenge(response);
    } else {
    	$('#AppDiv').show();
    	$('#AuthDiv').hide();
    	//submitSuccess()notifies the MobileFirst framework that the authentication successfully finished. 
    	// The framework then automatically issues the original request that triggered the authentication.
    	LDAPRealmChallengeHandler.submitSuccess();
    }
};