// utils/testData.ts
export const testUsers = {
  existingUser: {
    email: 'testuser@example.com',
    password: 'Test123456',
  },
  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },
};

export const testProducts = {
  product1: 'Blue Top',
  product2: 'Men Tshirt',
  searchTerm: 'Dress',
};

export const testCardDetails = {
  nameOnCard: 'John Doe',
  cardNumber: '4532015112830366',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2027',
};
