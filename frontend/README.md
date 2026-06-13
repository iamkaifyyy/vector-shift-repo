# VectorShift

VectorShift is a visual pipeline builder that lets users create workflows by connecting nodes in an interactive drag-and-drop interface. It uses React Flow on the frontend and FastAPI on the backend to manage and validate pipeline data.

---

## Features

* Drag-and-drop node editor
* Connect nodes to build pipelines
* Multiple node types
* Real-time graph updates
* Pipeline validation
* DAG (Directed Acyclic Graph) check using Kahn’s Algorithm

---

## Tech Stack

### Frontend

* React
* React Flow

### Backend

* FastAPI
* Python

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/vector-shift-repo.git
cd vector-shift-repo
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## API Reference

### POST `/pipelines/parse`

This endpoint validates and analyzes the pipeline structure.

### Request Body

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "input"
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    }
  ]
}
```

### Response

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

### Fields

* `num_nodes`: Total number of nodes in the pipeline
* `num_edges`: Total number of connections
* `is_dag`: Whether the pipeline is a valid Directed Acyclic Graph

---

## How It Works

1. Users create nodes in the frontend
2. Nodes are connected using edges
3. Pipeline is sent to backend via API
4. Backend validates structure
5. Response is returned with analysis

---

## Project Structure

```text
vector-shift-repo/
├── frontend/
├── backend/
└── README.md
```

---

## License

This project is for educational purposes.
