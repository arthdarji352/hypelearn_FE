import React from 'react'

import { useGlobalContext } from '../context/globalContext'

const Index = () => {
  const { handlePopup, authenticated } = useGlobalContext()


  return (
    <>
      <div className='navbar mb-2 drop-shadow-lg bg-base-200 text-base-content sticky top-0 z-10'>
        <div className='flex-1 hidden px-2 mx-2 lg:flex'>
          <span className='text-lg font-bold'>HypeLearn</span>
        </div>
        <div className='flex-1 lg:flex-none'>
          <div className='form-control '>
            <input
              type='text'
              placeholder='Search'
              className='input input-ghost bg-base-100'
            />
          </div>
        </div>
        <div className='flex-none'>
          <button className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </button>
        </div>

        {authenticated ? (
          <div>
            <div className='flex-none'>
              <button className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='flex-none dropdown dropdown-hover dropdown-end'>
              <div className='avatar' tabIndex='0'>
                <div className='rounded-full w-10 h-10 m-1'>
                  <img
                    src='https://i.pravatar.cc/500?img=32'
                    alt='placeholder'
                  />
                </div>
              </div>
              <ul
                tabIndex='0'
                className='p-2  shadow menu dropdown-content bg-base-100 rounded-box w-52 text-base-content'
              >
                <li>
                  <a href='#void'>Your Profile</a>
                </li>
                <li>
                  <a href='#void'>Settings</a>
                </li>
                <li>
                  <a href='#void'>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button
              className='btn btn-primary mr-2'
              onClick={() => handlePopup('signIn')}
            >
              Log In
            </button>

            <button
              className='btn btn-primary'
              onClick={() => handlePopup('signUp')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Index

