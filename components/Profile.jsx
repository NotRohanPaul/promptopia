"use client"

import PromptCard from './PromptCard'
import DialogBox from './DialogBox';
import { useState } from 'react';
import Link from 'next/link';
import Loader from './Loader';

const Profile = ({ name, desc, data, handleEdit, handleDelete, isLoading }) => {
  const [confirmDelete, setConfirmDelete] = useState('')




  return (<section className='w-full max-w-xl flex-center flex-col gap-2' >
    < h1 className='head_text text-left' >
      <span className='blue_gradient'>
        {name} Profile
      </span>
    </h1 >
    <p className='desc text-left'>{desc}</p>
    {
      isLoading ?
        (
          <Loader />
        )
        :
        (
          data.length !== 0
            ?
            (
              <div className="mt-10 prompt_layout">
                {data.map(post => {
                  return (<PromptCard key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => setConfirmDelete(post)}
                  />
                  )
                })}
                {
                  confirmDelete &&
                  <DialogBox
                    task="Delete"
                    setConfirmDelete={setConfirmDelete}
                    handleDelete={() => handleDelete && handleDelete(confirmDelete)}
                  />
                }
              </div>
            )
            :
            (
              <div className='mt-5 sm:flex-row flex-col flex gap-2 desc'>
                <h2>You don't any prompt. Kindly create one.</h2>
                <Link href="/create-prompt" className="black_btn">
                  Create Prompt
                </Link>
              </div>

            )
        )
    }

  </section >)
}

export default Profile