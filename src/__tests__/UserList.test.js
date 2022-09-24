import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { MemoryRouter } from "react-router-dom";
import UserList from "../components/user-list";

describe("should render user list successfully", () => {
  it("renders learn react link", () => {
    const result = render(
      <MemoryRouter initialentries="{['/']}">
        <UserList />
      </MemoryRouter>
    );
    expect(screen.getByTestId("userList")).toBeInTheDocument();
  });
});
