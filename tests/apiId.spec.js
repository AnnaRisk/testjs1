const request = require('supertest');

const BASE_URL = 'https://hr-challenge.dev.tapyou.com/api/test';

describe('User Information API Tests', () => {

  test('should return user information for a valid user ID', async () => {
    const userId = 10; 
    const response = await request(BASE_URL).get(`/user/${userId}`);

    console.log('Response body for valid user ID:', response.body);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('result');

    expect(response.body.success).toBe(true);
    expect(response.body.errorCode).toBe(0);
    expect(response.body.errorMessage).toBeNull();

    const user = response.body.result;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('gender');
    expect(user).toHaveProperty('age');
    expect(user).toHaveProperty('city');
    expect(user).toHaveProperty('registrationDate');

    expect(user.id).toBe(userId);
    expect(typeof user.name).toBe('Anna');
    expect([ male, female, magic, McCloud ]).toContain(user.gender);
    expect(typeof user.age).toBe('25');
    expect(typeof user.city).toBe('Novosibirsk');
    expect(new Date(user.registrationDate).toString()).not.toBe('Invalid Date');
  });

  test('should return error for invalid user ID format', async () => {
    const invalidUserId = '333555668888';
    const response = await request(BASE_URL).get(`/user/${invalidUserId}`);

    console.log('Response body for invalid user ID format:', response.body);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('user');

    expect(response.body.success).toBe(false);
    expect(response.body.errorCode).toBe(400);
    expect(response.body.errorMessage).toBe('NumberFormatException: For input string: "333555668888"');
    expect(response.body.user).toBeNull();
  });

     test('should return 404 error for request with missing user ID', async () => {
      const response = await request(BASE_URL).get('/user/');
  
      console.log('Response body for missing user ID:', response.body);
  
      expect(response.status).toBe(404);
  
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('path');
  
      expect(response.body.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toBe('No message available');
      expect(response.body.path).toBe('/api/test/user/');
    });


  test('should return error for invalid user ID format', async () => {
    const invalidUserId = 'sdfsdf'; 
    const response = await request(BASE_URL).get(`/user/${invalidUserId}`);

    console.log('Response body for invalid user ID format:', response.body);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('user');

    expect(response.body.success).toBe(false);
    expect(response.body.errorCode).toBe(400);
    expect(response.body.errorMessage).toBe('NumberFormatException: For input string: "sdfsdf"');
    expect(response.body.user).toBeNull();
  });


  test('should return error for too large user ID', async () => {
    const largeUserId = '111111111111111111111111111111111111111111111111111111111';
    const response = await request(BASE_URL).get(`/user/${largeUserId}`);

    console.log('Response body for too large user ID:', response.body);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('user');

    expect(response.body.success).toBe(false);
    expect(response.body.errorCode).toBe(400);
    expect(response.body.errorMessage).toBe('NumberFormatException: For input string: "111111111111111111111111111111111111111111111111111111111"');
    expect(response.body.user).toBeNull();
  });



});
