import CATEGORIES_ACTION_TYPES from "./cateogry.types";
import createAction from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (disptach) => {
    disptach(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      disptach(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      disptach(fetchCategoriesFailed(error));
    }
  };
};
