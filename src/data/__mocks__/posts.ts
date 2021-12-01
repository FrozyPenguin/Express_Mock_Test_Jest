import { Post } from '../../models/Post';
import * as faker from 'faker';

const postArray: Post[] = [];

for(let i = 0; i < 10; i++) {
  const post: Post = {
    id: faker.datatype.number(100),
    title: faker.name.title(),
    description: faker.lorem.paragraph(3),
    date: faker.date.future()
  };

  postArray.push(post);
}

export default postArray;
