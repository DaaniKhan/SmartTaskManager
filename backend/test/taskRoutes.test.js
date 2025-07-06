import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../models/userModel.js";

process.env.NODE_ENV = "test";

let testUserId;
let createdTaskId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("[DEBUG] Connected to MongoDB");

  const user = new User({
    email: "testuser@example.com",
    password: "hashedpassword123"
  });

  const savedUser = await user.save();
  testUserId = savedUser._id;
  process.env.TEST_USER_ID = testUserId.toString();

  console.log("[DEBUG] Created test user with ID:", testUserId);
});

afterAll(async () => {
  await User.deleteOne({ _id: testUserId });
  console.log("[DEBUG] Deleted test user");

  await mongoose.connection.close();
  console.log("[DEBUG] Closed MongoDB connection");
});

describe("Task API Routes", () => {
  it("GET /api/tasks - should return tasks", async () => {
    const res = await request(app).get("/api/tasks").set("test-user", testUserId.toString());
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/tasks - should create a task", async () => {
    const taskPayload = {
      task: "Test task",
      category: "Work",
      deadline: "2025-12-31T23:59",
      completed: false,
      user_id: testUserId.toString()
    };

    const res = await request(app)
      .post("/api/tasks")
      .set("test-user", testUserId.toString())
      .send(taskPayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.task).toBe("Test task");
    createdTaskId = res.body._id;
  });

  it("GET /api/tasks/:id - should return the created task", async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`).set("test-user", testUserId.toString());
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdTaskId);
  });

  it("PATCH /api/tasks/:id - should update the task", async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}`)
      .set("test-user", testUserId.toString())
      .send({ task: "Updated task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.task).toBe("Updated task");
  });

  it("DELETE /api/tasks/:id - should delete the task", async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`).set("test-user", testUserId.toString());
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdTaskId);
  });
});
