import { configureStore } from '@reduxjs/toolkit'
import onBoardingReducer from '@feature/onBoarding.slice'

// ...

export const store = configureStore({
  reducer: {
     onBoarding:onBoardingReducer
  },
  // Disable serializableCheck for  image state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable value check for specific action types or paths
        ignoredActions: ['onboarding/setImage'],  // Add your action type here
        ignoredPaths: ['onBoarding.image.list'],  // Ignore paths containing File objects
      },
    }),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch