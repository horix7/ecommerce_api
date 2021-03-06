import { userFactory } from '@factories/user';

export const up = async queryInterface => {
  const password =
    '$2a$10$QRUIZwSPLLkS4BVJQZ75wu6LROYIqe5eKMsWYV2C21bCnUNS51NAK'; // secret
  const admin = userFactory({
    email: 'admin@comp.com',
    password,
    firstName: 'super',
    lastName: 'admin',
    phone: '019232144',
    location: 'everywhere',
    isAdmin: true
  });

  const user = userFactory({
    email: 'user@example.com',
    password,
    firstName: 'John',
    lastName: 'Doe',
    phone: '019232144',
    location: 'everywhere'
  });

  await queryInterface.bulkInsert('Users', [admin, user], {});
};

export const down = queryInterface =>
  queryInterface.bulkDelete('Users', null, {});
