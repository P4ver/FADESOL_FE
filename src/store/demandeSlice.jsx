import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchDemandeData = createAsyncThunk(
  'demande/fetchDemandeData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/demande`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch demande data');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postDemandeData = createAsyncThunk(
  'demande/postDemandeData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/demande`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to post demande data');
      }
      // Reset error state
      thunkAPI.dispatch(demandeSlice.actions.clearError());
      // Fetch demande data again
      await thunkAPI.dispatch(fetchDemandeData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateDemandeData = createAsyncThunk(
  'demande/updateDemandeData',
  async ({ id_Demande, updatedDemandeData }, thunkAPI) => {
    try {
      console.log("updatedDemandeData", updatedDemandeData);
      const response = await axios.put(`${API_BASE_URL}/demande/${id_Demande}`, updatedDemandeData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to update demande data');
      }
      await thunkAPI.dispatch(fetchDemandeData());
      return { id_Demande, updatedDemandeData: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDemandeData = createAsyncThunk(
  'demande/deleteDemandeData',
  async (id_Demande, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/demande/${id_Demande}`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete demande data');
      }
      // Fetch demande data again after deletion
      await thunkAPI.dispatch(fetchDemandeData());
      return id_Demande; // Return the ID of the deleted demande
    } catch (error) {
      throw error;
    }
  }
);

const demandeSlice = createSlice({
  name: 'demande',
  initialState: {
    demandeData: [],
    loading: false,
    error: null, // state.error
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemandeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDemandeData.fulfilled, (state, action) => {
        state.loading = false;
        state.demandeData = action.payload;
      })
      .addCase(fetchDemandeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reducer for posting demande data
      .addCase(postDemandeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postDemandeData.fulfilled, (state, action) => {
        state.loading = false;
        state.demandeData = [...state.demandeData, action.payload];
      })
      .addCase(postDemandeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reducer for deleting demande data
      .addCase(deleteDemandeData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDemandeData.fulfilled, (state, action) => {
        state.loading = false;
        state.demandeData = state.demandeData.filter(demande => demande.id_Demande !== action.payload);
      })
      .addCase(deleteDemandeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reducer for updating demande data
      .addCase(updateDemandeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDemandeData.fulfilled, (state, action) => {
        state.loading = false;
        const { id_Demande, updatedDemandeData } = action.payload;
        state.demandeData = state.demandeData.map(demande =>
          demande.id_Demande === id_Demande ? updatedDemandeData : demande
        );
      })
      .addCase(updateDemandeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default demandeSlice.reducer;
export const { clearError } = demandeSlice.actions;



// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "axios";


// export const fetchDemandeData = createAsyncThunk(
//     'demande/fetchDemandeData',
//     async (_, thunkAPI) => {
//       try {
//         const response = await axios.get('https://fadesol-puoc.vercel.app/demande', {
//           withCredentials: true,
//         });
        
//         if (response.status !== 200) {
//           throw new Error('Failed to fetch demande data');
//         }
//         // console.log('FPD:res:', response.data);
        
//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     }
//   );


//   export const postDemandeData = createAsyncThunk(
//     'demande/postDemandeData',
//     async (postData, thunkAPI) => {
//       try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/demande', postData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to post demande data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(demandeSlice.actions.clearError());
//         // Fetch demande data again
//         await thunkAPI.dispatch(fetchDemandeData());
//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     }
//   );


//   export const updateDemandeData = createAsyncThunk(
//     'demande/updateDemandeData',
//     async ({ id_Demande, updatedDemandeData }, thunkAPI) => {
//       try {
//         console.log("updatedDemandeData",updatedDemandeData)
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/demande/${id_Demande}`, updatedDemandeData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update demande data');
//         }
//         await thunkAPI.dispatch(fetchDemandeData());
//         return { id_Demande: id_Demande, updatedDemandeData: response.data };
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );

// export const deleteDemandeData = createAsyncThunk(
//   'demande/deleteDemandeData',
//   async (id_Demande, thunkAPI) => {
//     try {
//       const response = await axios.delete(`https://fadesol-puoc.vercel.app/demande/${id_Demande}`,{
//           withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to delete demande data');
//       }
//       // Fetch demande data again after deletion
//       await thunkAPI.dispatch(fetchDemandeData());
//       return id_Demande; // Return the ID of the deleted demande
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const demandeSlice = createSlice({
//     name: 'demande',
//     initialState: {
//       demandeData: [],
//       loading: false,
//       error: null,//state.error
//     },
//     reducers: {
//       clearError: (state) => {
//         state.error = null;
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchDemandeData.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchDemandeData.fulfilled, (state, action) => {
//           state.loading = false;
//           state.demandeData = action.payload;
//           // console.log(action.payload)
//         })
//         .addCase(fetchDemandeData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//           // console.log(action)
//         })
//         // Reducer for posting demande data
//         .addCase(postDemandeData.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(postDemandeData.fulfilled, (state, action) => {
//           state.loading = false;
//           // state.demandeData = action.payload;
//           state.demandeData = [...state.demandeData, action.payload];
//         })
//         .addCase(postDemandeData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message
//         })
 
//         // reducer for deleting demande data
//         .addCase(deleteDemandeData.pending, (state, action) => {
//           state.loading = true;
//           state.error = null
//         })
//         .addCase(deleteDemandeData.fulfilled, (state, action) => {
//           state.loading = false;
//           state.demandeData = state.demandeData.filter(demande => demande.id_Demande !== action.payload);
//         })
//         .addCase(deleteDemandeData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message
//         })

//         //reducer for update demande
//         .addCase(updateDemandeData.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(updateDemandeData.fulfilled, (state, action) => {
//           state.loading = false;
//           const { id_Demande, updatedDemandeData } = action.payload;
//           state.demandeData = state.demandeData.map(demande =>
//             demande.id_Demande === id_Demande ? updatedDemandeData : demande
//           );
//         })
//         .addCase(updateDemandeData.rejected, (state, action) => {
//           state.loading = false;
//           console.log(action)
//           state.error = action.error.message;
//         })
//     },
//   });
  
// export default demandeSlice.reducer;