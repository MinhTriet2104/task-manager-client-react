import React, { Component } from "react";

import moment from "moment";
// import ModalExampleDimmer from "./modal";
import axios from "axios";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import Loader from "./loader";

class Task extends Component {
  componentWillReceiveProps() {
    $(".mcell-task").draggable({
      appendTo: "body",
      cursor: "move",
      helper: "clone",
      revert: "invalid",
    });

    $(".mcell").droppable({
      tolerance: "intersect",
      accept: ".mcell-task",
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function (event, ui) {
        $(this).append($(ui.draggable));
        console.log($(this).find("li").attr("id"));
      },
    });
  }

  // api = (id) => {
  //   axios
  //     .delete("/tasks/delete/" + id)
  //     .then(function (response) {
  //       if (response.status === "1") alert("ok");
  //       console.log(response);
  //     })
  //     .then(() => {})
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  render() {
    const { tasks, loading, filter } = this.props;
    let content;

    if (loading) {
      content = (
        <div className="loader">
          <Loader />
        </div>
      );
    } else {
      content = tasks
        .filter((task) => task.status === Number(filter))
        .map((task, index) => {
          return (
            <li id={task._id} className="mcell-task" key={index}>
              <span className="task-name">
                <span>{task.name}</span>
                <i
                  id="delete"
                  className="fas fa-times"
                  // onClick={() => this.api(task._id)}
                ></i>
              </span>
              <span className="task-details">{task.content}</span>
              <div>
                <span className="task-due">
                  {moment(task.dueDate).format("DD.MM.YYYY")}
                </span>
                <span className="task-contributors">
                  <img
                    alt={task.assignee.name}
                    title={task.assignee.name}
                    src={
                      task.assignee.name
                        ? task.assignee.name
                        : "https://i.imgur.com/5bh5qpe.jpg"
                    }
                  />
                </span>
              </div>
              <div className={"colorGreen"} />
              {/* <ModalExampleDimmer propContent={task} classType="btnDashboard" /> */}
            </li>
          );
        });
    }
    return <div className="process">{content}</div>;
  }
}
export default Task;
