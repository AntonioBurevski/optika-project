import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div>
                <header className="header">
                    <div>
                        <Link to="/" className="navbar-brand">
                            <div
                                style={{
                                    fontSize: 'xx-large',
                                    fontWeight: 600,
                                    color: '#2185d0',
                                    position: 'relative'
                                }}>
                                OPTIKA ADMIN
                            </div>
                        </Link>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header