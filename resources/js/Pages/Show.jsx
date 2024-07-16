import { useForm, Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react';
import { useRoute} from 'route';


export default function Show({ post }) {
    route = useRoute();

    const {patch, delete: destroy, errors, processing} = useForm();

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    
    function submit(e) {
        e.preventDefault();
        destroy(route('posts.destroy', post))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlashMsg(null);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, [flash.message]);

    return (
        <>
            <div className="p-4 border-b">
                { flashMsg && (
                    <div className='p-3 border-2 border-green-600 rounded-md bg-green-200 text-green-600'>
                        {flashMsg}
                    </div>
                )}
                
                <div className="text-sm text-slate-600">
                    <span> Posted on: </span>
                    <span> { new Date(post.created_at).toLocaleTimeString() } </span>
                </div>
                
                <div className="flex justify-evenly">
                    <div className="basis-3/4">
                        <p className="font-medium">
                            { post.body }
                        </p>
                    </div>
                    
                    <div className="flex basis-1/4 justify-evenly">
                        <Link href={route('posts.edit', post)}>
                            <button className="bg-blue-500 rounded-md text-sm px-4 py-1 text-white self-start">
                                Edit 
                            </button>
                        </Link>
                        <form onSubmit={submit}>
                            <button 
                                className="bg-red-500 rounded-md text-sm px-4 py-1 text-white self-start"
                                disabled={processing}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>

                <Link href={route('home')} className="text-link">Go Back</Link>
            </div>
        </>
    )
}