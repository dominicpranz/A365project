<?php

// a simple php file to answer to ajax calls from a filled in form

$formdata = $_POST; // alternatevly you could get the raw data via file_get_contents("php://input") and then urldecode() or json_decode() - POST handles this for us :)

  $answer = [
    'code' => 000,
    'message' => 'Something went wrong',
  ];

echo json_encode($answer);
