"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const [copied, setCopied] = useState("")
    const pathName = usePathname();
    const router = useRouter();

    const handleProfileClick = () => {

        if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    };

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000)
    }

    return (
        <div className='prompt_card'>
            <div className="flex justify-between items-start gap-5">
                <div className="flex flex-1 gap-3 items-start cursor-pointer"
                    onClick={handleProfileClick}>
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />
                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900 break-all'>
                            {post.creator.username}
                        </h3 >
                        <p className='font-inter text-sm text-gray-500 break-all'>
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        width={12}
                        height={12}
                        alt='copy icon'
                    />
                </div>
            </div>
            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === '/profile' &&

                (
                    <div className='mt-5 flex-center gap-10 border-t border-gray-300 pt-3'>
                        <p className='font-inter text-sm cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-200 hover:text-green-500 transition-all duration-300 ease-in-out'
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p className='font-inter text-sm cursor-pointer bg-orange-500 text-white px-2 py-2 rounded-md hover:bg-gray-200 hover:text-orange-500 transition-all duration-300 ease-in-out'
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )
            }
        </div >
    )
}

export default PromptCard