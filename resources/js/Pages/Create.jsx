import { useForm } from '@inertiajs/react'

export default function Create() {
    const {data, setData, post, errors, processing} = useForm({
        body: "",
    })

    function submit(e) {
        e.preventDefault();
        post(route('posts.store'))
        
    }

    return (
        <>
            <h1 className="title"> Create a new Post </h1>

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
                        <button
                            className="primary-btn w-1/4"
                            disabled={processing}> Post </button>
                    </div>
                </form>
            </div>
        </>
    )
}