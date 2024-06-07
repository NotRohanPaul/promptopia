"use client"

import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
            setLoading(false);
        }

        if (session?.user.id) fetchPosts();
    }, [session?.user.id, posts])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        try {
            await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE',
            })
            setPosts(data);
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            isLoading={loading}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />

    )
}

export default MyProfile