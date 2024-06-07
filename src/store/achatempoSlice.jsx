
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchAchatempoData = createAsyncThunk('achatempo/fetchAchatempoData', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/achatempo`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch achat data');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const postAchatempoData = createAsyncThunk('achatempo/postAchatempoData', async (postData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/achatempo`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error('Failed to post achat data');
        }
        // Reset error state
        thunkAPI.dispatch(achatempoSlice.actions.clearError());
        // Fetch achat data again
        await thunkAPI.dispatch(fetchAchatempoData());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteAchatempoData = createAsyncThunk('achatempo/deleteAchatempoData', async (id_Achat, thunkAPI) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/achatempo/${id_Achat}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete achat data');
        }
        // Fetch achat data again
        await thunkAPI.dispatch(fetchAchatempoData());
        return id_Achat;
    } catch (error) {
        throw error;
    }
});

export const updateAchatempoData = createAsyncThunk('achatempo/updateAchatempoData', async ({ id_Achat, updatedAchatempoData }, thunkAPI) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/achatempo/${id_Achat}`, updatedAchatempoData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response.status !== 200) {
            throw new Error('Failed to update achat data');
        }
        // Fetch achat data again after updating
        await thunkAPI.dispatch(fetchAchatempoData());
        return { id_Achat, updatedAchatempoData };
    } catch (error) {
        throw error;
    }
});

const achatempoSlice = createSlice({
    name: 'achatempo',
    initialState: {
        achatempoData: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        deleteAchatempoItem: (state, action) => {
            state.achatempoData = state.achatempoData.filter(item => item.id_Achat !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchatempoData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAchatempoData.fulfilled, (state, action) => {
                state.loading = false;
                state.achatempoData = action.payload;
            })
            .addCase(fetchAchatempoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postAchatempoData.pending, (state) => {
                state.loading = true;
            })
            .addCase(postAchatempoData.fulfilled, (state, action) => {
                state.loading = false;
                state.achatempoData = [...state.achatempoData, action.payload];
            })
            .addCase(postAchatempoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAchatempoData.fulfilled, (state, action) => {
                state.loading = false;
                // call deleteAchatempoItem reducer to update state
                achatempoSlice.caseReducers.deleteAchatempoItem(state, action);
            })
            .addCase(deleteAchatempoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateAchatempoData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAchatempoData.fulfilled, (state, action) => {
                state.loading = false;
                const { id_Achat, updatedAchatempoData } = action.payload;
                state.achatempoData = state.achatempoData.map(achat =>
                    achat.id_Achat === id_Achat ? { ...achat, ...updatedAchatempoData } : achat
                );
            })
            .addCase(updateAchatempoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default achatempoSlice.reducer;
export const { clearError, deleteAchatempoItem } = achatempoSlice.actions;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchAchatempoData = createAsyncThunk('achatempo/fetchAchatempoData', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get('https://fadesol-puoc.vercel.app/achatempo');
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch achat data');
//         }
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const postAchatempoData = createAsyncThunk('achatempo/postAchatempoData', async (postData, thunkAPI) => {
//     try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/achatempo', postData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status !== 200) {
//             throw new Error('Failed to post achat data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(achatempoSlice.actions.clearError());
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchAchatempoData());
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteAchatempoData = createAsyncThunk('achatempo/deleteAchatempoData', async (id_Achat, thunkAPI) => {
//     try {
//         const response = await axios.delete(`https://fadesol-puoc.vercel.app/achatempo/${id_Achat}`);
//         if (response.status !== 200) {
//             throw new Error('Failed to delete achat data');
//         }
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchAchatempoData());
//         return id_Achat;
//     } catch (error) {
//         throw error;
//     }
// });


// export const updateAchatempoData = createAsyncThunk(
//     'achatempo/updateAchatempoData',
//     async ({ id_Achat, updatedAchatempoData }, thunkAPI) => {
//       try {
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/achatempo/${id_Achat}`, updatedAchatempoData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update achat data');
//         }
//         // Fetch achat data again after updating
//         await thunkAPI.dispatch(fetchAchatempoData());
//         return { id_Achat, updatedAchatempoData };
//       } catch (error) {
//         throw error;
//       }
//     }
//   );
// const achatempoSlice = createSlice({
//     name: 'achatempo',
//     initialState: {
//         achatempoData: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         },
//         deleteAchatempoItem: (state, action) => {
//             state.achatempoData = state.achatempoData.filter(item => item.id_Achat !== action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAchatempoData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAchatempoData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.achatempoData = action.payload;
//             })
//             .addCase(fetchAchatempoData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(postAchatempoData.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(postAchatempoData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.achatempoData = [...state.achatempoData, action.payload];
//             })
//             .addCase(postAchatempoData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(deleteAchatempoData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // call deleteAchatempoItem reducer to update state
//                 achatempoSlice.caseReducers.deleteAchatempoItem(state, action);
//             })
//             .addCase(deleteAchatempoData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             //====================================
//             .addCase(updateAchatempoData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//               })
//             //   .addCase(updateAchatempoData.fulfilled, (state, action) => {
//             //     state.loading = false;
//             //     const { id_Achat, updateAchatempoData } = action.payload;
//             //     state.userData = state.achatempoData.map(user =>
//             //       user.id_Achat === id_Achat ? updateAchatempoData : user
//             //     );
//             //   })
//             .addCase(updateAchatempoData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const { id_Achat, updatedAchatempoData } = action.payload;
//                 state.achatempoData = state.achatempoData.map(achat =>
//                   achat.id_Achat === id_Achat ? { ...achat, ...updatedAchatempoData } : achat
//                 );
//               })
              
//               .addCase(updateAchatempoData.rejected, (state, action) => {
//                 state.loading = false;
//                 console.log(action)
//                 state.error = action.error.message;
//               })
//     },
// });

// export default achatempoSlice.reducer;
// export const { clearError , deleteAchatempoItem } = achatempoSlice.actions;
