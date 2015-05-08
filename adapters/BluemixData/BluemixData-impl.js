/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStubs(route) {
	if (route == undefined || route == '') {
		route = '';
	}
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : route
	};
	
	
	return WL.Server.invokeHttp(input);
}

function postData(key) {

	var input = {
	    method : 'post',
	    returnedContentType : 'json',
	    headers : {
            'Content-Type' : 'application/xml'
	    	},
	    body: { 
	    	 contentType: 'text/xml; charset=utf-8', 
	    	 content: "<!xml blah='blah blah blah'><envelope><letter>Hope I catch the mid day POST</letter></envelope>" 
	    	 }, 
	    path : '/hello/with/post/data?apiKey='+key
	};
	
	 WL.Logger.debug("POST DATA input " + JSON.stringify(input));
	 WL.Logger.warn("POST DATA input " + JSON.stringify(input));
	 return WL.Server.invokeHttp(input);
}

/**
 * 
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStoriesFiltered(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}




