import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, putUser } from '../../store/users/users'
import { UpdateUserForm } from './UpdateUserForm'

const UserItem = ({user}) => {
	const dispatch = useDispatch()

	const [showUpdate, setShowUpdate] = useState(false)

	const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

	const handleUpdate = (user) => {
		dispatch(putUser(user))
	}

	return (
		<>
		<div className='item'>
			<h2 className='name'>{user.firstName} {user.lastName}</h2>
			<p className='birthday'>Birthday: {user.birthday}</p>
			<p className='height'>height: {user.height}</p>
			<div className='btn-warp'>
				<button className='btn' onClick={() => handleDelete(user.employeeId)}>Delete</button>
				<button className='btn' onClick={() => setShowUpdate(!showUpdate)}>{showUpdate ? 'Close' : 'Update'}</button>
			</div>
		</div>
		{showUpdate && <UpdateUserForm user={user} />}
		</>
	)
}

export default UserItem