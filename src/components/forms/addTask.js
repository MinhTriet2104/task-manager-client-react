import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import moment from "moment";
import axios from "axios";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      description: "",
      assignee: "",
      creator: "5eeee36efda6530ab8af88ec",
      dueDate: "",
      status: this.props.status,
      difficult: 1,
      projectId: this.props.projectId,
      loading: false,
      users: [],
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    moment.locale("tr");
    this.getUsers();
    this.changeColumnTitle();
  }

  changeColumnTitle = (number) => {
    let newTitle;
    if (number === "1") newTitle = "Backlog";
    else if (number === "2") newTitle = "ToDo";
    else if (number === "3") newTitle = "In Progress";
    else newTitle = "Done";

    return newTitle;
  };

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getUsers() {
    axios
      .get("http://localhost:2104/user")
      .then((r) => {
        this.setState({
          users: r.data,
          err: "",
        });
      })
      .then((r) => {
        console.log(this.state.users);
      })
      .catch((e) => {
        this.setState({
          err: e,
        });
      });
  }

  handleClick = (event) => {
    axios
      .post("http://localhost:2104/task", {
        name: this.state.name,
        description: this.state.description,
        status: this.props.status,
        assignee: this.state.assignee,
        dueDate: this.state.dueDate,
        difficult: this.state.difficult,
        projectId: this.state.projectId,
        creator: this.state.creator,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Created");
          this.toggle();
          this.setState({
            name: "",
            description: "",
            assignee: "",
            dueDate: "",
            difficult: 1,
            loading: false,
          });
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { users } = this.state;
    let userContent;
    if (!users) userContent = <option value="">Loading...</option>;
    else {
      userContent = users.map((user, index) => (
        <option key={index} value={user._id}>
          {user.username}
        </option>
      ));
    }
    return (
      <div>
        <i
          className="fas fa-plus-circle customAddTask"
          onClick={this.toggle}
        ></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Create a New Task to {this.changeColumnTitle(this.props.status)}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Task Name(*):</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Task Description:</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="assignee">Assign To(*):</Label>
              <Input
                type="select"
                name="assignee"
                id="assignee"
                value={this.state.assignee}
                onChange={this.handleInput.bind(this)}
              >
                <option value="" disabled>
                  Choose:
                </option>
                {userContent}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="color">Task Difficult(*):</Label>
              <Input
                type="select"
                name="color"
                id="color"
                value={this.state.difficult}
                onChange={this.handleInput.bind(this)}
              >
                <option value="" disabled>
                  Choose:
                </option>
                <option value="1">Very Easy</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
                <option value="5">Very Hard</option>
              </Input>
            </FormGroup>
            <hr />
            <i className="fas fa-calendar-alt"></i> Created Date:{" "}
            {moment().format("L, h:mm:ss")} <br />
            <i className="fas fa-clock"></i> Due Date(*):{" "}
            <input
              name="dueDate"
              id="dueDate"
              type="datetime-local"
              onChange={this.handleInput.bind(this)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-plus-circle"></i> Add
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              <i className="fas fa-times-circle"></i> Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
