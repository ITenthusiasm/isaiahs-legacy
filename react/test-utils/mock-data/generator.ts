import jsf from "json-schema-faker";
import faker from "faker";
import * as Schemas from "./schemas";
import { RootState } from "../../src/store/types";

// Extend faker library to use its randomness utilities
jsf.extend("faker", () => faker);

/**
 * Randomly generates a value or object based on the specified schema
 * @param schema Name of the schema to generate
 * @returns
 */
function generate<K extends keyof typeof Schemas>(schema: K): MappedSchemaTypes[K] {
  return jsf.generate(Schemas[schema]) as MappedSchemaTypes[K];
}

interface MappedSchemaTypes extends Record<string, unknown> {
  user: Exclude<RootState["user"], null>;
  users: Exclude<RootState["user"], null>[];
  todoItem: RootState["todos"][number];
  todoList: RootState["todos"];
}

export default generate;
