import * as faker from "faker";

export const mocks = {
  Post: () => ({
    id: faker.random.number(),
    guid: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    content: faker.lorem.paragraphs()
  })
};
