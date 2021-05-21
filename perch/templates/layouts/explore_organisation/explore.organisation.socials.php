<?php 

    $organisation = get_organisation_by_slug(perch_layout_var("organisationSlug", true), ["skip-template" => true], true);
    
    $socials = get_org_socials($organisation["organisationID"]);
    echo "<div class='c-logos'>";
    foreach ($socials as $social) {
        switch ($social["socialType"]) {
            case "Facebook":
                $logo = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="2143.000000pt" height="2143.000000pt" viewBox="0 0 2143.000000 2143.000000"
                class="c-logo c-logo-fb"
                preserveAspectRatio="xMidYMid meet">
                
                <g class="c-logo__main" transform="translate(0.000000,2143.000000) scale(0.100000,-0.100000)"
                stroke="none">
                <path d="M10395 21373 c-1814 -52 -3594 -573 -5155 -1507 -531 -317 -1078
                -717 -1575 -1151 -219 -192 -758 -731 -950 -950 -956 -1095 -1653 -2301 -2106
                -3645 -651 -1927 -733 -4036 -234 -6018 642 -2559 2232 -4804 4440 -6271 1232
                -819 2578 -1360 4020 -1616 109 -19 202 -35 206 -35 5 0 9 1647 9 3725 l0
                3725 -1355 0 -1355 0 0 1545 0 1545 1355 0 1355 0 0 1323 c0 799 4 1377 10
                1462 129 1769 1002 2993 2487 3484 245 81 481 135 764 175 302 43 423 50 819
                50 496 -1 916 -27 1525 -94 241 -27 715 -91 788 -106 l27 -6 0 -1313 0 -1313
                -777 -5 c-811 -5 -865 -7 -1089 -52 -603 -121 -1005 -497 -1153 -1080 -57
                -226 -55 -176 -58 -1397 l-4 -1128 1475 0 c811 0 1477 -3 1479 -7 2 -5 -103
                -699 -232 -1543 l-236 -1535 -1243 -3 -1242 -2 0 -3725 0 -3726 33 6 c673 113
                1267 264 1847 470 847 302 1593 674 2340 1170 2095 1389 3642 3487 4344 5890
                300 1028 440 2074 423 3160 -9 538 -40 927 -113 1420 -212 1424 -712 2794
                -1466 4013 -438 708 -945 1348 -1538 1942 -2088 2090 -4906 3209 -7865 3123z"/>
                </g>
                </svg>';
                break;
            case "Twitter":
                $logo = "Twitter";
                break;
            case "LinkedIn":
                $logo = "LinkedIn";
                break;
            default:
                $logo = "Null";
        }
        echo "<a target='_blank' href='$social[socialLink]'>$logo</a>";
    }
    echo "</div>";