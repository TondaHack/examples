import React from 'react';
import AddItem from './../AddItem/index';
import List from './../List/index';
import todoStore from '../../stores/todoStore';
import todoActions from '../../actions/todoActions';
import Wrapper from './Wrapper.jsx';
import ResizeItems from './ResizeItems.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: todoStore.get()
        };
    }

    componentDidMount() {
        todoStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        todoStore.removeChangeListener(this._onChange);
    }

    handleAddItem(newItem) {
        todoActions.addItem(newItem);
    }

    handleRemoveItem(index) {
        todoActions.removeItem(index);
    }

    _onChange = () => {
        this.setState({
            list: todoStore.get()
        });
    };

    render() {
        const {list, data} = this.state;

        return (
            <Wrapper>
                <h3 className="text-center"> Todo List </h3>
                <AddItem add={this.handleAddItem}/>
                <List items={list} remove={this.handleRemoveItem}/>
                {data.length > 0 &&
                    <ResizeItems data={data} />
                }
            </Wrapper>
        )
    }
}