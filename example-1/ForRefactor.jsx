import React from 'react';
import AddItem from './../AddItem/index';
import List from './../List/index';
import todoStore from '../../stores/todoStore';
import todoActions from '../../actions/todoActions';

export default class Hell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: todoStore.get(),
            data: this.props.data,
            height: 300
        };
        this.updateOnResize = this.updateOnResize.bind(this);
    }

    componentDidMount() {
        todoStore.addChangeListener(this._onChange);
        window.addEventListener('resize', this.updateOnResize);
    }

    componentWillUnmount() {
        todoStore.removeChangeListener(this._onChange);
        window.removeEventListener('resize', this.updateOnResize);
    }

    handleAddItem(newItem) {
        todoActions.addItem(newItem);
    }

    handleRemoveItem(index) {
        todoActions.removeItem(index);
    }

    updateOnResize () {
        this.forceUpdate();
    };


    getHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || this.state.height;
    }

    _onChange = () => {
        this.setState({
            list: todoStore.get()
        });
    };

    render() {
        const {list, height} = this.state;
        const {data} = this.props;
        const style = {
            height: `${this.getHeight()}px`
        };

        return (
            <main className="col-sm-6 col-md-offset-3">
                <div className="col-sm-12">
                    <h3 className="text-center"> Todo List </h3>
                    <AddItem add={this.handleAddItem}/>
                    <List items={list} remove={this.handleRemoveItem}/>
                    {data &&
                    <div style={style}>
                        {data.map(item => {
                            return <span>{item.name}</span>;
                        })}
                    </div>
                    }
                </div>
            </main>
        )
    }
}