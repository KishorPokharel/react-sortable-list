import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import data from "./data";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState(data.tasks);
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const idx = tasks.length == 0 ? 0 : tasks.length;
    setTasks([...tasks, { id: idx, content: task }]);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let newArray = Array.from(tasks);
    const [item] = newArray.splice(source.index, 1);
    newArray.splice(destination.index, 0, item);
    setTasks([...newArray]);
  };

  return (
    <div className="app">
      <form>
        <input
          type="text"
          className="taskInput"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <input
          type="submit"
          value="Add"
          className="submitButton"
          onClick={handleSubmit}
        />
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasklist">
          {(provided) => (
            <div
              className="tasklist"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <p
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {task.content}
                    </p>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
