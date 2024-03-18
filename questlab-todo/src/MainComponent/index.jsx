import React, { useState, useEffect } from "react";

const TodoApp = () => {
    const statuses = ["todo", "inProgress", "review", "completed"];

    const initialState = statuses.reduce((acc, status) => {
        acc[status] = JSON.parse(localStorage.getItem(status)) || [];
        return acc;
    }, {});

    const [tasks, setTasks] = useState(initialState);
    const [showForm, setShowForm] = useState({});

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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleDrop = (e, targetStatus) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const sourceStatus = e.dataTransfer.getData("status");

        if (sourceStatus !== targetStatus) {
            const updatedSourceList = tasks[sourceStatus].filter((item) => item.id !== id);
            const updatedTask = { ...tasks[sourceStatus].find((item) => item.id === id), status: targetStatus };

            setTasks({
                ...tasks,
                [sourceStatus]: updatedSourceList,
                [targetStatus]: [...tasks[targetStatus], updatedTask]
            });
        }
    };

    const handleAddTask = (label, status) => {
        const newTask = {
            id: `item${Date.now()}`,
            label: label,
            status: status,
            color: getRandomColor()
        };
        setTasks({
            ...tasks,
            [status]: [...tasks[status], newTask]
        });
        setShowForm((prev) => ({ ...prev, [status]: false }));
    };

    const handleRemoveTask = (id) => {
        const updatedTasks = {};
        statuses.forEach((status) => {
            updatedTasks[status] = tasks[status].filter((item) => item.id !== id);
        });
        setTasks(updatedTasks);
    };

    const handleToggleForm = (status) => {
        setShowForm((prev) => ({
            ...statuses.reduce((acc, s) => {
                acc[s] = s === status ? !prev[s] : false;
                return acc;
            }, {})
        }));
    };

    return (
        <div className="p-5">
            <div className="text-center mb-5 pt-5 pb-3">
                <h1 className="text-3xl font-bold m-5">QuestLab Todo</h1>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 bg-blue-500">
                {statuses.map((status) => (
                    <div
                        key={status}
                        className={`p-4 m-2 rounded-lg shadow-lg bg-[#f1f2f4]`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                    >
                        <div className="flex justify-between flex-col h-full">
                            <div>
                                <h2 className="text-lg font-bold mb-3">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                                <ul className="list-none p-0 m-0 min-h-40">
                                    {tasks[status].map((task) => (
                                        <li
                                            key={task.id}
                                            id={task.id}
                                            className={`bg-white border border-gray-500 cursor-grab p-4 mt-2 flex justify-between items-center rounded-xl`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task.id, task.status)}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                    backgroundColor: task.color
                                                    }}
                                                    className="w-10 mb-1 h-2 rounded-full  "
                                                ></div>
                                                <span>{task.label}</span>
                                                <div className="mt-2 flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleRemoveTask(task.id)} width="16" height="16" fill="currentColor" className="bi bi-trash cursor-pointer text-red-600 hover:text-red-700" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                {!showForm[status] && (
                                    <button
                                        className="mt-auto bg-transparent hover:bg-blue-300 text-black py-2 px-4 rounded border border-transparent"
                                        onClick={() => handleToggleForm(status)}
                                    >
                                        + Add Task
                                    </button>
                                )}
                                {showForm[status] && (
                                    <div>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const label = e.target.elements.label.value;
                                                if (label.trim() !== "") {
                                                    handleAddTask(label, status);
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
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoApp;
