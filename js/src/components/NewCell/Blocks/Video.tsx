import axios from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import Image from './Image';

interface VideoProps {
    title?: string
    url: string
    description: string
    small?: boolean
}

type Domain = "youtube.com" | "vimeo.com";

const domains: Domain[] = [
    "youtube.com",
    "vimeo.com"
]

interface VideoDetails {
    maxWidth: number
    maxHeight: number
    thumbnail: string
    id: string
    domain: Domain
    embedURL: string,
    title: string
}

interface VideoFuncs {
    handleLoad(): void
}

const Video: React.FunctionComponent<VideoProps & VideoFuncs> = (props) => {
    const [videoDetails, setVideoDetails] = useState<VideoDetails>({
        id: "",
        maxHeight: null,
        maxWidth: null,
        thumbnail: null,
        domain: null,
        embedURL: "",
        title: ""
    })


    const videoStyle: CSSProperties = {
        width: "100%",
        aspectRatio: "16 / 9"
    }

    async function getVideoDetails() {
        let details: VideoDetails = {
            id: "",
            maxHeight: null,
            maxWidth: null,
            thumbnail: null,
            domain: null,
            embedURL: "",
            title: ""
        }
        details.domain = domains.find(d => props.url.includes(d))
        let url = props.url;
        if (props.url.includes("iframe")) {
            let urlArr = props.url.split("\"");
            urlArr.forEach(e => {
                if (e.includes("https") || e.includes("http")) {
                    url = e;
                }
            })
        }
        console.log(url);
        switch (details.domain) {
            case "youtube.com":
                let youtubeSplit = url.split("?v=");
                details.id = youtubeSplit[youtubeSplit.length - 1];
                let data = await axios.get(`/page-api/youtube-details?id=${details.id}`)
                    .then(res => res.data);
                let videoDetails = data.items[0];
                details.maxHeight = videoDetails.snippet.thumbnails.medium.height;
                details.maxWidth = videoDetails.snippet.thumbnails.medium.width;
                details.thumbnail = videoDetails.snippet.thumbnails.medium.url;
                details.embedURL = "https://youtube.com/embed/" + videoDetails.id;
                details.title = props.title ? props.title : videoDetails.snippet.title;
                break;
            case "vimeo.com":
                let urlSplit = url.split("/");
                for (let i = urlSplit.length - 1; i >= 0; i--) {
                    const element = urlSplit[i];
                    if (element) {
                        details.id = element;
                        break;
                    }
                }
                details.embedURL = "https://player.vimeo.com/video/" + details.id;
                details.title = props.title || "";
                break;
            default:
                break;
        }

        setVideoDetails(details);
    }

    function getVideoIFrame() {
        switch (videoDetails.domain) {
            case "youtube.com":
                return (
                    <iframe
                        style={videoStyle}
                        src={videoDetails.embedURL}
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
                        src={videoDetails.embedURL}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                )
            default:
                console.error("Unknown video type");
        }
    }

    useEffect(() => {
        getVideoDetails();
    }, [])

    let credit = "";
    if (videoDetails.domain) {
        switch (videoDetails.domain) {
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
    if (!props.url) {
        return null;
    }

    const isIframe = props.url.includes("iframe");
    if (props.small) {
        return (
            <div className="c-block-content c-block-content--small">
                <h5 className="card-title">Video</h5>
                <div className="c-block-content__video">
                    {videoDetails.thumbnail ? <Image handleLoad={props.handleLoad} url={videoDetails.thumbnail} height={videoDetails?.maxHeight} width={videoDetails?.maxWidth} alt="Video Thumbnail" /> : <div style={{height: `${videoDetails?.maxWidth}`}} />}
                    {videoDetails.title && <strong>{videoDetails.title}</strong>}
                </div>
            </div>
        )
    }
    
    if (isIframe) {
        return (
            <div dangerouslySetInnerHTML={isIframe ? { __html: props.url } : null} className={"c-block-content " + props.small && "c-block-content--small"}>
            </div>
        )
    }

    return (
        <>
            <div className={"c-block-content " + props.small && "c-block-content--small"}>
                {videoDetails.domain && !isIframe && getVideoIFrame()}
            </div>
        </>
    )
}

export default Video;