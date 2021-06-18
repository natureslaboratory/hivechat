import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Social, { SocialProps } from './Social';
import EditSocial from './EditSocial';
import AddSocial, { NewSocialProps } from './AddSocial';

const Socials : React.FunctionComponent = () => {
    const [socialList, setSocialList] = useState<Array<SocialProps>>([]);
    const [editSocial, setEditSocial] = useState<SocialProps>(null)
    const [showAddSocial, setShowAddSocial] = useState(false);
    const [urlSlug, setUrlSlug] = useState("");

    function editLink(socialId : number) {
        setEditSocial(socialList.find(e => e.socialID == socialId))
    }

    function backToSocials() {
        setEditSocial(null);
        setShowAddSocial(false);
    }

    function getSocials() {
        let attempts = 0;
        let interval = setInterval(() => {
            if (attempts >= 5) {
                clearInterval(interval);
            }
            axios.get(`/page-api/get-organisation-socials?orgSlug=${urlSlug}`)
                .then(res => {
                    if (res.data) {
                        setSocialList(res.data as Array<SocialProps>)
                        clearInterval(interval)
                    }
                })
            attempts++
        }, 200);
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
                getSocials();
            }
        })
    }

    function deleteSocial(social : SocialProps) {
        let data = new FormData();
        data.append("socialID", social.socialID.toString());

        axios.post("/page-api/delete-organisation-social", data).then(res => {
            if (res.data.success) {
                getSocials();
            }
        })
    }

    function addSocial(social : NewSocialProps) {
        let data = new FormData();
        data.append("organisationSlug", urlSlug);
        data.append("socialType", social.socialType);
        data.append("socialLink", social.socialLink);

        axios.post("/page-api/add-organisation-social", data).then(res => {
            if (res.data.success) {
                getSocials();
            }
        })

    }

    useEffect(() => {
        let urlSplit = window.location.href.split("/");
        for (let i = 0; i < urlSplit.length; i++) {
            const element = urlSplit[i];
            if (element == "organisations") {
                setUrlSlug(urlSplit[i+1]);
            }
        }
    }, [])

    useEffect(() => {
        getSocials()
    }, [urlSlug])

    let listRendered = socialList.map((s, i) => <Social editLink={editLink} {...s} key={i} />)

    let placeholder = <tr><td colSpan={3}>You have no socials</td></tr>

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

    if (showAddSocial) {
        return (
            <AddSocial 
                backToSocials={backToSocials}
                addSocial={addSocial}
            />
        )
    }
    return (
        <div className="card mb-3">
            <div className="card-header" style={{display: "flex", justifyContent: "space-between"}}>
                <h5 className="card-title m-b-0">Manage Socials</h5>
                <button className="btn btn-alternate" onClick={() => setShowAddSocial(true)}>+ New</button>
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
                        {listRendered.length > 0 ? listRendered : placeholder}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Socials;