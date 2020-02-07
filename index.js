class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: this.props.task,
            todo : this.props.remove
        }
        this.removeTodo = this.removeTodo.bind(this)
    }

    removeTodo(){
        this.state.todo(this.state.task)
    }

    render() {
        return React.createElement("div", null,
            React.createElement("li", { style: {} }, [this.props.title, "   ",
            React.createElement("button", {onClick:this.removeTodo, id:this.props.title}, "Remove")]))
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.props.tasks
        }
        this.addTask = this.addTask.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }


    addTask(newTask) {
        let newTasks = this.state.tasks
        newTasks.push(newTask)
        this.setState({ tasks: newTasks })
    }


    removeTodo(task) {
        let newTasks = this.state.tasks.filter((e,index) => index!= task)
        this.setState({ tasks: newTasks })
    }

    render() {
        return (
            React.createElement("div", { style: { display: "inline-block" } },
                React.createElement("h2", null, this.props.title),
                React.createElement("ul", null, this.state.tasks.map((t, index) => React.createElement(Task, { key: index, id: index, title: t, task: index, remove: this.removeTodo }))),
                React.createElement(Form, { addTask: this.addTask })
            )
        )
    }
}

class TodoList extends React.Component {


    render() {
        return (
            React.createElement("div", null,
                React.createElement("h1", null, this.props.title),
                this.props.task.map((t, index) => React.createElement(TaskList, { key: index, title: t.title, tasks: t.tasks })),
            )
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addTask: props.addTask,
            newtask: ""
        }
        this.update = this.update.bind(this)
        this.add = this.add.bind(this)
    }

    update(event) {
        this.setState({
            newtask: event.target.value
        });
    }

    add() {
        this.state.addTask(this.state.newtask)
        this.setState({
            newtask: ""
        })
    }

    render() {
        return React.createElement("div", null,
            React.createElement("input", { name: "newtask", value: this.state.newtask, onChange: this.update }),
            React.createElement("input", { type: "submit", onClick: this.add }),
        )
    }
}

const todo = React.createElement(TodoList,
    {
        title: "List",
        task: [{
            title: "Todo List",
            tasks: ["Berthom", "Rose des sables"]
        }, {
            title: "To cook",
            tasks: ["Tacos", "Burger", "Pizza"]
        }]
    }
)

ReactDOM.render(
    todo,
    document.getElementById("content")
);
