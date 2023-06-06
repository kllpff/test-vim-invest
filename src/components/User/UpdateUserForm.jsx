import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { putUser } from '../../store/users/users'

export const UpdateUserForm = ({user = null}) => {
	const dispatch = useDispatch()
	
  const [formData, setFormData] = useState(user)

  const handleCreate = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(putUser(formData))
  }

  const formatDate = (originalDate) => {
    const date = new Date(originalDate)
    const inputValue = date.toISOString().slice(0, 10)
    return inputValue
  }

	return (
    <form className='form form--update' onSubmit={handleSubmit}>
      <label>
        <p>First name</p>
			  <input
			 		required
          type='text'
					name='firstName'
          className='input'
          value={formData.firstName}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
        <p>Last name</p>
				<input
					required
          type='text'
					name='lastName'
          className='input'
          value={formData.lastName}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
        <p>Birthday</p>
				<input
					required
          type='date'
					name='birthday'
          className='input'
          value={formatDate(formData.birthday)}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
      <p>Height</p>
				<input
					required
          type='number'
					name='height'
          className='input'
          value={formData.height}
          onChange={(event) => handleCreate(event)}
        />
      </label>
			<button className='btn' type='submit'>Update</button>
		</form>
	)
}