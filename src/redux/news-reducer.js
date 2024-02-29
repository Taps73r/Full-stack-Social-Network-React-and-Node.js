const GET_NEWS_DATA = "GET_NEWS_DATA";
let initialState = {
  newsData: [],
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_DATA:
      return {
        ...state,
        newsData: action.data,
      };
    default:
      return state;
  }
};

export const getNewsData = (data) => ({
  type: GET_NEWS_DATA,
  data,
});
