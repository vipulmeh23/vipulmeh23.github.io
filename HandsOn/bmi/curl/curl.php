<?php
    $url = "https://bmi.p.mashape.com/";
    $age = $_GET["age"];
    $weight = $_GET["weight"];
    $unitWeight = $_GET["unitW"];
    $height = $_GET["height"];
    $unitHeight = $_GET["unitH"];
    $sex = $_GET["sex"];

    $data = array(
        "weight"=>array(
            "value"=>$weight,
            "unit"=>$unitWeight ),
        "height"=>array(
            "value"=>$height,
            "unit"=>$unitHeight),
        "sex"=> $sex,
        "age"=>$age,
        "waist"=>"",
        "hip"=>""
    );
    $dataJson = json_encode($data);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
    curl_setopt($ch, CURLOPT_POST, 1);

    $headers = array();
    $headers[] = "X-Mashape-Key: 60MsMLqcJvmsh5qD46X74dyjHaEKp1RqRDNjsnrAwYUzRzWu0P";
    $headers[] = "Content-Type: application/json";
    $headers[] = "Accept: application/json";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);
    echo $result;
