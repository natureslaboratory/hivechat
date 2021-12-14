import { useRouteMatch, useParams, Switch, Route, Redirect, Link } from "react-router-dom";
import { useGetOrganisationQuery, useGetOrganisationSocialsQuery } from "../../services/newApi";
import { ManageOrganisationParams } from "../../services/types";
import AddSocial from "./AddSocial";
import EditSocial from "./EditSocial";
import Button from "../shared/Button/Button";
import Card, { CardHeader } from "../shared/Card/Card";
import Table, { TableHead, TableBody } from "../Table";
import SocialList from "./SocialList";

const ManageSocials: React.FC = (props) => {
    const { path, url } = useRouteMatch();
    let { slug } = useParams<(ManageOrganisationParams)>();
    const { data: org, isLoading: isOrgLoading } = useGetOrganisationQuery(slug)
    const { data: socials, isLoading: isSocialLoading, isFetching } = useGetOrganisationSocialsQuery(org.organisationID);

    return (
        <Card>
            <Switch>
                <Route path={`${path}/socials/add`}>
                    <AddSocial orgID={org.organisationID} redirect={url} isParentFetching={isFetching} />
                </Route>
                <Route path={`${path}/socials/edit/:id`} >
                    <EditSocial socials={socials} redirect={url} isParentFetching={isFetching} />
                </Route>
                <Route exact path={`${path}`}>
                    <SocialList socials={socials} isFetching={isFetching} />
                </Route>
                <Route path={`${path}/*`}>
                    <Redirect to=".." />
                </Route>
            </Switch>
        </Card>
    )
}

export default ManageSocials;