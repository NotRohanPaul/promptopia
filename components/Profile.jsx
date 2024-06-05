"use client"

import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard'
import LoginMessage from './LoginMessage';
import DialogBox from './DialogBox';
import { useState } from 'react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [confirmDelete, setConfirmDelete] = useState('')

  return (
    session ?
      <section className='w-full' >
        < h1 className='head_text text-left' >
          <span className='blue_gradient'>
            {name} Profile
          </span>
        </h1 >
        <p className='desc text-left'>{desc}</p>

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
      </section > :
      <LoginMessage />
  )
}

export default Profile