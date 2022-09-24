import { users } from "./db/users";
import { v4 as uuidv4 } from "uuid";

//create user
export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data.firstname || !data.lastname) {
      reject(new Error("Not all information provided"));
    }

    const id = uuidv4();
    const newUser = { id, ...data };

    users.push(newUser);
    const responseData = {
      data: {
        status: "",
        statusCode: 200,
        users: [...users],
      },
    };
    responseData.data.status = "success";

    setTimeout(() => resolve(responseData), 250);
  });

// get user list
export const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(() => reject(new Error("Users not found")), 250);
    }
    setTimeout(() => resolve(Object.values(users)), 250);
  });

// get user by Id from list
export const getUserByID = (id) =>
  new Promise((resolve, reject) => {
    const user = users.filter((user) => user?.userId === id);
    if (!user) {
      return setTimeout(() => reject(new Error("User not found")), 250);
    }

    setTimeout(() => resolve(user[0]), 250);
  });

//update user by Id
export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    const userFound = users.map((el) => el.userId === id);
    if (!userFound) {
      return setTimeout(() => reject(new Error("User not found")), 250);
    }
    const newArr = users.map((obj) => {
      if (obj.userId === id) {
        return { ...obj, ...data };
      }

      return obj;
    });
    const responseData = {
      data: {
        status: "",
        statusCode: 200,
        users: [],
      },
    };
    responseData.data.status = "success";
    responseData.data.users = [...newArr];

    return setTimeout(() => resolve(responseData), 250);
  });

//delete user by Id
export const deleteUser = (id, data) => {
  const deletedUser = data.filter((user) => user.userId != id);
  return deletedUser;
};
