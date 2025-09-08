// API Tests for the Modern TODO Application
// This file contains basic tests to verify API functionality

const http = require("http");
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Configure chai
chai.use(chaiHttp);
chai.should();

// Server configuration
const SERVER_URL = process.env.TEST_SERVER_URL || "http://localhost:3000";
const API_BASE = "/api/todos";

describe("TODO API Tests", function () {
  // Increase timeout for API calls
  this.timeout(10000);

  let createdTodoId;
  let testTodoData = {
    title: "Test Todo Item",
    description: "This is a test todo item for API testing",
    status: "pending",
    priority: "medium",
  };

  let updatedTodoData = {
    title: "Updated Test Todo Item",
    description: "This is an updated test todo item",
    status: "in_progress",
    priority: "high",
  };

  describe("GET /", function () {
    it("should return welcome message", function (done) {
      chai
        .request(SERVER_URL)
        .get("/")
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have.property("version");
          res.body.should.have.property("endpoints");
          done();
        });
    });
  });

  describe("GET /api/todos", function () {
    it("should get all todos", function (done) {
      chai
        .request(SERVER_URL)
        .get(API_BASE)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("data").that.is.an("array");
          res.body.should.have.property("count");
          done();
        });
    });
  });

  describe("POST /api/todos", function () {
    it("should create a new todo", function (done) {
      chai
        .request(SERVER_URL)
        .post(API_BASE)
        .send(testTodoData)
        .end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("data").that.is.an("object");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("title").eql(testTodoData.title);
          res.body.data.should.have
            .property("description")
            .eql(testTodoData.description);
          res.body.data.should.have.property("status").eql(testTodoData.status);
          res.body.data.should.have
            .property("priority")
            .eql(testTodoData.priority);

          // Store the created todo ID for later tests
          createdTodoId = res.body.data.id;
          done();
        });
    });

    it("should fail to create todo without title", function (done) {
      let invalidData = { ...testTodoData };
      delete invalidData.title;

      chai
        .request(SERVER_URL)
        .post(API_BASE)
        .send(invalidData)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("GET /api/todos/:id", function () {
    it("should get a specific todo by ID", function (done) {
      chai
        .request(SERVER_URL)
        .get(`${API_BASE}/${createdTodoId}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("data").that.is.an("object");
          res.body.data.should.have.property("id").eql(createdTodoId);
          res.body.data.should.have.property("title").eql(testTodoData.title);
          done();
        });
    });

    it("should return 404 for non-existent todo", function (done) {
      chai
        .request(SERVER_URL)
        .get(`${API_BASE}/999999`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("PUT /api/todos/:id", function () {
    it("should update an existing todo", function (done) {
      chai
        .request(SERVER_URL)
        .put(`${API_BASE}/${createdTodoId}`)
        .send(updatedTodoData)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("data").that.is.an("object");
          res.body.data.should.have.property("id").eql(createdTodoId);
          res.body.data.should.have
            .property("title")
            .eql(updatedTodoData.title);
          res.body.data.should.have
            .property("description")
            .eql(updatedTodoData.description);
          res.body.data.should.have
            .property("status")
            .eql(updatedTodoData.status);
          res.body.data.should.have
            .property("priority")
            .eql(updatedTodoData.priority);
          done();
        });
    });
  });

  describe("PATCH /api/todos/:id/status", function () {
    it("should update todo status", function (done) {
      chai
        .request(SERVER_URL)
        .patch(`${API_BASE}/${createdTodoId}/status`)
        .send({ status: "completed" })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("data").that.is.an("object");
          res.body.data.should.have.property("id").eql(createdTodoId);
          res.body.data.should.have.property("status").eql("completed");
          done();
        });
    });
  });

  describe("DELETE /api/todos/:id", function () {
    it("should delete a todo", function (done) {
      chai
        .request(SERVER_URL)
        .delete(`${API_BASE}/${createdTodoId}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message");
          done();
        });
    });

    it("should return 404 when trying to delete non-existent todo", function (done) {
      chai
        .request(SERVER_URL)
        .delete(`${API_BASE}/${createdTodoId}`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
  });
});

console.log("API tests completed. To run these tests, you need to:");
console.log("1. Install dependencies: npm install chai chai-http mocha");
console.log("2. Start the server: npm start");
console.log("3. Run tests: npm test");
