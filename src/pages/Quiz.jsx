export default function Quiz() {
    return (
        <>
            <div className='flex flex-col justify-center items-center text-white text-center bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800  h-screen '>
                <div className='w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                    <div className='mb-25'>
                        <h2 className='text-2xl font-semibold mb-6'>Domanda 1 di 10</h2>
                        <p className='text-lg text-gray-100 mb-8'>Domanda</p>
                    </div>
                    <div className='flex flex-col gap-4 max-w-md'>
                        <button className='w-full p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer'>Opzione 1</button>
                        <button className='w-full p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer'>Opzione 2</button>
                        <button className='w-full p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer'>Opzione 3</button>
                        <button className='w-full p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer'>Opzione 4</button>
                    </div>
                </div>
            </div>
        </>
    );
}