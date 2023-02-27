import React, { useEffect } from "react";
import "./planner-style.css";
import { useState } from "react";

export const PlannerInput = () => {
  const date = `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`;
  const [planItems, setPlanItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setstartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);
  const [showModal, setShowModal] = useState(false);
  const submitForm = (e) => {
    e.preventDefault();
    const planItem = { title, description, startTime, endTime };
    let prevPlanItems = [...planItems];
    prevPlanItems.push(planItem);
    setPlanItems(prevPlanItems);
    setTitle("");
    setDescription("");
    setstartTime(date);
    setEndTime(date);
    setShowModal(false);
  };
  const show = showModal ? "-show" : "";
  return (
    <div className="items-container">
      {planItems && planItems.length
        ? planItems.map((i, idx) => {
            return (
              <div key={idx} className="items">
                <p>You have a task with title {i?.title}</p>
                <p> Description{i?.description}</p>
                <p>Start time: {i?.startTime}</p>
                <p>End Time: {i?.endTime}</p>
              </div>
            );
          })
        : null}

      <button className="add-task" onClick={(e) => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>

      <div className={`input-form${show}`}>
        <form className="form" onSubmit={submitForm}>
          <label>Enter the title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Enter the description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Next give the time</p>
          <div className="date-area">
            <label>From </label>
            <input
              type="date"
              value={startTime}
              onChange={(e) => setstartTime(e.target.value)}
            />
            <label>To</label>
            <input
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <br />
          </div>

          <input type="submit" value="Submit Task" />
        </form>
      </div>
    </div>
  );
};
// class TodoTextInput extends Component {
//   static propTypes = {
//     onSave: PropTypes.func.isRequired,
//     text: PropTypes.string,
//     placeHolder: PropTypes.string,
//     newTodo: PropTypes.bool,
//     editing: PropTypes.bool,
//   };
//   state = {
//     text: this.props.text || "",
//   };

//   handleSubmit = (event) => {
//     const text = event.target.value.trim();
//     if (event.which === 13) {
//       this.props.onSave(text);
//       if (this.props.newTodo) {
//         this.setState({ text: "" });
//       }
//     }
//   };
//   handleChange = (event) => {
//     this.setState({ text: event.target.value });
//   };

//   handleBlur = (event) => {
//     if (!this.props.newTodo) {
//       this.props.onSave(event.target.value);
//     }
//   };
//   render() {
//     return (
//       <input
//         className={classnames({
//           edit: this.props.editing,
//           "new-todo": this.props.newTodo,
//         })}
//         type="text"
//         placeholder={this.props.placeholder}
//         value={this.props.text}
//         onChange={this.handleChange}
//         onKeyDown={this.handleSubmit}
//         onBlur={this.handleBlur}
//         autoFocus={true}
//       />
//     );
//   }
// }

// export default TodoTextInput;
