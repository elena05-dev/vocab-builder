import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  list: [],
  page: 1,
  totalPages: 1,
  training: {
    list: [],
    loading: false,
    error: null,
  },

  recommend: {
    list: [],
    totalPages: 1,
    page: 1,
    loading: false,
    error: null,
  },

  statistics: {
    data: null,
    loading: false,
    error: null,
  },

  status: "idle",
  error: null,
};

export const addWord = createAsyncThunk(
  "words/addWord",
  async (word, { rejectWithValue }) => {
    try {
      const res = await api.post("/words/create", word);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  },
);

export const saveTraining = createAsyncThunk(
  "words/saveTraining",
  async (answers, { rejectWithValue }) => {
    try {
      const res = await api.post("/words/answers", answers);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/words/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/words/edit/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchWords = createAsyncThunk(
  "words/fetchWords",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/words/own", { params });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchTrainingWords = createAsyncThunk(
  "words/fetchTrainingWords",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/words/tasks");

      console.log("TRAINING API:", res.data);
      return res.data.tasks;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchStatistics = createAsyncThunk(
  "words/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/words/statistics");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchRecommendWords = createAsyncThunk(
  "words/fetchRecommendWords",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/words/all", { params });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addWordToDictionary = createAsyncThunk(
  "words/addWordToDictionary",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.post(`/words/add/${id}`);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  },
);

const wordSlice = createSlice({
  name: "words",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(addWord.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.unshift(action.payload);
      })
      .addCase(addWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.list = state.list.filter((w) => w._id !== action.payload);
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        const index = state.list.findIndex((w) => w._id === action.payload._id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(saveTraining.fulfilled, (state, action) => {
        const results = action.payload;

        results.forEach((r) => {
          const word = state.list.find((w) => w._id === r._id);

          if (!word) return;

          if (r.isCorrect) {
            word.progress = 100;
          }
        });
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.list = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.statistics.loading = true;
        state.statistics.error = null;
      })

      .addCase(fetchRecommendWords.pending, (state) => {
        state.recommend.loading = true;
      })

      .addCase(fetchRecommendWords.fulfilled, (state, action) => {
        state.recommend.loading = false;

        state.recommend.list = action.payload.results;
        state.recommend.totalPages = action.payload.totalPages;
        state.recommend.page = action.payload.page;
      })

      .addCase(fetchRecommendWords.rejected, (state, action) => {
        state.recommend.loading = false;
        state.recommend.error = action.payload;
      })

      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics.loading = false;
        state.statistics.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.statistics.loading = false;
        state.statistics.error = action.payload;
      })

      .addCase(fetchTrainingWords.pending, (state) => {
        state.training.loading = true;
        state.training.error = null;
      })
      .addCase(fetchTrainingWords.fulfilled, (state, action) => {
        state.training.loading = false;

        state.training.list = action.payload.map((task) => {
          const word = state.list.find((w) => w._id === task._id);

          return {
            ...word,
            ...task,
          };
        });
      })
      .addCase(fetchTrainingWords.rejected, (state, action) => {
        state.training.loading = false;
        state.training.error = action.payload;
      });
  },
});

export default wordSlice.reducer;
