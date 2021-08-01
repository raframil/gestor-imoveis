const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const Property = require("../../src/models/property");

const mockProperty = {
  id: "12345",
  type: "Casa",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  sellerName: "Rafael",
  price: 100000,
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
    mockProperty.price = "invalid_price";
    const response = await request(app).post("/properties").send(mockProperty);
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await Property.deleteOne({ id: mockProperty.id });
    await mongoose.connection.close();
  });
});
