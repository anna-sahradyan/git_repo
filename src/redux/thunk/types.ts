
export interface Owner {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Repo {
    id: number;
    name: string;
    full_name: string;
    updated_at: string;
    description: string |null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    owner: Owner;
}

export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}
