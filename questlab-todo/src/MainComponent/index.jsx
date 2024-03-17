const TodoApp = () => {

    const statuses = ["todo", "inProgress", "review", "completed"];


    return (
        <div>
            <div className="text-center mb-5 pt-5 pb-3">
                <h1 className="text-3xl font-bold m-5">QuestLab Todo App</h1>
            </div>
            <div>
                {statuses.map((status) => (
                    <div>
                        <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                        <ul>
                            <li>
                                <span>adi</span>
                                <button>
                                    Remove
                                </button>
                            </li>
                        </ul>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Enter new task"
                                />
                                <button>
                                    Add Task
                                </button>
                            </form>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoApp;