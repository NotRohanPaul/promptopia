import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag
            <span className='font-normal'> (#product, #webdevelopment, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#Tag'
            required
            className='form_input'
            tabIndex={0}
          />
        </label>

        <div className="flex justify-end  mx-3 mb-5 gap-4">
          <Link href={type == "Edit" ? "/profile" : "/"} className='text-black hover:bg-gray-500 hover:text-white transition-all duration-300 ease-in-out px-5 py-1.5 rounded-full' >
            Cancle
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 hover:bg-gray-200 hover:text-primary-orange bg-primary-orange rounded-full transition-all duration-300 ease-in-out text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>

    </section>
  )
}

export default Form