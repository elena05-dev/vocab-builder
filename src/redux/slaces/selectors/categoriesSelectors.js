import { createSelector } from "reselect";

export const selectCategoriesState = (state) => state.categories;

export const selectCategoriesItems = createSelector(
  [selectCategoriesState],
  (categories) => categories?.items ?? [],
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  (categories) => categories?.status ?? "idle",
);

export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  (categories) => categories?.error ?? null,
);
