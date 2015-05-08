
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	WL.Analytics.enable();	

}

function getSecretData(){	
	var resourceRequest = new WLResourceRequest("/adapters/LDAPAdapter/getSecretData", WLResourceRequest.GET);
	resourceRequest.send().then(
			getSecretDataSuccess,
			getSecretDataFailure
	);
}

function getSecretDataSuccess(response){
	$("#resultDiv").css("padding", "10px");
	$("#resultDiv").html(new Date() + "<hr/>");
	$("#resultDiv").append("Secret data :: " + response.responseJSON.secretData + "<hr/>");	
	$("#resultDiv").append("Response :: " + JSON.stringify(response));
}

function getSecretDataFailure(response){
	$("#resultDiv").css("padding", "10px");
	$("#resultDiv").html(new Date() + "<hr/>");
	$("#resultDiv").append("Error: " + JSON.stringify(response));
}


/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}