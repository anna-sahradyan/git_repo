import React from 'react';
import style from './repoCard.module.scss';

interface RepoCardProps {
    repo: {
        id: number;
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        updated_at: string;
    };
}

export const RepoCard: React.FC<RepoCardProps> = ({repo}) => {

    return (
        <div className={style.repoCard}>
            <h3>{repo.name}</h3>
            <p className={style.cardText}>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Перейти в репозиторий
            </a>
            <p><span>⭐</span>Звезды: {repo.stargazers_count}</p>
            <p>Последнее обновление: {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
    );
};
