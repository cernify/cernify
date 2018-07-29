import * as faker from "faker";

export const mocks = {
  Tag: () => ({
    guid: faker.random.uuid(),
    id: faker.random.number(),
    logo: faker.image.imageUrl(),
    name: faker.lorem.word(),
    numPosts: faker.random.number(),
    slug: faker.helpers.slugify()
  })
};
