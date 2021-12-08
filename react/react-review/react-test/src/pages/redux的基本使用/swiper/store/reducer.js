let initialState = [];
export default function reducer(state = initialState,action) {
  switch (action.type) {
    case 'getSwiperAction':
      if(action.data){
        return action.data;
      }
      return initialState;
    default:
      return initialState;
  }
}
