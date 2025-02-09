import React, {useState, useEffect, useRef, useCallback} from 'react';
import {FormSearch} from "../formSearch/FormSearch.tsx";
import {RepoCard} from "./RepoCard.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {getRepos} from "../../redux/thunk/thunk.ts";
import {resetRepos} from "../../redux/gitRepoSlice.ts";
import style from './repo.module.scss';
import {Loading} from "../Loading";

export const RepoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const {items, isFetching, fetchError} = useAppSelector((state) => state.repos);
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastRepoElementRef = useCallback((node: HTMLDivElement) => {
        if (isFetching || rateLimitExceeded) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !fetchError) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isFetching, fetchError, rateLimitExceeded]);

    const handleSearch = (username: string) => {
        setUsername(username);
        setCurrentPage(1);
        setRateLimitExceeded(false);
        dispatch(resetRepos());
        dispatch(getRepos({searchQuery: username, currentPage: 1, perPage: 20}));
    };

    useEffect(() => {
        if (username) {
            dispatch(getRepos({searchQuery: username, currentPage, perPage: 20}));
        }
    }, [currentPage, username, dispatch]);

    useEffect(() => {
        if (fetchError === 'API rate limit exceeded') {
            setRateLimitExceeded(true);
        }
    }, [fetchError]);
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        if (rateLimitExceeded) {
            const retryFetch = async () => {
                await delay(60000);
                setRateLimitExceeded(false);
                setCurrentPage(1);
            };

            retryFetch();
        }
    }, [rateLimitExceeded]);
    return (
        <div className={'container'}>
            <div className={style.content}>
                <h1 className={style.title}>Начните поиск репозиториев по имени пользователя</h1>
                <FormSearch onSearch={handleSearch}/>
                {rateLimitExceeded && (
                    <div className={style.errorMessage}>Превышен лимит запросов к API GitHub. Попробуйте позже.</div>
                )}
                {fetchError && !rateLimitExceeded && (
                    <div className={style.errorMessage}>Произошла ошибка при загрузке данных.</div>
                )}
                <div className = {style.cardBlock}>
                {items.map((repo, index) => {
                    if (items.length === index + 1) {
                        return <div ref={lastRepoElementRef} key={repo.id}><RepoCard repo={repo} key={`${repo.id}-${index}`}/></div>;
                    } else {
                        return <RepoCard key={`${repo.id}-${index}`} repo={repo}/>;
                    }
                })}
                </div>
                {isFetching && !rateLimitExceeded && <div className={style.loadingIndicator}><Loading/></div>}
            </div>
        </div>
    );
};
