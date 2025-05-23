"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import Loader from './Loader'
import { useSession } from 'next-auth/react'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => {
        return <PromptCard key={post._id}
          post={post}
          handleTagClick={handleTagClick} />
      })}
    </div>
  )
}

const Feed = () => {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt/');
      const data = await response.json();

      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, [session])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.creator.email) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  return (
    <section className='feed'>
      <form
        className='relative w-full flex-center'
        onSubmit={e => { e.preventDefault(); }}
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {loading ? (<Loader />) : (
        searchText.length !== 0 ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick} />
        )
      )
      }
    </section>
  )
}

export default Feed