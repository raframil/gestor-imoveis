const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const Property = require("../../src/models/property");

const mockProperty = {
  id: "anyid123",
  type: "Casa",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  sellerName: "Rafael",
  price: 100000,
  image:
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
  date: "2021-07-31T00:00:00.000Z",
};

describe("POST /properties", () => {
  beforeAll(async () => {
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should return 201 when property is successfully created", async () => {
    const response = await request(app).post("/properties").send(mockProperty);
    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(mockProperty.id);
    expect(response.body.sellerName).toEqual(mockProperty.sellerName);
  });

  it("should return 409 when property is already created", async () => {
    const response = await request(app).post("/properties").send(mockProperty);
    expect(response.status).toBe(409);
    expect(response.body.id).toEqual(mockProperty.id);
    expect(response.body.sellerName).toEqual(mockProperty.sellerName);
  });

  it("should return 400 when any field is invalid", async () => {
    const invalidProperty = mockProperty;
    invalidProperty.price = "invalid_price";
    const response = await request(app)
      .post("/properties")
      .send(invalidProperty);
    expect(response.status).toBe(400);
  });

  it("should return 200 when property is successfully updated", async () => {
    const response = await request(app)
      .put(`/properties/${mockProperty.id}`)
      .send({ description: "any_description", price: 999999 });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(mockProperty.id);
    expect(response.body.type).toEqual(mockProperty.type);
    expect(response.body.description).toEqual("any_description");
    expect(response.body.price).toEqual(999999);
  });

  it("should return 200 when a property is successfully deleted", async () => {
    const response = await request(app).delete(
      `/properties/${mockProperty.id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toEqual(true);
  });

  afterAll(async () => {
    await Property.deleteOne({ id: mockProperty.id });
    await mongoose.connection.close();
  });
});
