import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
  isLoading: false,
  error: ''
};

export const getPostsList = createAsyncThunk("books/getBooks", async (arr) => {
    try {
      const data = await fetch(`http://localhost:5050/blogPosts?page=${arr[0]}&title=${arr[1]}`);
      const response = await data.json();
      return response;
    } catch (error) {
      if (error) {
        throw new Error("Errore nella ricezione dei dati");
      }
    }
  });

  const blogListSlice = createSlice({
    name: 'getBlogList',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getPostsList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPostsList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postsList = action.payload.posts;
        })
        .addCase(getPostsList.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Errore nella ricezione dei dati';
        })
    }
});

export const blogListLoading = (state) => state.blogListState.isLoading;
export const postsList = (state) => state.blogListState.postsList;
export const blogListError = (state) => state.blogListState.error;
export default blogListSlice.reducer;
