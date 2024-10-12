import { User } from "./common.types";

export const mockUsers: User[] = [
  {
    email: "admin@example.com",
    passwordHash:
      "$2b$10$ZXpsAf66mn/NGJpfUOwA4ebPyXVIyFm9n.2lOE9ikaJanENyToOG6", // p4.sSword123
    id: 947830938,
    admin: true,
    name: "John the admin",
  },
  {
    email: "customer@example.com",
    passwordHash:
      "$2b$10$ZXpsAf66mn/NGJpfUOwA4ebPyXVIyFm9n.2lOE9ikaJanENyToOG6", // p4.sSword123
    id: 947353938,
    admin: false,
    name: "John the customer",
  },
];
