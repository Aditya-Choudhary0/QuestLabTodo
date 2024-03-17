import React, { useState, useEffect } from "react";

const TodoApp = () => {
    const statuses = ["todo", "inProgress", "review", "completed"];

    const initialState = statuses.reduce((acc, status) => {
        acc[status] = JSON.parse(localStorage.getItem(status)) || [];
        return acc;
    }, {});

    const [tasks, setTasks] = useState(initialState);

    useEffect(() => {
        statuses.forEach((status) => {
            localStorage.setItem(status, JSON.stringify(tasks[status]));
        });
    }, [tasks]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e, id, status) => {
        e.dataTransfer.setData("id", id);
        e.dataTransfer.setData("status", status);
    };

    const handleDrop = (e, targetStatus) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const sourceStatus = e.dataTransfer.getData("status");
    
        const updatedSourceList = tasks[sourceStatus].filter((item) => item.id !== id);
        const updatedTask = { ...tasks[sourceStatus].find((item) => item.id === id), status: targetStatus };
    
        setTasks({
            ...tasks,
            [sourceStatus]: updatedSourceList,
            [targetStatus]: [...tasks[targetStatus], updatedTask]
        });
    };

    const handleAddTask = (label) => {
        const newTask = {
            id: `item${Date.now()}`,
            label: label,
            status: "todo"
        };
        setTasks({
            ...tasks,
            todo: [...tasks.todo, newTask]
        });
    };

    const handleRemoveTask = (id) => {
        const updatedTasks = {};
        statuses.forEach((status) => {
            updatedTasks[status] = tasks[status].filter((item) => item.id !== id);
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="p-5">
            <div className="text-center mb-5 pt-5 pb-3">
                <h1 className="text-3xl font-bold m-5">QuestLab Todo</h1>
            </div>
            <div className="grid w-9/10 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-blue-500 p-4">
                {statuses.map((status) => (
                    <div
                        key={status}
                        className={`p-4 m-2 rounded-lg shadow-lg ${status === "todo" ? "bg-red-100" : status === "inProgress" ? "bg-orange-100" : status === "review" ? "bg-yellow-100" : "bg-green-100"}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                    >
                        <h2 className="text-lg font-bold mb-3">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                        <ul className="list-none p-0 m-0 border border-gray-400 min-h-40">
                            {tasks[status].map((task) => (
                                <li
                                    key={task.id}
                                    id={task.id}
                                    className={`bg-gray-300 border border-gray-500 cursor-grab p-4 m-2 bg-opacity-20 flex justify-between items-center rounded-xl`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id, task.status)}
                                >
                                    <span>{task.label}</span>
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleRemoveTask(task.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {status === "todo" && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const label = e.target.elements.label.value;
                                    if (label.trim() !== "") {
                                        handleAddTask(label);
                                        e.target.reset();
                                    }
                                }}
                            >
                                <input
                                    type="text"
                                    name="label"
                                    placeholder="Enter new task"
                                    className="mt-3 p-2 border border-gray-400 rounded"
                                />
                                <button
                                    type="submit"
                                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Add Task
                                </button>
                            </form> 
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoApp;
