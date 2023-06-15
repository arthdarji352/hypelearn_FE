import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext'

import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  const { allCourses, isCourseLoading } = useGlobalContext()

  const handleCardOpen = async (data) => {
    console.log('data', data)
    navigate(`/dashboard/${data._id}`)
    // await selectedCourse(data)
    
  }

  useEffect(() => {})
  return (
    <>
      <div className='bg-white w-10/12 z-1'>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Customers also purchased
          </h2>

          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 relative z-0'>
            {!isCourseLoading ? allCourses.map((data) => (
              <div
                onClick={() => handleCardOpen(data)}
                data-value={data}
                key={data.id}
                className='group relative border-2 rounded-lg shadow-lg'
              >
                <div className='w-full min-h-40 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none'>
                  <img
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                  />
                </div>
                <div className='mt-4 flex justify-between px-4 py-2'>
                  <div>
                    <h3 className='text-base text-gray-900 font-semibold'>
                      <a href={data.href}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {data.courseName}
                      </a>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>{data.author}</p>
                    <p className='text-lg font-medium text-gray-900'>
                      {data.price}
                    </p>
                  </div>
                </div>
              </div>
            )) : <div> Loading </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
