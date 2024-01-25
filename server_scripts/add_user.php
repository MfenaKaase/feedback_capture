<?php

$adminPassword = 'dzHS+mRw.9YQ';

$newUser = $_POST['username'];
$newPassword = $_POST['password'];
$newRole = 'contributor';

$data = json_encode([
    'set-user' => [
         $newUser => $newPassword,
    ],
]);

$headers = [
    'Content-type: application/json',
];

$curl = curl_init();

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($curl, CURLOPT_USERPWD, "admin:$adminPassword");
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_URL, 'http://35.221.213.87/solr/admin/authentication');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_ENCODING, '');
curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
curl_setopt($curl, CURLOPT_TIMEOUT, 0);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

$response = curl_exec($curl);

if (curl_errno($curl)) {
    echo 'Curl error: ' . curl_error($curl);
}

curl_close($curl);
echo $response;

$dataAddRoles = json_encode([
    'set-user-role' => [
        $newUser => ['contributor'],
    ],
]);

$curlAddRoles = curl_init();

curl_setopt($curlAddRoles, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curlAddRoles, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($curlAddRoles, CURLOPT_USERPWD, "admin:$adminPassword");
curl_setopt($curlAddRoles, CURLOPT_POSTFIELDS, $dataAddRoles);
curl_setopt($curlAddRoles, CURLOPT_URL, 'http://35.221.213.87/solr/admin/authorization');
curl_setopt($curlAddRoles, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curlAddRoles, CURLOPT_ENCODING, '');
curl_setopt($curlAddRoles, CURLOPT_MAXREDIRS, 10);
curl_setopt($curlAddRoles, CURLOPT_TIMEOUT, 0);
curl_setopt($curlAddRoles, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curlAddRoles, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

$responseAddRoles = curl_exec($curlAddRoles);

if (curl_errno($curlAddRoles)) {
    echo 'Curl error: ' . curl_error($curlAddRoles);
}

curl_close($curlAddRoles);

?>