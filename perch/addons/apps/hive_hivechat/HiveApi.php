<?php

class HiveApi {
    public static function printArray($item, $depth = 0)
    {
      foreach ($item as $key => $value) {
          $depthString = str_repeat("--", $depth);
          if (gettype($value) !== "array") {
              echo "$depthString $key: $value <br>";
          } else {
              echo "$depthString $key: <br>";
              printArray($value, $depth + 1);
          }
      }
    }

    public static function flatten($data, $parentKey = "") {
        $array = [];
        foreach ($data as $key => $value) {
            $newKey = $parentKey ? $parentKey . "_" . $key : $key;
            if (gettype($value) == "array") {
                $array = array_merge($array, HiveApi::flatten($value, $newKey));
            } else {
                if (!ctype_digit($value)) {
                    $json = json_decode($value);
                }
                if ($json) {
                    $array = array_merge($array, HiveApi::flatten($json, $newKey));
                } else {
                    $array[($parentKey ? $parentKey . "_" : "") . $key] = $value;
                }
            }
        }
        return $array;
    }
}