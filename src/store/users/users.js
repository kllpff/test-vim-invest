import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = `https://reactapi.bsite.net/api/Employee`

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async() => {
    const { data } = await axios.get(
      BASE_URL,
    )
    return data
  },
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(removeUser(id))
      const response = await axios.delete(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    } 
  }
)

export const putUser = createAsyncThunk(
  "user/putUser",
  async (user, {dispatch, rejectWithValue }) => {
    try {
      dispatch(updateUser(user))
      const response = await axios.put(`${BASE_URL}`, user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    } 
  }
)

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user, { getState, dispatch, rejectWithValue }) => {
    const {users} = getState()

    let maxId = 0
    for (let i = 0; i < users.items.length; i++) {
      if (users.items[i].employeeId > maxId) {
        maxId = users.items[i].employeeId
      }
    }
    const userData = {...user, employeeId: maxId + 1}

    try {
      dispatch(addUser(userData))
      const response = await axios.post(`${BASE_URL}`, userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    } 
  }
)


const initialState = {
 items: [],
 filteredUsers: [],
 status: 'loading'
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, {payload: user}) => {
			state.items.push(user)
      state.filteredUsers = state.items
		},
		removeUser: (state, {payload: id}) => {
      state.items = state.items.filter((user) => user.employeeId !== id)
      state.filteredUsers = state.items
    },
    updateUser: (state, action) => {
      const { employeeId, ...updatedUser } = action.payload
      const index = state.items.findIndex(user => user.employeeId === employeeId)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedUser }
      }
    },
    filterUsers: (state, action) => {
      const filterValue = action.payload.toLowerCase()
      state.filteredUsers = state.items.filter(user => user.firstName.toLowerCase().includes(filterValue))
    },
	},
  
	extraReducers: {
    [fetchUsers.pending]: state => {
      state.status = 'loading'
      state.items = []
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchUsers.rejected]: state => {
      state.status = 'error'
      state.items = []
    },

    [deleteUser.rejected]: state => {
      state.status = 'error'
    },

    [putUser.rejected]: state => {
      state.status = 'error'
    },

    [createUser.rejected]: state => {
      state.status = 'error'
    },
  },
})

export const { addUser, removeUser, updateUser, filterUsers } = usersSlice.actions
export default usersSlice.reducer