import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}
let users: User[] = [{
  id: "1",
  name: "Keyner",
}];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Succesful query",
    users,
  };
};
export const getUser = (
  { params, response }: { response: Response; params: { id: string } },
) => {
  const result = users.find((user) => user.id === params.id);
  if (!result) {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  } else {
    response.status = 200;
    response.body = {
      message: "Succesful",
      result,
    };
  }
};
export const createUser = async (
  { request, response }: { response: Response; request: Request },
) => {
  const body: Body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Body is required",
    };
  } else {
    const newUser: User = body.value;
    newUser.id = v4.generate();
    users.push(newUser);
    response.status = 200;
    response.body = {
      message: "New user created",
      newUser,
    };
  }
};
export const updateUser = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: { id: string };
  },
) => {
  const userFound = users.find((user) => user.id === params.id);

  if (!userFound) {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  } else {
    const body = await request.body();
    const updateUser = body.value;

    users = users.map((user) =>
      user.id == params.id ? { ...user, ...updateUser } : user
    );
    response.status = 200;
    response.body = {
        users
    }
  }
};
export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "Succesful",
    users,
  };
};
