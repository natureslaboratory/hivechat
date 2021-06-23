import React from 'react';

export interface SocialProps {
    socialID : number,
    socialType : string,
    socialLink : string
}


export interface SocialFuncs {
    editLink(socialID : number) : void
}

const Social : React.FunctionComponent<SocialProps & SocialFuncs> = (props) => {
    return (
        <tr>
            <td>
                {props.socialType}
            </td>
            <td>
                {props.socialLink}
            </td>
            <td>
                <button className="btn btn-primary" onClick={() => props.editLink(props.socialID)}>Edit</button>
            </td>
        </tr>
    )
}

export default Social;