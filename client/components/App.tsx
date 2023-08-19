import { useState } from 'react'
import { getAnswer } from '../apiClient'
import { Chat } from '../../models/chats'
import ReactMarkdown from 'react-markdown'
import '../styles/main.scss'

const App = () => {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<Chat[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault()

    if (!message) return
    setIsTyping(true)
    scrollTo(0, 1e10)

    const msgs = chats
    msgs.push({ role: "user", content: message })
    setChats(msgs)
    setMessage('')

    getAnswer(chats)
      .then((res) => {
        const newMessage: Chat = res.body.output
        msgs.push(newMessage)
        setChats(msgs)
        setIsTyping(false)
        scrollTo(0, 1e10)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <main>
      <h1>I Aid</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
            <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
              <ReactMarkdown>{chat.content}</ReactMarkdown>
            </p>
          ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => handleSubmit(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

    </main>
  )
}

export default App
