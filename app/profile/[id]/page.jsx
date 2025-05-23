"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
            setLoading(false);

        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={`${userName}'s`}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
            isLoading={loading}
        />
    );
};

export default UserProfile;