import * as faker from "faker";

export const mocks = {
  DateTime: () => faker.date.past()
};
