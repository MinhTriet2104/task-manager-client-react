import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router";
import Project from "./Project";
import AddStory from "./forms/addStory";
import Loader from "./loader";
import Header from "./common/header";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      show: true,
      projects: [],
      err: "",
      // err2: "",
      // loading: true,
      loadingProject: true,
    };

    this.getProjects = this.getProjects.bind(this);
  }

  componentDidMount = () => {
    // this.getStoryDetails();
    this.getProjects();
    // setInterval(() => {
    //   this.getData();
    // }, 2000);
  };

  getProjects = () => {
    axios
      .get(`http://localhost:2104/project`)
      .then((r) => {
        console.log("getProjects", r.data);
        this.setState({
          projects: r.data,
          err: "",
        });
      })
      .then(() => {
        this.setState({
          loadingProject: false,
        });
      })
      .catch((e) => {
        this.setState({
          loadingProject: false,
          err: e,
        });
      });
  };

  // getData = () => {
  //   axios
  //     .get(`https://5e8818e919f5190016fed301.mockapi.io/api/task`)
  //     .then((r) => {
  //       console.log("getData:", r.data);
  //       this.setState({
  //         tasks: r.data,
  //         err: "",
  //       });
  //     })
  //     .then(() => {
  //       this.setState({
  //         loading: false,
  //       });
  //     })
  //     .catch((e) => {
  //       if (!e.response) {
  //         this.setState({
  //           loading: true,
  //           err: e,
  //         });
  //       } else
  //         this.setState({
  //           loading: false,
  //           err: e,
  //         });
  //     });
  // };

  render() {
    let { projects, loadingProject } = this.state;
    let storyTable, projectRender;

    if (!loadingProject) {
      const projectId = projects.find(
        (project) => project._id === this.props.router.params.id
      )._id;

      storyTable = projects.map((project, index) => {
        return (
          <li key={index}>
            <Link to={`/project/${project._id}`} activeClassName="active">
              <i className="fas fa-list-alt"></i>
              <span className="menu-text">{project.name}</span>
            </Link>
          </li>
        );
      });

      projectRender = (
        <Project
          projectId={projectId}
          // storyType={this.props.params.id}
          // tasks={this.state.tasks}
          // loading={this.state.loading}
        />
      );
    } else {
      storyTable = (
        <li>
          <div className="loader">
            <Loader />
          </div>
        </li>
      );

      projectRender = (
        <li>
          <div className="loader">
            <Loader />
          </div>
        </li>
      );
    }

    return (
      <div>
        <div className="side">
          <span className="logo">Task Manager</span>
          <ul className="side-menu">{storyTable}</ul>
          <div className="otherMenu">
            <AddStory />
          </div>
        </div>
        <div className="con">
          <Header />
          <aside>{projectRender}</aside>
        </div>
      </div>
    );
  }
}
export default Dashboard;
