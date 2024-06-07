import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchAchatData = createAsyncThunk('achat/fetchAchatData', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/achat`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch achat data');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const postAchatData = createAsyncThunk('achat/postAchatData', async (postData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/achat`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error('Failed to post achat data');
        }
        // Reset error state
        thunkAPI.dispatch(achatSlice.actions.clearError());
        // Fetch achat data again
        await thunkAPI.dispatch(fetchAchatData());
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteAchatData = createAsyncThunk('achat/deleteAchatData', async (id_Achat, thunkAPI) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/achat/${id_Achat}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete achat data');
        }
        // Fetch achat data again
        await thunkAPI.dispatch(fetchAchatData());
        return id_Achat;
    } catch (error) {
        throw error;
    }
});

export const updateAchatData = createAsyncThunk(
    'achat/updateAchatData',
    async ({ id_Achat, updatedAchatData }, thunkAPI) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/achat/${id_Achat}`, updatedAchatData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error('Failed to update achat data');
        }
        // Fetch achat data again after updating
        await thunkAPI.dispatch(fetchAchatData());
        return { id_Achat, updatedAchatData };
      } catch (error) {
        throw error;
      }
    }
  );

const achatSlice = createSlice({
    name: 'achat',
    initialState: {
        achatData: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        deleteAchatItem: (state, action) => {
            state.achatData = state.achatData.filter(item => item.id_Achat !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchatData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAchatData.fulfilled, (state, action) => {
                state.loading = false;
                state.achatData = action.payload;
            })
            .addCase(fetchAchatData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postAchatData.pending, (state) => {
                state.loading = true;
            })
            .addCase(postAchatData.fulfilled, (state, action) => {
                state.loading = false;
                state.achatData = [...state.achatData, action.payload];
            })
            .addCase(postAchatData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAchatData.fulfilled, (state, action) => {
                state.loading = false;
                // call deleteAchatItem reducer to update state
                achatSlice.caseReducers.deleteAchatItem(state, action);
            })
            .addCase(deleteAchatData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateAchatData.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
            .addCase(updateAchatData.fulfilled, (state, action) => {
                state.loading = false;
                const { id_Achat, updatedAchatData } = action.payload;
                state.achatData = state.achatData.map(achat =>
                  achat.id_Achat === id_Achat ? { ...achat, ...updatedAchatData } : achat
                );
              })
            .addCase(updateAchatData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
    },
});

export default achatSlice.reducer;
export const { clearError, deleteAchatItem } = achatSlice.actions;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchAchatData = createAsyncThunk('achat/fetchAchatData', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get('https://fadesol-puoc.vercel.app/achat');
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch achat data');
//         }
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const postAchatData = createAsyncThunk('achat/postAchatData', async (postData, thunkAPI) => {
//     try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/achat', postData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status !== 200) {
//             throw new Error('Failed to post achat data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(achatSlice.actions.clearError());
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchAchatData());
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteAchatData = createAsyncThunk('achat/deleteAchatData', async (id_Achat, thunkAPI) => {
//     try {
//         const response = await axios.delete(`https://fadesol-puoc.vercel.app/achat/${id_Achat}`);
//         if (response.status !== 200) {
//             throw new Error('Failed to delete achat data');
//         }
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchAchatData());
//         return id_Achat;
//     } catch (error) {
//         throw error;
//     }
// });

// // export const updateAchatData = createAsyncThunk(
// //     'achat/updateAchatData',
// //     async ({ id_Achat, updateAchatData }, thunkAPI) => {
// //       try {
// //         const response = await axios.put(`https://fadesol-puoc.vercel.app/achat/${id_User}`, updateAchatData, {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true,
// //         });
// //         if (response.status !== 200) {
// //           throw new Error('Failed to update product data');
// //         }
// //         // Fetch product data again after updating
// //         await thunkAPI.dispatch(fetchUserData());
// //         return { id_Achat, updateAchatData };
// //       } catch (error) {
// //         throw error;
// //       }
// //     }
// //   );
// export const updateAchatData = createAsyncThunk(
//     'achat/updateAchatData',
//     async ({ id_Achat, updatedAchatData }, thunkAPI) => {
//       try {
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/achat/${id_Achat}`, updatedAchatData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update achat data');
//         }
//         // Fetch achat data again after updating
//         await thunkAPI.dispatch(fetchAchatData());
//         return { id_Achat, updatedAchatData };
//       } catch (error) {
//         throw error;
//       }
//     }
//   );
// const achatSlice = createSlice({
//     name: 'achat',
//     initialState: {
//         achatData: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         },
//         deleteAchatItem: (state, action) => {
//             state.achatData = state.achatData.filter(item => item.id_Achat !== action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAchatData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAchatData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.achatData = action.payload;
//             })
//             .addCase(fetchAchatData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(postAchatData.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(postAchatData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.achatData = [...state.achatData, action.payload];
//             })
//             .addCase(postAchatData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(deleteAchatData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // call deleteAchatItem reducer to update state
//                 achatSlice.caseReducers.deleteAchatItem(state, action);
//             })
//             .addCase(deleteAchatData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             //====================================
//             .addCase(updateAchatData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//               })
//             //   .addCase(updateAchatData.fulfilled, (state, action) => {
//             //     state.loading = false;
//             //     const { id_Achat, updateAchatData } = action.payload;
//             //     state.userData = state.achatData.map(user =>
//             //       user.id_Achat === id_Achat ? updateAchatData : user
//             //     );
//             //   })
//             .addCase(updateAchatData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const { id_Achat, updatedAchatData } = action.payload;
//                 state.achatData = state.achatData.map(achat =>
//                   achat.id_Achat === id_Achat ? { ...achat, ...updatedAchatData } : achat
//                 );
//               })
              
//               .addCase(updateAchatData.rejected, (state, action) => {
//                 state.loading = false;
//                 console.log(action)
//                 state.error = action.error.message;
//               })
//     },
// });

// export default achatSlice.reducer;
// export const { clearError , deleteAchatItem } = achatSlice.actions;


// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "axios";


// export const fetchAchatData = createAsyncThunk(
//     'achat/fetchAchatData',
//     async (_, thunkAPI) => {
//       try {
//         const response = await axios.get('https://fadesol-puoc.vercel.app/achat', {
//           withCredentials: true,
//         });
        
//         if (response.status !== 200) {
//           throw new Error('Failed to fetch achat data');
//         }

//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     }
//   );

//   export const postAchatData = createAsyncThunk('achat/postAchatData', async (postData, thunkAPI) => {
//     try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/achat', postData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status !== 200) {
//             throw new Error('Failed to post achat data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(achatSlice.actions.clearError());
//         // Fetch achat data again
//         await thunkAPI.dispatch(fetchAchatData());
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });
//   // export const postAchatData = createAsyncThunk(
//   //   'achat/postAchatData',
//   //   async (postData, thunkAPI) => {
//   //     try {
//   //       const response = await axios.post('https://fadesol-puoc.vercel.app/achat', postData, {
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         withCredentials: true,
//   //       });
//   //       if (response.status !== 200) {
//   //         throw new Error('Failed to post achat data');
//   //       }
//   //       // Reset error state
//   //       thunkAPI.dispatch(achatSlice.actions.clearError());
//   //       // Fetch achat data again
//   //       await thunkAPI.dispatch(fetchAchatData());
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error;
//   //     }
//   //   }
//   // );


//   export const updateAchatData = createAsyncThunk(
//     'achat/updateAchatData',
//     async ({ achatId, updatedachatData }, thunkAPI) => {
//       try {
//         console.log("updatedachatData",updatedachatData)
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/achat/${achatId}`, updatedachatData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update achat data');
//         }
//         await thunkAPI.dispatch(fetchAchatData());
//         return { achatId: achatId, updatedachatData: response.data };
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );

// export const deleteAchatData = createAsyncThunk(
//   'achat/deleteAchatData',
//   async (achatId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`https://fadesol-puoc.vercel.app/achat/${achatId}`,{
//           withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to delete achat data');
//       }
//       // Fetch achat data again after deletion
//       await thunkAPI.dispatch(fetchAchatData());
//       return achatId; // Return the ID of the deleted achat
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const achatSlice = createSlice({
//     name: 'achat',
//     initialState: {
//       achatData: [],
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
//         .addCase(fetchAchatData.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchAchatData.fulfilled, (state, action) => {
//           state.loading = false;
//           state.achatData = action.payload;
//           // console.log(action.payload)
//         })
//         .addCase(fetchAchatData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//           // console.log(action)
//         })
//         // Reducer for posting achat data
//         .addCase(postAchatData.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(postAchatData.fulfilled, (state, action) => {
//           state.loading = false;
//           // state.achatData = action.payload;
//           state.achatData = [...state.achatData, action.payload];
//         })
//         .addCase(postAchatData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message
//         })
 
//         // reducer for deleting achat data
//         .addCase(deleteAchatData.pending, (state, action) => {
//           state.loading = true;
//           state.error = null
//         })
//         .addCase(deleteAchatData.fulfilled, (state, action) => {
//           state.loading = false;
//           state.achatData = state.achatData.filter(achat => achat.achatId !== action.payload);
//         })
//         .addCase(deleteAchatData.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message
//         })

//         //reducer for update achat
//         .addCase(updateAchatData.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(updateAchatData.fulfilled, (state, action) => {
//           state.loading = false;
//           const { achatId, updatedachatData } = action.payload;
//           state.achatData = state.achatData.map(achat =>
//             achat.achatId === achatId ? updatedachatData : achat
//           );
//         })
//         .addCase(updateAchatData.rejected, (state, action) => {
//           state.loading = false;
//           console.log(action)
//           state.error = action.error.message;
//         })
//     },
//   });
  
// export default achatSlice.reducer;