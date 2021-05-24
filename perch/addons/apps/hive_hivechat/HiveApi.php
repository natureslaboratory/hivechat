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

    public static function flatten($data, $opts = [], $parentKey = "") {
        $array = [];
        foreach ($data as $key => $value) {
            if ($opts["no-prefix"]) {
                $newKey = "";
            } else {
                $newKey = $parentKey ? $parentKey . "_" . $key : $key;
            }
            if (gettype($value) == "array") {
                $array = array_merge($array, HiveApi::flatten($value, $opts, $newKey));
            } else {
                if (!ctype_digit($value)) {
                    $json = json_decode($value, true);
                }
                if ($json) {
                    $array = array_merge($array, HiveApi::flatten($json, $opts, $newKey));
                } else {
                    $prefix = "";
                    if ($opts["mappings"] && gettype($opts["mappings"] == "array")) {
                        foreach ($opts["mappings"] as $mapKey => $mapValue) {
                            if ($mapKey == $key) {
                                $prefix = $mapValue;
                            }
                        }
                    }
                    if (!$prefix) {
                        $prefix = ($parentKey ? $parentKey . "_" : "") . $key;
                    }

                    $array[$prefix] = $value;
                }
            }
            $json = null;
        }
        return $array;
    }

    public static function returnData($data) {
        echo json_encode(["success" => true, "data" => $data]);
    }
    
}