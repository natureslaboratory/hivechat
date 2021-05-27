import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import RichTextEditor from 'react-rte';

export interface HiveDetailsProps {
    hiveID: number
    hiveTitle: string
    hiveCategory: string
    hivePrivacy: "Public" | "Private" | "Draft" | ""
    introduction: string
}

interface EditorProps {
    editorIntroduction : any
}

export interface HiveDetailsFuncs {
    getHive(e: React.MouseEvent<HTMLElement>) : void
    updateHive(data : HiveDetailsProps) : Promise<void>
}

const HiveDetails: React.FunctionComponent<HiveDetailsProps & HiveDetailsFuncs> = ({ hiveID, hiveTitle, hiveCategory, hivePrivacy, introduction, getHive, updateHive }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editorIntro, setEditorIntro] = useState(null);
    const [editValues, setEditValues] = useState<HiveDetailsProps>({
        hiveID: -1,
        hiveTitle: "",
        hiveCategory: "",
        hivePrivacy: "",
        introduction: ""
    })

    useEffect(() => {
        if (hiveID) {
            setEditValues({
                hiveID,
                hiveTitle,
                hiveCategory,
                hivePrivacy,
                introduction: ""
            })

            setEditorIntro(introduction ? RichTextEditor.createValueFromString(introduction, 'html') : RichTextEditor.createEmptyValue());
        }
    }, [hiveID])

    useEffect(() => {
        if (editorIntro) {
            setEditValues({...editValues, introduction: editorIntro.toString("html")});
        }
    }, [editorIntro])

    function handleChange(e) {
        switch (e.target.id) {
            case "hiveTitle":
                setEditValues({ ...editValues, hiveTitle: e.target.value });
                break;
            case "hivePrivacy":
                setEditValues({ ...editValues, hivePrivacy: e.target.value })
                break;
            default:
                null
        }
    }


    function editDetails(e: React.MouseEvent<HTMLElement>) {
        console.log("Edit");
    }

    if (showEdit) {
        return (
            <div className="card">
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
                    Editing Hive Details
                    <button onClick={() => setShowEdit(false)} className="btn btn-alternate"><i className="fas fa-chevron-left"></i> Back</button>
                </div>
                <form className="card-body">
                    <div className="form-group">
                        <label htmlFor="hiveTitle">Title</label>
                        <input className="form-control" type="text" value={editValues.hiveTitle} id="hiveTitle" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hivePrivacy">Privacy</label>
                        <select className="form-control" value={editValues.hivePrivacy} id="hivePrivacy" onChange={handleChange}>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Draft">Draft</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="introduction">Introduction</label>
                        <RichTextEditor 
                            value={editorIntro}
                            onChange={(e) => {
                                setEditorIntro(e);
                            }}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
                        <button className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            updateHive(editValues).then(() => {
                                setShowEdit(false);
                            });
                        }}>Save</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setShowEdit(false)
                        }} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="card">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
                {hiveTitle}
                <button onClick={() => setShowEdit(true)} className="btn btn-alternate"><i className="fas fa-pencil-alt"></i> Edit</button>
            </div>
            <div className="card-body" dangerouslySetInnerHTML={{ __html: introduction }}>
            </div>
        </div>
    )
}

export default HiveDetails;