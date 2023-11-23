<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "implicit_feedback_db";  // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the POST request
if ($_POST) {
    $total_user_clicks = $_POST['total_user_clicks'];
    $total_mouse_movement_x = $_POST['total_mouse_movement_x'];
    $total_mouse_movement_y = $_POST['total_mouse_movement_y'];
    $total_user_scroll = $_POST['total_user_scroll'];
    $user_rating = $_POST['user_rating'];
    $total_key_strokes = $_POST['total_key_stroke'];
    $total_active_time = $_POST['total_active_time'];
    $total_mouse_distance = $_POST['total_mouse_distance'];
    $total_mouse_speed = $_POST['total_mouse_speed'];
    $url = $_POST['url'];
    $userID = $_POST['user_ID'];
    $total_copy = $_POST['total_copy'];
    $closeTimestamp = date('Y-m-d H:i:s', $_POST['closeTimeStamp']);
    $openTimestamp = date('Y-m-d H:i:s', $_POST['openTimeStamp']);
    file_put_contents('log.txt', "Close Time Stamp $closeTimestamp \n Open Time Stamp: $openTimestamp \n", FILE_APPEND);
    $velocity_time_count = $_POST['velocity_time_count'];
    $average_mouse_speed = $_POST['average_mouse_speed'];
    $total_text_selections = $_POST['total_text_selections'];
    $bookmarked = $_POST['bookmarked'];
    $printed_document = $_POST['printed_document'];
    $page_saved = $_POST['page_saved'];
    $search_query = $_POST['search_query'];



    // SQL statement
    $sql = "INSERT INTO feedback (total_user_clicks, total_mouse_movement_x, total_mouse_movement_y, total_user_scroll, user_rating, total_key_strokes, total_active_time, total_mouse_distance, total_mouse_speed, url, userID, total_copy, openTimeStamp, closeTimeStamp, velocity_time_count, average_mouse_speed, total_text_selections, bookmarked, printed_document, page_saved, search_query) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare and bind the statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiiiiiiississiiiiiis", $total_user_clicks, $total_mouse_movement_x, $total_mouse_movement_y, $total_user_scroll, $user_rating, $total_key_strokes, $total_active_time, $total_mouse_distance, $total_mouse_speed, $url, $userID, $total_copy, $openTimestamp, $closeTimestamp, $velocity_time_count, $average_mouse_speed, $total_text_selections, $bookmarked, $printed_document, $page_saved, $search_query);

    // Execute the statement
    if ($stmt->execute()) {
        $response = array("success" => true);
        file_put_contents('log.txt', "Data saved successfully\n", FILE_APPEND);
    } else {
        $response = array("success" => false, "error" => $stmt->error);
        file_put_contents('log.txt', "Error: " . $e->getMessage() . "\n", FILE_APPEND);
    }

    // Close the connection
    $stmt->close();
    $conn->close();

    // Send the response back to JavaScript
    header('Content-Type: application/json');
    echo json_encode($response);
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server</title>
</head>

<body>
    <h1>

    </h1>
</body>

</html>