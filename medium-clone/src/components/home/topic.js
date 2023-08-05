import React from 'react'

function Topic() {


    const topics = [
        'Health',
        'Technology',
        'Self Improvement',
        'Fitness',
        'Yoga',
        'Gym',
        'Food'
    ]


    return (
        <div>
            <div className='m-5 p-5'>
                <div class="p-5 m-5  flex rounded bg-yellow-100">
                    <input class="h-10 w-60  rounded"type='text' placeholder='apply filter'></input>
                    <select name="category" id="category">
                        <option value="author">Author</option>
                        <option value="topic">Topic</option>
                        <option value="date">Date</option>
                        <option value="text">Text</option>
                    </select>
                </div>

                <div>
                    <h1 className='text-black font-bold text-3xl mb-3 '>Discover more about specific topics</h1>
                </div>
                <div className='flex flex-wrap w-2/3'>
                    {
                        topics.map(topic => {
                            return (
                                <span className='m-4 p-4 text-black text-xl bg-gray-300 rounded-lg shadow-lg shadow-gray-400 cursor-pointer hover:ease-in duration-300 hover:scale-95'>{topic}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Topic