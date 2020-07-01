import React, { useState, useEffect } from 'react';
import Promise from 'bluebird';
import './App.css';
import { Container } from './App.style';

interface IPost {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: string;
}

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const jsonUrl = 'https://hacker-news.firebaseio.com/v0/item/23702122.json';

  useEffect(() => {
    const storedPosts = sessionStorage.getItem('posts');
    console.log('storedPosts', storedPosts);

    if (storedPosts !== null) {
      setPosts(JSON.parse(storedPosts));
    } else {
      fetch(jsonUrl)
        .then((response) => response.json())
        .then((json) => {
          console.log('json', json);

          return Promise.map(json.kids, (kid: string) => {
            const jsonUrl = `https://hacker-news.firebaseio.com/v0/item/${kid}.json`;
            return fetch(jsonUrl).then((response) => response.json());
          });
        })
        .then((posts: IPost[]) => {
          console.log('posts', posts);
          setPosts(posts);
          sessionStorage.setItem('posts', JSON.stringify(posts));
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  return (
    <Container>
      <div style={{ background: '#f6f6ef', margin: '1px 100px' }}>
        {posts
          .filter((post: IPost) => post)
          .map((post: IPost) => (
            <div className='comment pad' key={post.id}>
              <span
                className='commtext c00'
                dangerouslySetInnerHTML={{ __html: post.text }}
              />
            </div>
          ))}
      </div>
    </Container>
  );
}

export default App;
