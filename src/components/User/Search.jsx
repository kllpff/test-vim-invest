import { useDispatch } from 'react-redux'
import { filterUsers } from '../../store/users/users'

export const Search = () => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
    dispatch(filterUsers(event.target.value))
  }

	return (
		<input type="text" className='input input--filter' placeholder='Search by first name...' onChange={handleChange} />
	)
}