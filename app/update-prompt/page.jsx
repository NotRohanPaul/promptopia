"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import SigninMessage from '@components/SigninMessage'

const EditPrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const promptId = useSearchParams().get("id")

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (session?.user.id) getPromptDetails();
    }, [session?.user.id]);


    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/profile')
            }

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <Suspense>
            <div className=''>
                {session ?
                    (<Form
                        type="Edit"
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={editPrompt}
                    />
                    ) :
                    <SigninMessage />
                }
            </div>
        </Suspense>
    )
}

export default EditPrompt