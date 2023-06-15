import React, { useState, useCallback } from 'react'
import { useConversations } from '../context/conversationsProvider'
import { useGlobalContext } from '../context/globalContext'


const Index = () => {

  const { selectedEmail } = useGlobalContext()

  const [text, setText] = useState('')
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(selectedConversation.recipients, text, selectedEmail)
    setText('')
  }

  return (
    <div className='flex flex-col border-t-2 border-b-2  h-full'>
      <div className='p-2'>{selectedConversation.recipients}</div>
      <div className='grow overflow-auto h-80'>
        <div className='flex flex-col items-start justify-end px-3'>
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 flex flex-col ${
                  message.fromMe ? 'self-end items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-3xl px-4 py-2 ${
                    message.fromMe ? 'bg-primary text-white' : 'border'
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? 'text-right' : ''
                  }`}
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='m-2'>
          <div className='flex justify-between'>
            <input
              as='textarea'
              className='input input-bordered w-full mr-1 rounded-3xl'
              required
              placeholder='Enter Message...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              //   style={{ height: '75px', resize: 'none' }}
            />
            <div>
              <button className='btn ml-1 rounded-3xl' type='submit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-send'
                  viewBox='0 0 16 16'
                >
                  <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Index
