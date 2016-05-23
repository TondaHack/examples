import React from 'react';

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 300
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateOnResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateOnResize);
    }
    
    updateOnResize = () => {
        this.forceUpdate();
    };
    
    getHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || this.state.height;
    }
    
    renderItem(item){
        return <span key={item.id}>{item.name} </span>;
    }

    render() {
        const {data} = this.props;
        const items = data.map(this.renderItem);
        const style = {
            height: `${this.getHeight()}px`
        };

        return (
            <div style={style}>
                {items}
            </div>
        )
    }
}