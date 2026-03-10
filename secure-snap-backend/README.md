# Secure Snap — Backend

This folder contains a minimal Express backend scaffold for the Secure Snap project.

Setup

1. cd secure-snap-backend
2. npm install
3. Create a `.env` file (see `.env.example`)
4. npm run dev

Available routes (placeholders)
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login
- `GET /api/auth/me` — get current user (requires Bearer token)
- `POST /api/images` — upload image (multipart/form-data, field `file`)
- `GET /api/images` — list images
- `GET /api/detections` — list detections

This scaffold includes models, simple controllers, and middleware. Customize business logic, storage (S3), and face-detection integrations as needed.
# secure-snap-backend

Backend scaffold for Secure Snap application.

## Structure

- `src/config` - config for DB and AWS
- `src/models` - Mongoose models
- `src/controllers` - request handlers
- `src/routes` - express routes
- `src/middleware` - JWT auth, upload, error handler
- `src/services` - face recognition, S3 helpers, web monitor
- `src/utils` - small helpers
- `uploads/` - temporary files

## Quick start

1. Copy `.env` and fill values
2. Run `npm install`
3. Run `npm run dev`
