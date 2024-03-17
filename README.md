# QuestLab Todo App

Welcome to the QuestLab Todo App! This application helps you organize your tasks into different categories: Todo, In Progress, Review, and Completed.

## Setup

To set up the project on your local system, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Aditya-Choudhary0/QuestLabTodo.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd todo-app
    ```

3. **Install dependencies using npm:**
    ```bash
    npm install
    ```

4. **Start the development server:**
    ```bash
    npm start
    ```

5. **Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.**

## Tech Stack

The Todo App is built using the following technologies:

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for styling web applications.
- **localStorage:** HTML web storage that allows you to store key/value pairs locally in the user's browser.

## Functionality

### Drag-and-Drop Tasks

The Todo App allows you to easily organize your tasks by dragging and dropping them between different categories. Here's how the drag-and-drop functionality works:

1. **Drag Start:** 
   - To move a task, click and hold on the task you want to move. 
   - While holding the mouse button, drag the task to the desired category.

2. **Drop:**
   - Once you've dragged the task to the desired category, release the mouse button to drop the task into that category.

3. **Updating Status:**
   - When you drop a task into a new category, its status is automatically updated to reflect its new position.
   - For example, if you drag a task from the "Todo" category to the "In Progress" category, its status will change from "Todo" to "In Progress".

### Usage of localStorage

The Todo App utilizes localStorage to persist task data locally in the user's browser. This allows users to access their tasks even after refreshing the page or closing the browser. Here's how localStorage is used in the application:

1. **Initial Loading:**
   - When the Todo App is loaded, it checks localStorage for any existing task data.
   - If task data is found, it is loaded into the application's state.

2. **Updating Data:**
   - Whenever a task is added, removed, or moved between categories, the application updates the task data stored in localStorage.
   - This ensures that the latest task information is always saved and accessible to the user.

3. **Persistence:**
   - Task data stored in localStorage persists across browser sessions.
   - Users can close the browser and return to the application later to find their tasks exactly as they left them.

By using localStorage, the Todo App provides a seamless and persistent task management experience for users.

### Add New Task

In the Todo category, you can add new tasks using the input form.
Enter the task label in the input field and click the "Add Task" button to add it to the Todo list.

### Remove Task

Each task has a "Remove" button that allows you to delete the task from the list.

## Responsive Design

The Todo App is designed to be responsive and work seamlessly across different screen sizes. The layout adjusts dynamically based on the screen width, ensuring a consistent user experience on desktop, tablet, and mobile devices.
