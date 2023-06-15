import React, { useContext, useState, useCallback, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

import { useGlobalContext } from '../context/globalContext'

import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

  const { selectedEmail } = useGlobalContext()

  const { socket } = useSocket()

  function createConversation(recipients) {
    // setConversations({ recipients, messages: [] })

    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false

        
        const reciver = recipients
        const newMessage = { sender, text }
        const newConversations = prevConversations.map((conversation) => {
          if (conversation.recipients[0] === reciver[0]) {
            
            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }
          return conversation
        })
        if (madeChange) {
          console.log(true)
          return newConversations
        } else {
          console.log(false)
          return [
            ...prevConversations,
            { recipients: reciver, messages: [newMessage] },
          ]
        }
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text, email) {
    socket.emit('send-message', { recipients, text, email })
    addMessageToConversation({ recipients, text, sender: email })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipient = conversation.recipients


    
    // (conversation) => {
    //   const contact = contacts.find((contact) => {
    //     return contact.email === conversation.recipients
    //   })
    //   const name = (contact && contact.name) || contact.email
    //   return { email: contact.email, name }
    // }

    const messages = conversation.messages.map((message) => {
      const contact = message.sender
      const name = (contact && contact.name) || message.sender
      const fromMe = selectedEmail === message.sender
      return { ...message, senderName: name, fromMe }
    })
    const selected = index === selectedConversationIndex

    console.log('conversion', { ...conversation, messages, recipients: recipient, selected })
    return { ...conversation, messages, recipients: recipient, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
