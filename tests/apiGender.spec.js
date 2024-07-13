const request = require('supertest');

const BASE_URL = 'https://hr-challenge.dev.tapyou.com/api/test';

describe('API Tests', () => {
  test('should return user IDs for female gender', async () => {
    const response = await request(BASE_URL).get('/users?gender=female');
    
    
    console.log('Response body:', response.body);


    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('result');

  
    expect(response.body.success).toBe(true); 
    expect(response.body.errorCode).toBe(0); 
    expect(response.body.errorMessage).toBeNull(); 

 
    expect(Array.isArray(response.body.result)).toBe(true); 
    expect(response.body.result.length).toBeGreaterThan(0); 

    const expectedIds = [1, 2, 3, 4]; 
    const actualIds = response.body.result;

 
    if (expectedIds.length !== actualIds.length) {
      console.error('ID list length mismatch. Expected:', expectedIds.length, 'but got:', actualIds.length);
    }
    
    expectedIds.forEach(expectedId => {
      if (!actualIds.includes(expectedId)) {
        console.error('Expected ID not found in the list:', expectedId);
      }
    });

    expect(actualIds).toEqual(expect.arrayContaining(expectedIds)); 
  });
  test('should return user IDs for male gender', async () => {
    const response = await request(BASE_URL).get('/users?gender=male');
    
    
    console.log('Response body:', response.body);

   
    expect(response.status).toBe(200);

  
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('errorCode');
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('result');

 
    expect(response.body.success).toBe(true); 
    expect(response.body.errorCode).toBe(0); 
    expect(response.body.errorMessage).toBeNull(); 

    
    expect(Array.isArray(response.body.result)).toBe(true); 
    expect(response.body.result.length).toBeGreaterThan(0); 

   
    const expectedIds = [1, 2, 3, 4]; 
    const actualIds = response.body.result;

   
    if (expectedIds.length !== actualIds.length) {
      console.error('ID list length mismatch. Expected:', expectedIds.length, 'but got:', actualIds.length);
    }
    
    expectedIds.forEach(expectedId => {
      if (!actualIds.includes(expectedId)) {
        console.error('Expected ID not found in the list:', expectedId);
      }
    });

    expect(actualIds).toEqual(expect.arrayContaining(expectedIds)); 
  });

  test('should return 500 for unknown gender value', async () => {
    const response = await request(BASE_URL).get('/users?gender=unknown');
    
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
    expect(response.body.message).toBe('No enum constant com.coolrocket.app.api.test.qa.Gender.unknown');
  });

  test('should return 400 for missing gender parameter', async () => {
    const response = await request(BASE_URL).get('/users');
    
    expect(response.status).toBe(400); 
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe("Required String parameter 'gender' is not present");
  });

  test('should return 500 for invalid gender value', async () => {
    const response = await request(BASE_URL).get('/users?gender=1');
    
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
    expect(response.body.message).toBe('No enum constant com.coolrocket.app.api.test.qa.Gender.1');
  });

});
