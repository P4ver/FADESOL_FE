import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchVenteData = createAsyncThunk(
  'vente/fetchVenteData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vente`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch vente data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postVenteData = createAsyncThunk(
  'vente/postVenteData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vente`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to post vente data');
      }
      // Reset error state
      thunkAPI.dispatch(venteSlice.actions.clearError());
      // Fetch vente data again
      await thunkAPI.dispatch(fetchVenteData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteVenteData = createAsyncThunk(
  'vente/deleteVenteData',
  async (id_Vente, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/vente/${id_Vente}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete vente data');
      }
      // Fetch vente data again
      await thunkAPI.dispatch(fetchVenteData());
      return id_Vente;
    } catch (error) {
      throw error;
    }
  }
);

export const updateVenteData = createAsyncThunk(
  'vente/updateVenteData',
  async ({ id_Vente, updatedVenteData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vente/${id_Vente}`, updatedVenteData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to update vente data');
      }
      // Fetch vente data again after updating
      await thunkAPI.dispatch(fetchVenteData());
      return { id_Vente, updatedVenteData };
    } catch (error) {
      throw error;
    }
  }
);
const venteSlice = createSlice({
    name: 'vente',
    initialState: {
        venteData: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        deleteVenteItem: (state, action) => {
            state.venteData = state.venteData.filter(item => item.id_Vente !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVenteData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVenteData.fulfilled, (state, action) => {
                state.loading = false;
                state.venteData = action.payload;
            })
            .addCase(fetchVenteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postVenteData.pending, (state) => {
                state.loading = true;
            })
            .addCase(postVenteData.fulfilled, (state, action) => {
                state.loading = false;
                state.venteData = [...state.venteData, action.payload];
            })
            .addCase(postVenteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteVenteData.fulfilled, (state, action) => {
                state.loading = false;
                // call deleteVenteItem reducer to update state
                venteSlice.caseReducers.deleteVenteItem(state, action);
            })
            .addCase(deleteVenteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //====================================
            .addCase(updateVenteData.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
            //   .addCase(updateVenteData.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const { id_Vente, updateVenteData } = action.payload;
            //     state.userData = state.achatData.map(user =>
            //       user.id_Vente === id_Vente ? updateVenteData : user
            //     );
            //   })
            .addCase(updateVenteData.fulfilled, (state, action) => {
                state.loading = false;
                const { id_Vente, updatedVenteData } = action.payload;
                state.achatData = state.achatData.map(achat =>
                  achat.id_Vente === id_Vente ? { ...achat, ...updatedVenteData } : achat
                );
              })
              
              .addCase(updateVenteData.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
                state.error = action.error.message;
              })
    },
});

export default venteSlice.reducer;
export const { clearError , deleteVenteItem } = venteSlice.actions;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchVenteData = createAsyncThunk('vente/fetchVenteData', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get('https://fadesol-puoc.vercel.app/vente');
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch achat data');
//         }
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const postVenteData = createAsyncThunk('vente/postVenteData', async (postData, thunkAPI) => {
//     try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/vente', postData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status !== 200) {
//             throw new Error('Failed to post achat data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(venteSlice.actions.clearError());
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchVenteData());
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteVenteData = createAsyncThunk('vente/deleteVenteData', async (id_Vente, thunkAPI) => {
//     try {
//         const response = await axios.delete(`https://fadesol-puoc.vercel.app/vente/${id_Vente}`);
//         if (response.status !== 200) {
//             throw new Error('Failed to delete achat data');
//         }
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchVenteData());
//         return id_Vente;
//     } catch (error) {
//         throw error;
//     }
// });


// export const updateVenteData = createAsyncThunk(
//     'vente/updateVenteData',
//     async ({ id_Vente, updatedVenteData }, thunkAPI) => {
//       try {
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/vente/${id_Vente}`, updatedVenteData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update achat data');
//         }
//         // Fetch achat data again after updating
//         await thunkAPI.dispatch(fetchVenteData());
//         return { id_Vente, updatedVenteData };
//       } catch (error) {
//         throw error;
//       }
//     }
//   );
// const venteSlice = createSlice({
//     name: 'vente',
//     initialState: {
//         venteData: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         },
//         deleteVenteItem: (state, action) => {
//             state.venteData = state.venteData.filter(item => item.id_Vente !== action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchVenteData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchVenteData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.venteData = action.payload;
//             })
//             .addCase(fetchVenteData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(postVenteData.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(postVenteData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.venteData = [...state.venteData, action.payload];
//             })
//             .addCase(postVenteData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(deleteVenteData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // call deleteVenteItem reducer to update state
//                 venteSlice.caseReducers.deleteVenteItem(state, action);
//             })
//             .addCase(deleteVenteData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             //====================================
//             .addCase(updateVenteData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//               })
//             //   .addCase(updateVenteData.fulfilled, (state, action) => {
//             //     state.loading = false;
//             //     const { id_Vente, updateVenteData } = action.payload;
//             //     state.userData = state.achatData.map(user =>
//             //       user.id_Vente === id_Vente ? updateVenteData : user
//             //     );
//             //   })
//             .addCase(updateVenteData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const { id_Vente, updatedVenteData } = action.payload;
//                 state.achatData = state.achatData.map(achat =>
//                   achat.id_Vente === id_Vente ? { ...achat, ...updatedVenteData } : achat
//                 );
//               })
              
//               .addCase(updateVenteData.rejected, (state, action) => {
//                 state.loading = false;
//                 console.log(action)
//                 state.error = action.error.message;
//               })
//     },
// });

// export default venteSlice.reducer;
// export const { clearError , deleteVenteItem } = venteSlice.actions;

