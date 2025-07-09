# 📂 Node.js CRUD API with CSV Stream Import

A full-featured backend project built entirely with **Node.js core modules** and no frameworks. This API supports a complete task management system (CRUD) and includes a background CSV stream processor to bulk import tasks.

This project was created as part of my Node.js fundamentals training and demonstrates key backend concepts including file streaming, route handling, and dynamic data management.

---

## 🚀 Features

- ✅ Native HTTP server with `http` module
- ✅ Full CRUD operations on `/tasks`
- ✅ Route parsing with RegExp and `:param` support
- ✅ In-memory database with JSON persistence
- ✅ CSV file parsing with `csv-parse` and streams
- ✅ Duplicate-checking before insertion
- ✅ PATCH support for completing a task
- ✅ Query filters and validations
- ✅ Date formatting with `date-fns`

---

## 🧪 API Endpoints

### `GET /tasks`

List all tasks, with optional search via:
```
/tasks?search=keyword
```
---

### `POST /tasks`

Create a new task.

```json
{
  "title": "Example Task",
  "description": "Something to do"
}
```

### PUT /tasks/:id

Update all fields of a task.
```bash
{
  "title": "Updated title",
  "description": "New description",
  "completed_at": "12-07-2025"
}
```
### PATCH /tasks/:id/complete

Mark a task as completed (sets completed_at to current date).

### DELETE /tasks/:id

Delete a task by its ID.

## 🗃️ CSV Import

A file named fileToImport.csv is parsed using streams. Each line is POSTed to the API as a task:
```bash
title;description
Study Node;Learn about streams and fs
Refactor API;Improve error handling

```
This happens automatically when the server starts.

## 🛠️ Running Locally
```bash
# Clone the repo
git clone https://github.com/ithauront/crud

# Enter the project
cd crud

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🧠 What I Practiced

  * Parsing CSV files via streams in Node.js

  * Validating API inputs and handling errors gracefully

  *  Implementing a lightweight RESTful API without frameworks

  *  Creating PATCH routes and partial updates

  *  Using date-fns for formatting and consistency

  *  Ensuring data integrity with duplication checks
