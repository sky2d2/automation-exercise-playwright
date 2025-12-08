// utils/dataGenerator.ts
import { faker } from '@faker-js/faker';

export const generateUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: 'Test@123456',
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number({ style: 'national' }),
  };
};

export const generateReview = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  review: faker.lorem.paragraph(),
});
