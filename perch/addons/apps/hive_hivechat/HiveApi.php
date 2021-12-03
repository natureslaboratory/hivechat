<?php

class HiveApi
{
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

    public static function flatten($data, $opts = [], $parentKey = "")
    {
        $array = [];
        foreach ($data as $key => $value) {
            if ($opts["noPrefix"]) {
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

    public static function returnData($data)
    {
        echo json_encode(["success" => true, "data" => $data]);
    }

    public static function filter($array, $keys)
    {
        $data = [];
        foreach ($array as $key => $value) {
            if (in_array($key, $keys)) {
                $data[$key] = $value;
            }
        }

        return $data;
    }

    public static function formatAllStrings($array)
    {
        $newArray = [];
        foreach ($array as $key => $value) {
            if (is_string($value)) {
                $newArray[$key] = addslashes($value);
            } else {
                $newArray[$key] = $value;
            }
        }
        return $newArray;
    }

    public static function random_str(
        int $length = 64,
        string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ): string {
        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $pieces[] = $keyspace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }

    public static function parse_member($member) {
        $requiredFields = [
            "memberEmail",
            "memberID",
            "memberProperties"
        ];

        $filteredMember = [];
        foreach ($requiredFields as $field) {
            if ($field == "memberProperties") {
                $properties = json_decode($member["memberProperties"], true);
                $filteredMember[$field] = $properties;
                continue;
            }
            $filteredMember[$field] = $member[$field];
        }

        return $filteredMember;        
    }
}
