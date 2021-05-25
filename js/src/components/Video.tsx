import React, { CSSProperties, useEffect, useState } from 'react';

interface VideoProps {
    videoURL : string
}

type Domain = "youtube.com" | "vimeo.com";

const domains : Domain[] = [
    "youtube.com",
    "vimeo.com"
]

const Video : React.FunctionComponent<VideoProps> = (props) => {
    const [domain, setDomain] = useState<Domain>(null)

    const videoStyle : CSSProperties = {
        width: "100%",
        aspectRatio: "16 / 9"
    }

    function getVideoDomain() {
        let videoDomain = domains.find(d => props.videoURL.includes(d))
        setDomain(videoDomain);
    }

    function getVideoIFrame() {
        let url = formatVideoURL()
        switch (domain) {
            case "youtube.com":
                return (
                    <iframe 
                        style={videoStyle}
                        src={url}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                )
            case "vimeo.com":
                return (
                    <iframe 
                        style={videoStyle}
                        src={url}
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                )
            default:
                console.error("Unknown video type");
                console.log(domain)
        }
    }

    function formatVideoURL() {
        switch (domain) {
            case "youtube.com":
                let youtubeSplit = props.videoURL.split("?v=");
                let youtubeVideoID = youtubeSplit[youtubeSplit.length-1];
                return "https://youtube.com/embed/" + youtubeVideoID;
            case "vimeo.com":
                let urlSplit = props.videoURL.split("/");
                let videoID = "";
                for (let i = urlSplit.length-1; i >= 0; i--) {
                    const element = urlSplit[i];
                    if (element) {
                        videoID = element;
                        break;
                    }
                }
                return "https://player.vimeo.com/video/" + videoID;
            default:
                throw new Error("What");
        }
    }

    useEffect(() => {
        getVideoDomain();
    }, [])

    useEffect(() => {
        if (domain) {
            getVideoIFrame()
        }
    }, [domain])

    let credit = "";
    if (domain) {
        switch (domain) {
            case "vimeo.com":
                credit = "Video - via Vimeo";
                break;
            case "youtube.com":
                credit = "Video - via Youtube";
                break;
            default:
                credit = "";
        }
    }

    let iframe = null;
    if (!props.videoURL) {
        return null;
    }

    const isIframe = props.videoURL.includes("iframe");
    
    return (
        <div className="main-card mb-3 card">
            <div className="card-body">
                {credit ? <h5 className="card-title">{credit}</h5> : null}
                <div dangerouslySetInnerHTML={isIframe ? {__html: props.videoURL} : null}>
                    {domain && !isIframe ? getVideoIFrame() : null}
                </div>  
            </div>
        </div>
    )
}

export default Video;