import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../app/(notifications)/notificationsSlice';
import messagesReducer from '../app/(messages)/messagesSlice';
import usersReducer from '../app/(users)/usersSlice';
import waqfsReducers from '../app/(waqfs)/waqfsSlice';
import searchsReducer from '../app/searchs/searchsSlice';
import partnersReducer from '../app/partners/PartnersSlice';
import volunteersReducer from '../app/volunteers/VolunteersSlice';
import beneficiariesReducer from '../app/beneficiaries/beneficiariesSlice';
import newsReducer from '../app/news/newsSlice';
import donationsReducer from '../app/(donations)/donationsSlice';
import helpsReducer from '../app/helps/helpsSlice';

export default configureStore({
    
    reducer: {
        notifications: notificationsReducer,
        messages: messagesReducer,
        users: usersReducer,
        waqfs: waqfsReducers,
        searchs: searchsReducer,
        partners: partnersReducer,
        volunteers: volunteersReducer,
        beneficiaries: beneficiariesReducer,
        news:newsReducer,
        donations:donationsReducer,
        helps:helpsReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
