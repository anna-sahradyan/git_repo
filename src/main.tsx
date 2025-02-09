import {createRoot} from 'react-dom/client'
import '../src/assets/style/main.scss'
import {App} from './App.tsx';
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <App/>
    </Provider>
)
