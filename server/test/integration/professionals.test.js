const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const Professional = require("../../src/models/professional");

const mockProfessional = {
  name: "any_name",
  creci: "any_creci",
  type: "Contratado",
  salary: 3000,
  commissionPercentage: 1.0,
  admissionDate: "2021-07-31T00:00:00.000Z",
};

describe("GET/POST/PUT/DELETE /professionals", () => {
  beforeAll(async () => {
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should return 201 when a professional is successfully created", async () => {
    const response = await request(app)
      .post("/professionals")
      .send(mockProfessional);
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(mockProfessional.name);
    expect(response.body.creci).toEqual(mockProfessional.creci);
  });

  it("should return 200 with a professional list", async () => {
    const response = await request(app).get("/professionals");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  });

  it("should return 200 when a professional is successfully deleted", async () => {
    const professional = await Professional.findOne({
      creci: mockProfessional.creci,
    });

    const response = await request(app).delete(
      `/professionals/${professional._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toEqual(true);
  });

  afterAll(async () => {
    await Professional.deleteOne({ creci: mockProfessional.creci });
    await mongoose.connection.close();
  });
});
