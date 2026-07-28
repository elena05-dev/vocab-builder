import { createSelector } from "reselect";

const selectWordsState = (state) => state.words;

export const selectWordsList = createSelector(
  [selectWordsState],
  (words) => words.list || [],
);

export const selectTotalPages = createSelector(
  [selectWordsState],
  (words) => words.totalPages || 1,
);

export const selectWordsStatus = createSelector(
  [selectWordsState],
  (words) => words.status || "idle",
);

export const selectTrainingList = createSelector(
  [selectWordsState],
  (words) => words.training.list || [],
);

export const selectTrainingLoading = createSelector(
  [selectWordsState],
  (words) => words.training.loading,
);

export const selectTrainingTasks = (state) => state.words.training.list;

export const selectRecommendWords = (state) => state.words.recommend.list;

export const selectRecommendTotalPages = (state) =>
  state.words.recommend.totalPages;

export const selectStatisticsTotal = createSelector(
  [selectWordsState],
  (words) => words.statistics.data?.totalCount ?? 0,
);
