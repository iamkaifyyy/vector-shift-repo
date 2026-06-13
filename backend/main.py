from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import deque

app = FastAPI()

# ── CORS — allows your React frontend (localhost:3000) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ make sure this matches exactly
    allow_credentials=True,                   # ✅ CHANGED: added this
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request body models ──────────────────────────────────────────────────────

class Node(BaseModel):
    id: str
    type: str | None = None
    data: dict | None = None

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ── DAG check using Kahn's Algorithm (topological sort via BFS) ──────────────

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # Build adjacency list + in-degree count
    node_ids = {n.id for n in nodes}
    in_degree = {n.id: 0 for n in nodes}
    adjacency = {n.id: [] for n in nodes}

    for edge in edges:
        # Skip edges referencing nodes not in the pipeline (safety check)
        if edge.source in node_ids and edge.target in node_ids:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Start with all nodes that have no incoming edges
    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited every node, no cycle exists → it's a DAG
    return visited_count == len(nodes)

# ── Endpoint ─────────────────────────────────────────────────────────────────

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }