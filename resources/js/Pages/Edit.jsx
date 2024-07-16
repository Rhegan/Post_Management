import { Link, useForm } from '@inertiajs/react'

export default function Edit({ post }) {
    const {data, setData, put, errors, processing} = useForm({
        body: post.body,
    })

    function submit(e) {
        e.preventDefault();
        put(route('posts.update', post))
    }

    return (
        <>
            <h1 className="title"> Update Post </h1>

            <div className="w-1/2 mx-auto">
                {Object.values(errors).map((error, index) => (
                    error && (
                        <div 
                            key={index}
                            className='p-3 border-2 border-red-600 rounded-md bg-red-200 text-red-600'>
                            {error}
                        </div>
                    )
                ))}


                <form onSubmit={submit}>
                    <div className="my-3">
                        <textarea
                            rows="10"
                            value={data.body}
                            onChange={ (e) => setData('body', e.target.value)}
                            className={errors.body && `ring-red-500`}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Link href={route('posts.show', post.id)} className="text-link">
                            <button className="bg-blue-500 hover:bg-blue-600 rounded-md text-sm mx-1 px-4 py-1 text-white">
                                Go Back 
                            </button>
                        </Link>

                        <button
                            className="bg-green-500 hover:bg-green-600 rounded-md text-sm mx-1 px-4 py-1 text-white w-1/4"
                            disabled={processing}> Update Post </button>
                    </div>
                </form>
            </div>
        </>
    )
}