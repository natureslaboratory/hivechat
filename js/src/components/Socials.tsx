import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Social, { SocialProps } from './Social';
import EditSocial from './EditSocial';

const Socials : React.FunctionComponent = () => {
    const [socialList, setSocialList] = useState<Array<SocialProps>>([]);
    const [editSocial, setEditSocial] = useState<SocialProps>(null)

    let urlSlug = "";
    let urlSplit = window.location.href.split("/");
    for (let i = 0; i < urlSplit.length; i++) {
        const element = urlSplit[i];
        if (element == "organisations") {
            urlSlug = urlSplit[i+1];
        }
    }

    function editLink(socialId : number) {
        setEditSocial(socialList.find(e => e.socialID == socialId))
    }

    function backToSocials() {
        setEditSocial(null);
    }

    function getSocials() {
        axios.get(`/page-api/get-organisation-socials?orgSlug=${urlSlug}`)
            .then(res => {
                if (res.data) {
                    setSocialList(res.data as Array<SocialProps>)
                }
            })
    }

    function saveSocial(social : SocialProps) {
        let data = new FormData();
        for (const key in social) {
            if (Object.prototype.hasOwnProperty.call(social, key)) {
                const element = social[key];
                data.append(key, element);
            }
        }
        data.append("organisationSlug", urlSlug);

        axios.post("/page-api/save-organisation-social", data).then(res => {
            if (res.data.success) {
                console.log("Saved", res.data);
                getSocials();
            } else {
                console.error(`Error: ${res.data.error}`, res.data);
            }
        })
    }

    function deleteSocial(social : SocialProps) {
        let data = new FormData();
        data.append("socialID", social.socialID.toString());

        axios.post("/page-api/delete-organisation-social", data).then(res => {
            if (res.data.success) {
                console.log("Deleted");
                getSocials();
            } else {
                console.error("Error", res.data);
            }
        })
    }

    useEffect(() => {
        getSocials()
    }, [])

    useEffect(() => {
        console.log(socialList)
    }, [socialList])

    useEffect(() => {
        console.log(editSocial);
    }, [editSocial])

    let listRendered = socialList.map((s, i) => <Social editLink={editLink} {...s} key={i} />)

    if (editSocial) {
        return (
            <EditSocial 
                editSocial={editSocial} 
                backToSocials={backToSocials} 
                setEditSocial={setEditSocial} 
                saveSocial={saveSocial}
                deleteSocial={deleteSocial}
            />
        )
    }
    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5 className="card-title m-b-0">Manage Socials</h5>
            </div>
            <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRendered}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Socials;