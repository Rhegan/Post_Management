import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect} from "react";
import { useRoute } from 'route';

export default function Home({ posts }) {
    const route = useRoute();
    const { flash } = usePage().props;
    const { component } = usePage();

    const [flashMsg, setFlashMsg] = useState(flash.message);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlashMsg(null);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, [flash.message]);

    
    return (
        <>
            <Head title={component} />

            <h1 className="title"> Home Page </h1>

            { flashMsg && (
                <div className='p-3 border-2 border-green-600 rounded-md bg-green-200 text-green-600'>
                    {flashMsg}
                </div>
            )}
                    

            <div>
                {posts.data.map(post => (
                    <div key={post.id} className="p-4 border-b">
                        <div className="text-sm text-slate-600">
                            <span> Posted on: </span>
                            <span> { new Date(post.created_at).toLocaleTimeString() } </span>
                        </div>
                        <p className="font-medium">
                            { post.body }
                        </p>
                        <Link href={route('posts.show', post.id)} className="text-link">Read more...</Link>
                    </div>
                ))}
            </div>
                
            <div className="py-12 px-4">
                {posts.links.map(link => (
                    link.url ?
                    <Link
                        // preserveScroll
                        key={link.label}
                        href={link.url}
                        dangerouslySetInnerHTML={ { __html: link.label } }
                        className={`p-1 mx-1 ${ link.active ? "text-blue-500 font-bold" : "" }`} />
                    :
                    <span
                        key={link.label}
                        href={link.url}
                        dangerouslySetInnerHTML={ { __html: link.label } }
                        className={`p-1 mx-1 text-slate-300`} />
                ))}
            </div>
        </>
    );
}
