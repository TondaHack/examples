import React from 'react';

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props;

        return (
            <main className="col-sm-6 col-md-offset-3">
                <div className="col-sm-12">
                    {children}
                </div>
            </main>
        )
    }
}