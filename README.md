# VectorShift Technical Assessment - Pipeline Builder

This repository contains a full-stack web application for visually building and analyzing node-based pipelines. It was developed as part of the VectorShift Technical Assessment.

The project features a **React-based frontend** powered by `reactflow` for intuitive, drag-and-drop node editing, and a **FastAPI Python backend** for parsing the pipeline and performing cycle detection using Kahn's Algorithm.

---

## 🌟 Features

- **Visual Pipeline Builder**: Drag and drop nodes (such as Input, Output, and Text nodes) onto an interactive canvas.
- **Node Connections**: Easily connect nodes with edges to define the flow of your pipeline.
- **DAG Validation**: Submitting the pipeline sends its structure to the backend, which determines if it forms a valid Directed Acyclic Graph (DAG).
- **Real-time Feedback**: A custom modal provides immediate visual feedback on the number of nodes, number of edges, and whether the pipeline is a DAG.

## 🛠️ Tech Stack

### Frontend
- **React**: UI framework.
- **React Flow (`reactflow`)**: For rendering the interactive node-based canvas.
- **Vanilla CSS**: Custom styling with a modern, glassmorphic aesthetic.

### Backend
- **FastAPI**: High-performance Python web framework.
- **Pydantic**: For strict data validation and serialization.
- **Uvicorn**: ASGI server for running the backend.

---

## 🚀 Getting Started

To get the application up and running locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [Python 3.8+](https://www.python.org/)

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

Create a virtual environment and install the dependencies (FastAPI, uvicorn, pydantic):

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install fastapi uvicorn pydantic
```

Start the FastAPI development server:

```bash
uvicorn main:app --reload --port 8000
```
*The backend will run on `http://localhost:8000`.*

### 2. Frontend Setup

Open a new terminal window and navigate to the `frontend` directory:

```bash
cd frontend
```

Install the required Node dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```
*The frontend will run on `http://localhost:3000`.*

---

## 📡 API Reference

### `POST /pipelines/parse`

Analyzes the constructed pipeline to count its components and check for cycles.

**Request Body:**
```json
{
  "nodes": [
    { "id": "node-1", "type": "input", "data": {} },
    ...
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" },
    ...
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

*The backend utilizes **Kahn's Algorithm (Topological Sort)** to efficiently determine `is_dag`.*