import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(4);

        expect(response.body.error).not.toHaveLength(2);
        expect(response.status).not.toBe(404);
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Producto -- Test',
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(1);

        expect(response.body.error).not.toHaveLength(2);
        expect(response.status).not.toBe(404);
    });

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Producto -- Test',
            price: 'hola'
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(2);

        expect(response.body.error).not.toHaveLength(4);
        expect(response.status).not.toBe(404);
    });

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse -- Testing",
            price: 100
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('GET /api/products', () => {

    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(400);
    });

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
    });

});

describe('GET /api/products/:id', () => {

    it('should return a 404 response for a non-existent peroduct', async () => {
        const productId = 150;
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe("Product not found");
    });

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-id');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(1);
        expect(response.body.error[0].msg).toBe("ID not valid");
    });

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });

});

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: 'Monitor Curvo',
            availability: true,
            price: 12
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toHaveLength(1);
        expect(response.body.error[0].msg).toBe('ID not valid');
    });

    it('should display validation error message when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Monitor Curvo',
            availability: true,
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toHaveLength(1);
        expect(response.body.error[0].msg).toBe('Price not valid');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should a return a 404 response for a non-existent product', async () => {
        const productId = 150;
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Monitor Curvo',
            availability: true,
            price: 10
        });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product not found");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should update an existing product with valid data', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Monitor Curvo',
            availability: true,
            price: 10
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('error');
    });

});

describe('PATCH /api/products', () => {

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 150;
        const response = await request(server).patch(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product not found");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(false);

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
    })
});

describe('DELETE /api/products/:id', () => {

    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-id');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0].msg).toBe('ID not valid');
    });

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 150;
        const response = await request(server).delete(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product not found");  

        expect(response.status).not.toBe(200);
    });

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Eliminate Product');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });

});