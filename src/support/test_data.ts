import { faker } from '@faker-js/faker';

export const generateUserData = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  company: faker.company.name(),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  mobileNumber: faker.phone.number(),
});

