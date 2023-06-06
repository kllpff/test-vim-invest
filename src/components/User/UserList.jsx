import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/users/users'
import { Loader } from '../UI/Loades'
import { CreateUserForm } from './CreateUserForm'
import { Search } from './Search'
import UserItem from './UserItem'


export const UserList = () => {
	const dispatch = useDispatch()
	const parent = useRef(null)
	const parent1 = useRef(null)
	const [showForm, setShowForm] = useState(false)

	const {items, filteredUsers, status} = useSelector((state) => state.users)

	const getUsers = async () => {
		dispatch(fetchUsers())
	}

	useEffect(() => {
		getUsers()
		parent.current && autoAnimate(parent.current)
		parent1.current && autoAnimate(parent1.current)
	}, [parent, parent1])

	return (
		<div ref={parent}>
			{
				status === 'loading' ? <Loader />
			: 
			<>
				<button onClick={() => setShowForm(!showForm)} className='btn btn--form'>{showForm ? 'Close' : 'New user'}</button>
				{showForm && <CreateUserForm />}
				<Search />
				<ul ref={parent1} className='list'>
					{filteredUsers.length ? filteredUsers.map((user) =>
						<UserItem user={user} key={user.employeeId} />
					) : items.map((user) =>
						<UserItem user={user} key={user.employeeId} />
					)}
				</ul>
			</>
			}
		</div>
	)
}