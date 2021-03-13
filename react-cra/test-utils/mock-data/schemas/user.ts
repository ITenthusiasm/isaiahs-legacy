import jsf from "json-schema-faker";

export const user: jsf.Schema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "number",
      minimum: 1,
      maximum: 5000,
    },
    name: {
      type: "string",
      faker: "internet.userName",
    },
  },
};

export const users: jsf.Schema = {
  type: "array",
  minItems: 5,
  maxItems: 10,
  uniqueItems: true,
  items: user,
};
