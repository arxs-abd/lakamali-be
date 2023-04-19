const request = require('supertest')
const app = require('../index')
let slug = ''

describe('GET /api/register', () => {
    test('should be get add new user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({

            })
            
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    })
    test('should be get blog by slug', async () => {
        const res = await request(app)
        .get(`/api/blog/${slug}`)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toBeInstanceOf(Object)
    })
})

describe('GET /api/blog', () => {
    test('should be get all Blog', async () => {
        const res = await request(app)
            .get('/api/blog')
            
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data).toBeInstanceOf(Array)
        
        slug = res.body.data[0].slug
    })
    test('should be get blog by slug', async () => {
        const res = await request(app)
        .get(`/api/blog/${slug}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toBeInstanceOf(Object)
    })
})