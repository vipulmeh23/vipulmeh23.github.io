<?php
    $age = $_GET["age"];
    $weight = $_GET["weight"];
    $unitWeight = $_GET["unitW"];
    $height = $_GET["height"];
    $unitHeight = $_GET["unitH"];
    $sex = $_GET["sex"];

    function calculateBMI($age, $weight, $height, $unitHeight, $unitWeight) {
        $parsedUnitHeight = $unitHeight;
        $parsedUnitWeight = $unitWeight;
        $parsedHeight = (float)$height;
        $parsedWeight = (float)$weight;
        
        if($parsedUnitHeight == "cm"){
            $parsedHeight = $parsedHeight/100;
        }

        if($parsedUnitWeight == "lb"){
            $parsedWeight = $parsedWeight/2.205;
        }

        $bmi = $parsedWeight/($parsedHeight * $parsedHeight);

        return $bmi;

    }

    $calculatedBMI = calculateBMI($age, $weight, $height, $unitHeight, $unitWeight);

    $weightStatus = "Normal";

    if($calculatedBMI < 18.5){
        $weightStatus = "Underweight";
    } elseif($calculatedBMI > 25 && $calculatedBMI < 40) {
        $weightStatus = "Obese";
    }

    $resultArr = array("bmi" => array("value" => $calculatedBMI, "status" => $weightStatus));
    
    echo json_encode($resultArr);
