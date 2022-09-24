import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { deleteUser } from "../backend/utils";

const mockedUsers = [
  {
    userId: 1,
    username: "Leanne Graham",
    email: "Sincere@april.biz",
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
  },
  {
    userId: 2,
    username: "Leanne Graham",
    email: "Sincere@april.biz",
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
  },
];
describe("Testing delete Functionality", () => {
  test("should delete user with id", () => {
    const result = deleteUser(1, mockedUsers);
    expect(result.length).toBe(1);
  });
});
