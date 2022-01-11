import type { Schema } from "json-schema-faker";

export const todoItem: Schema = {
  type: "object",
  required: ["id", "text"],
  properties: {
    id: {
      type: "number",
      minimum: 1,
      maximum: 5000,
    },
    text: {
      type: "string",
      faker: "lorem.words",
    },
  },
};

export const todoList: Schema = {
  type: "array",
  minItems: 2,
  maxItems: 10,
  items: todoItem,
};
