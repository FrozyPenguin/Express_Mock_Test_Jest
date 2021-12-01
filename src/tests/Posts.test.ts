import { Request, Response, NextFunction } from 'express';
import { getPosts, getPost, addPost } from '../controllers/PostsCtrl';
import * as faker from 'faker';
import postArray from '../data/posts';
jest.mock('../data/posts');

describe('test post routes', () => {
    const result = {
        json: '',
        status: 0
    };

    const req: Partial<Request> = {};

    const res: Partial<Response> = {
        status: jest.fn().mockImplementation((status: number) => {
            result.status = result.status || status;
            return res;
        }),
        json: jest.fn().mockImplementation((json: any) => {
            result.json = result.json || json;
        })
    }

    beforeEach(() => {
        result.json = '';
        result.status = 0;
    })
    
    test('should return all posts', () => {
        getPosts(req as Request, res as Response);
        expect(result.status).toBe(200);
        expect(result.json).toEqual(postArray);
    });

    test('should return the post with the random given id', () => {
        const randomPost = postArray[Math.floor(Math.random() * postArray.length)];

        req.params = {
            id: randomPost.id.toString()
        };

        getPost(req as Request, res as Response);
        expect(result.status).toBe(200);
        expect(result.json).toEqual(randomPost);
    });

    test('should return 404 not found', () => {
        req.params = {
            id: String(1000)
        };

        getPost(req as Request, res as Response);
        expect(result.status).toBe(404);
    });

    test('should add a new post', () => {
        req.body = {
            id: faker.datatype.number(100),
            title: faker.name.title(),
            description: faker.lorem.paragraph(3),
            date: faker.date.future()
        };

        const previousArrayLength = postArray.length;

        addPost(req as Request, res as Response);
        expect(result.status).toBe(200);
        expect(result.json).toEqual(req.body);
        expect(postArray.length).toBe(previousArrayLength + 1);
    });
})