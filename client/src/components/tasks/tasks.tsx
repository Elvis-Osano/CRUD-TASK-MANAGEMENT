import React, { useContext, useEffect, useRef, useState } from "react";
import { storeContext } from "../../store.context";
import { taskInterface } from "../../dto/tasks.dto";
import { observer } from "mobx-react-lite";
import { Create } from "./create";
const TaskView: React.FC = () => {
  const taskStore = useContext(storeContext);
  const statusRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("OPEN");
  const [message, setMessage] = useState("");
  const isAuth = taskStore.authStore.isAuthenticated();
  function handlesubmit(e: React.ChangeEvent<HTMLFormElement>, id: number) {
    e.preventDefault();
    console.log(status);
    taskStore.taskStore.patchTask(id, { status });
  }

  useEffect(() => {
    if (isAuth) {
      taskStore.taskStore.getTasks().then((res) => setTasks(res));
    } else {
      setMessage("no tasks please login or create new task");
    }
  }, []);

  if (message) {
    return <span>{message}</span>;
  }
  return (
    <div>
      <div className="container mx-auto grid grid-cols-2">
        <div className="flex flex-col gap-4">
          {tasks.map((item: taskInterface) => {
            return (
              <div
                key={item.id}
                className="w-72 bg-white p-2 gap-2 flex mx-auto flex-col rounded "
              >
                <h4 className="font-mono text-xl font-bold">{item.title}</h4>
                <small className="font-sans"> {item.description}</small>
                <br />
                <i className="text-green-500 uppercase">
                  {" "}
                  <span className="text-blue-500"> Status:</span> {item.status}
                </i>
                <form
                  action=""
                  onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                    handlesubmit(e, item.id)
                  }
                >
                  <select
                    name="status"
                    ref={statusRef}
                    id=""
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setStatus(e.target.value)
                    }
                    className="bg-green-50"
                  >
                    <option value="DONE">DONE</option>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROCESS">IN_PROCESS</option>
                  </select>
                  <button
                    type="submit"
                    className=" ml-8 text-white rounded bg-green-500 p-1"
                  >
                    Update{" "}
                  </button>
                </form>

                <button
                  onClick={() => {
                    taskStore.taskStore.deleteTask(item.id);
                  }}
                  className="bg-red-700 text-white w-full"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-start">
          <Create />
        </div>
      </div>
    </div>
  );
};
const Tasks = observer(TaskView);
export { Tasks };
