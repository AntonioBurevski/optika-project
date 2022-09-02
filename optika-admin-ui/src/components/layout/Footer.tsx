import React, { Component } from 'react'

class Footer extends Component {
    constructor({props}: { props: any }) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted" style={{position: 'relative'}}>
                        All Rights Reserved @Optika-Gostivar 2022
                    </span>
                </footer>
            </div>
        )
    }
}

export default Footer