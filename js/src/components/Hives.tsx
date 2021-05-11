import React = require('react');
import Hive, {HiveProps} from './Hive';
import HivesContainer from "./HivesContainer";

type State = {
    publicHives: Array<HiveProps>,
    privateHives: Array<HiveProps>,
    slug : string
}

type Props = {
}

export default class Hives extends React.Component<Props, State>
{
    constructor(props) {
        super(props)
        this.state = {
            publicHives: [],
            privateHives: [],
            slug: ""
        }

        this.getSlug = this.getSlug.bind(this);
    }

    componentDidMount() {
        this.getSlug();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.slug !== this.state.slug) {
            fetch(`/page-api/organisationpublichives?orgSlug=${this.state.slug}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({publicHives: data as Array<HiveProps>})
                    }

                })
                
            fetch(`/page-api/organisationprivatehives?orgSlug=${this.state.slug}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({privateHives: data as Array<HiveProps>})
                    }
                })
        }
    }


    getSlug() {
        let urlSplit = window.location.href.split("/");
        for (let i = 0; i < urlSplit.length; i++) {
            const element = urlSplit[i];
            if (element == "organisations") {
                this.setState({ slug: urlSplit[i+1] });
            }
        }
    }



    render() {
        return (
            <div className="c-hives-container">
                <HivesContainer hives={this.state.publicHives} title="Public Hives" />
                <HivesContainer hives={this.state.privateHives} title="Private Hives" />
            </div>
        )
    }
}