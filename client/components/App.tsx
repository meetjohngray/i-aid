import { useState } from 'react'
import { getAnswer } from '../apiClient'
import { Chat } from '../../models/chats'
import '../styles/main.scss'
// export interface Chat { 
//   role: string,
//   content: string
// }

const App = () => {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<Chat[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault()
    if(!message) return
    setIsTyping(true)
    const msgs = chats
    msgs.push({role: "user", content: message})
    setChats(msgs)
    setMessage('')
    getAnswer(chats)
      .then((res) => {
        const newMessage: Chat = res.body.output
        msgs.push(newMessage)
        setChats(msgs)
        setIsTyping(false)
      })
      .catch(e => {
        console.log(e)
      })
    }

  return (
    <div className={isTyping ? "" : "hide"}>
      <h1>Ask Me Anything</h1>
        <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
        <form onSubmit={(e) => handleSubmit(e, message)} aria-label='Ask a question'>
          {/* <label htmlFor='message'>Your Message</label> */}
          <input
            type='text' 
            id='question' 
            name='message'
            value={message}
            placeholder='Type your message here...'
            onChange={e => setMessage(e.target.value)}
          />
        </form>
      </div>
    // <>
    //   
    //   {isError && (
    //     <p style={{ color: 'red' }}>
    //       There was an error retrieving the greeting.
    //     </p>
    //   )}
  )
}

export default App
