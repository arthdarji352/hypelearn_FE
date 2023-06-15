import React from 'react'
import { useConversations } from '../context/conversationsProvider'
import ChatBox from './chatbox'

const Index = ({ id }) => {
  const { conversations, selectConversationIndex, selectedConversation } =
    useConversations()

  return (
    <div className='w-2/12 grow divide-y fixed right-0 border-l-2'>
      <div className='flex flex-col justify-between h-[87vh]'>
        <div className='py-2 divide-y flex-1'>
          {conversations.map((conversation, index) => (
            <div key={conversation.recipients}>
              <li
                key={index + conversation.recipients}
                onClick={() => {
                  selectConversationIndex(index)
                }}
                className={`py-2 cursor-pointer px-2 list-none ${
                  conversation.selected ? 'bg-primary text-white' : ' '
                }`}
              >
                {conversation.recipients}
              </li>
            </div>
          ))}
        </div>

        <div>{selectedConversation && <ChatBox />}</div>
      </div>
    </div>
  )
}

export default Index
