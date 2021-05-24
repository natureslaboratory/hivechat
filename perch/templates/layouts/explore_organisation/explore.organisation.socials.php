<?php 

    $organisation = get_organisation_by_slug(perch_layout_var("organisationSlug", true), ["skip-template" => true], true);
    
    $socials = get_org_socials($organisation["organisationID"]);
    echo "<div class='c-logos'>";
    foreach ($socials as $social) {
        switch ($social["socialType"]) {
            case "Facebook":
                $logo = 'facebook-square';
                break;
            case "Twitter":
                $logo = "twitter";
                break;
            case "LinkedIn":
                $logo = "linkedin";
                break;
            default:
                $logo = "Null";
        }
        echo "<a target='_blank' href='$social[socialLink]'><i class='fab fa-$logo'></i></a>";
    }
    echo "</div>";