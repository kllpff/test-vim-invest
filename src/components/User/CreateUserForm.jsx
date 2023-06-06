import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/users/users'

export const CreateUserForm = () => {
	const dispatch = useDispatch()
	
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
		height: 0,
  })

  const handleCreate = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createUser(formData))
  }

	return (
    <form className='form' onSubmit={handleSubmit}>
      <label>
        <p>First name</p>
			  <input
			 		required
          type="text"
					name="firstName"
          className='input'
          value={formData.firstName}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
        <p>Last name</p>
				<input
					required
          type="text"
					name="lastName"
          className='input'
          value={formData.lastName}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
        <p>Birthday</p>
				<input
					required
          type="date"
					name="birthday"
          className='input'
          value={formData.birthday}
          onChange={(event) => handleCreate(event)}
        />
      </label>

      <label>
      <p>Height</p>
				<input
					required
          type="number"
					name="height"
          className='input'
          value={formData.height}
          onChange={(event) => handleCreate(event)}
        />
      </label>
			<button className='btn' type="submit">Create</button>
		</form>
	)
}