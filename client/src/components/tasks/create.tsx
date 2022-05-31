import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../store.context";

const CreateView: React.FC = () => {
  const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const taskStore = useContext(storeContext);
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    let title = titleRef.current.value;
    const description = descriptionRef.current.value;
    taskStore.taskStore.createTask({ title, description });
    taskStore.taskStore.getTasks();
    <Link to="/tasks" />;
  }
  return (
    <div>
      <form
        action=""
        method="post"
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input type="text" name="title" ref={titleRef} required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            ref={descriptionRef}
            className="h-24 pl-1"
            required
          />
        </div>

        <button type="submit" className="bg-green-500">
          CreateTask
        </button>
      </form>
    </div>
  );
};
const Create = observer(CreateView);
export { Create };
