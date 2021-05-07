import React = require('react');
import Hive, {HiveProps} from './Hive';

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
        let publicHives = this.state.publicHives.map(hive => {
                return (
                    <Hive {...hive} key={hive.hiveID} />
                )
            })
        let privateHives = this.state.privateHives.map(hive => {
                return (
                    <Hive {...hive} key={hive.hiveID} />
                )
            })

        return (
            <React.Fragment>
                <h2>Public Hives</h2>
                {publicHives}
                {privateHives.length > 0 ? <h2>Private Hives</h2> : null}
                {privateHives}
            </React.Fragment>
        )
    }
}