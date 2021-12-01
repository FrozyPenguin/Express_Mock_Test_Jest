import { NextFunction, Request, Response } from 'express';
import postArray from '../data/posts';
import { Post } from '../models/Post';

export function getPosts(req: Request, res: Response, _next?: NextFunction) {
  res.status(200).json(postArray);
}

export function getPost(req: Request, res: Response, _next?: NextFunction) {
  const id: number = Number(req.params.id);
  const [findPost]: Post[] = postArray.filter((post) => post.id === id);
  if (!findPost)
    res.status(404).json({ status: 404, error: 'Post not found !' });
  res.status(200).json(findPost);
}

export function addPost(req: Request, res: Response, _next?: NextFunction) {
  const newPost: Post = req.body;
  postArray.push(newPost);
  res.status(200).json(newPost);
}
