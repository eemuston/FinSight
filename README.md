# FinSight
AI-powered platform that reads company reports, detects financial risks, and answers investor questions.

Two stage PDF validation with prompt injection defense.
Dual model architecture (Haiku for validation, Sonnet for analysis).
Custom RAG pipeline with domain specific financial embeddings.
Vector search with Qdrant and VoyageAI.
JWT auth with per user data isolation.
Frontend in active development.

## Tech stack ##

Backend: Node.js, Express, TypeScript

Database: MongoDB

AI: Anthropic API (Haiku + Sonnet), VoyageAI

Vector DB: Qdrant

Auth: JWT

Infra: Docker

Frontend (in development): React, TypeScript
