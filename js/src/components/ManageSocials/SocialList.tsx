import { useRouteMatch, Link } from "react-router-dom";
import { SocialType } from "../../services/types";
import Button from "../shared/Button/Button";
import { CardHeader } from "../shared/Card/Card";
import Table, { TableRow, TableCell, TableBody, TableHead } from "../Table";

const TablePlaceholder: React.FC<{ message: string, colSpan: number }> = (props) => (
    <TableRow>
        <TableCell colSpan={props.colSpan}>
            {props.message}
        </TableCell>
    </TableRow>
)


const SocialList: React.FC<{ socials: SocialType[], isFetching?: boolean }> = ({ socials, isFetching }) => {
    const { url } = useRouteMatch();

    const loadingPlaceholder = <TablePlaceholder colSpan={3} message="Loading..." />
    const noSocials = <TablePlaceholder colSpan={3} message="No Socials" />

    const socialRows = socials && socials.length > 0 ? socials.map(s => <SocialRow {...s} key={s.socialID} />) : noSocials;
    
    

    return (
        <>
            <CardHeader title="Socials">
                <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                    {isFetching && <p style={{margin: 0, fontWeight: 400, opacity: 1, textTransform: "capitalize"}}>Updating...</p>}
                    <Link to={`${url}socials/add`}>
                        <Button label="+ New" type="alternate" />
                    </Link>
                </div>
            </CardHeader>
            <Table>
                <TableHead labels={["Type", "Link", "Actions"]} />
                <TableBody>
                    {socials ? socialRows : loadingPlaceholder}
                </TableBody>
            </Table>
        </>
    )
}

const SocialRow: React.FC<SocialType> = (props) => {
    const { url } = useRouteMatch();
    return (
        <TableRow>
            <TableCell>
                {props.socialType}
            </TableCell>
            <TableCell>
                {props.socialLink}
            </TableCell>
            <TableCell>
                <Link to={`${url}socials/edit/${props.socialID}`}>
                    <Button label="Edit" type="primary" />
                </Link>
            </TableCell>
        </TableRow>
    )
}

export default SocialList;