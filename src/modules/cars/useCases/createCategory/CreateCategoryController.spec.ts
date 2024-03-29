import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(`delete from users`);

    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, isadmin, created_at)
           values('${id}','admin','admin@rentx.com.br','${password}','admin_license', true, 'now()')
          `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close;
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await connection.query(`delete from categories`);

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category New",
        description: "Category New",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category if already exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await connection.query(`delete from categories`);

    await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
