import { useState } from 'react'
import { getAnswer } from '../apiClient'

export interface promptData { question: string}

const App = () => {

  const initialState: promptData = { question: ''}
  const [formData, setFormData] = useState(initialState)
  const { question } = formData
  const [answer, setAnswer] = useState('')
  const [isError, setIsError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget
    setFormData((previous) => ({ ...previous, [name]: value }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getAnswer(formData)
      .then((data) => {
        setAnswer(data)
        setFormData(initialState)
      })
      .catch((err) => {
        setIsError(true)
        console.log(err)
      })
    }

  const formatAnswer = (answer: string) => {
    // Add your formatting logic here
    // For example, you can capitalize the first letter of the answer
    answer = answer.replace(/`([^`]+)`/g, '<code>$1</code>');
    answer = answer.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    return answer.charAt(0).toUpperCase() + answer.slice(1)
  }

  return (
    <>
     
      <h1>Ask Me Anything</h1>
      {isError && (
        <p style={{ color: 'red' }}>
          There was an error retrieving the greeting.
        </p>
      )}
      <form onSubmit={handleSubmit} aria-label='Ask a question'>
        <label htmlFor='question'>Question</label>
        <textarea 
          id='question' 
          name='question'
          value={question} 
          onChange={handleChange}
        />
        <button type='submit' >Submit</button>
      </form>
        {
          answer && <p>{formatAnswer(answer)}</p>
        }
    </>
  )
}

export default App
