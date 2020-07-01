import React, { useState, useEffect } from 'react';
import Promise from 'bluebird';
import './App.css';
import { Container, Comments } from './App.style';
import Search from './Search';

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
  const [searchText, setSearchText] = useState<string>('');

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
        .then((allPosts: IPost[]) => {
          const posts = allPosts.filter(post => post && post.text);
          console.log('posts', posts);

          setPosts(posts);
          sessionStorage.setItem('posts', JSON.stringify(posts));
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  const search = (searchText: string) => {
    console.log('search', searchText);
    setSearchText(searchText);
  };

  const filteredPosts = (posts || [])
    .filter((post: IPost) => post)
    .filter((post: IPost) => {
      if (!post.text) {
        return false;
      }
      const part = searchText;
      return post.text.indexOf(part) !== -1;
      // return <post className="text indexOf"></post>
    });

  return (
    <Container>
      <Search search={search} />
      {' '}
      Showing: {filteredPosts.length}/{posts.length}
      <Comments>
        {filteredPosts.map((post: IPost) => (
          <div className='comment pad' key={post.id}>
            <span
              className='commtext c00'
              dangerouslySetInnerHTML={{ __html: post.text }}
            />
          </div>
        ))}
      </Comments>
    </Container>
  );
}

export default App;
