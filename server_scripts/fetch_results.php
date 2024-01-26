<?php

// Solr core and server information
$solrUrl = 'http://35.221.213.87/solr/feedback';
$query = $_GET['query']; // Replace with your actual search query

// Solr search endpoint
$searchEndpoint = '/select';

// Construct the Solr query URL
$queryUrl = $solrUrl . $searchEndpoint . '?q=' . urlencode($query);

// Initialize cURL session
$ch = curl_init($queryUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "admin:dzHS+mRw.9YQ");
// Execute cURL session and get the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

// Close cURL session
curl_close($ch);

// Output the Solr search results
echo $response;
?>
