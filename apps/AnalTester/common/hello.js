function invokeAdapterProcedure() {
    console.log("Invoking procedure...");

// Acording to https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-7-0/moving-production/operational-analytics/
/*
The following API call results in an adapter hit that is visualized on the MobileFirst Operational Analytics dashboard:
1
2
// an 'adapter hit' will be recorded upon a successful adapter invocation
WL.Client.invokeProcedure({...});

*/

    WL.Client.invokeProcedure({
        adapter: "HelloWorld",
        procedure: "hello",
        parameters: []
    },{
        onSuccess: function(result) {
            console.log("Success callback", result);
            // The adapter returns an object.  This is mapped to result.invocationResult
            // Log the message property of it
            alert(result.invocationResult.result);

        },
        onFailure: function(error) {
            console.error("Failure callback", error);
            // Something went wrong.  Throw an alert
            alert("ERROR", error);
        }
    });

    // var resourceRequest = new WLResourceRequest(
    //     "/adapters/HelloWorld/hello",
    //     WLResourceRequest.GET
    // );
    //     resourceRequest.send().then(
    //     function(result) {
    //         console.log("Success callback", result);
    //         // The adapter returns an object.  This is mapped to result.invocationResult
    //         // Log the message property of it
    //         alert(result.invocationResult.result);

    //     },
    //     function(error) {
    //         console.error("Failure callback", error);
    //         // Something went wrong.  Throw an alert
    //         alert("ERROR", error);
    //     }
    // );
}
function invokeAdapterStubs(route) {
    console.log("Invoking procedure...");
	WL.Client.invokeProcedure({
	    adapter: "BluemixData",
	    procedure: "getStubs",
	    parameters: [route]
	},{
	    onSuccess: function(result) {
	        console.log("Success callback", result);
	        // The adapter returns an object.  This is mapped to result.invocationResult
	        // Log the message property of it
	        alert(result.invocationResult.message);
	
	    },
	    onFailure: function(error) {
	        console.error("Failure callback", error);
	        // Something went wrong.  Throw an alert
	        alert("ERROR - " + error.errorMsg);
	    }
	});    
}

function postData() {
    console.log("Invoking procedure...");
    var key = document.getElementById("keyBox").value;
    
	WL.Client.invokeProcedure({
	    adapter: "BluemixData",
	    procedure: "postData",
	    parameters: [key]
	},{
	    onSuccess: function(result) {
	        console.log("Success callback", result);
	        // The adapter returns an object.  This is mapped to result.invocationResult
	        // Log the message property of it
	        alert(result.invocationResult.message +" - "+result.invocationResult.Key);
	
	    },
	    onFailure: function(error) {
	        console.error("Failure callback", error);
	        // Something went wrong.  Throw an alert
	        alert("ERROR - " + error.errorMsg);
	    }
	});    
}


function logAnalytics() {
    console.log("Logging analytics...");
    // Log to analytics
    WL.Analytics.log("Hello World @ " + new Date().toString()).then(function() {
        // "Flush" the analytics log stack to the server - normally this is done lazily
        // In a production app, do this with full understanding of the server and client load implications
        // This must be done after the log() promise has resolved.  Otherwise, a race condition causes the log to be lost.
        WL.Analytics.send();
    });

    console.log("Analytics logged.");
}
