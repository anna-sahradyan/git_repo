import {useState} from "react";
import style from './input.module.scss';


export const FormSearch: React.FC<{ onSearch: (username: string) => void }> = ({onSearch}) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue) {
            onSearch(inputValue);
        }
    };

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <input
                    className={style.inputField}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Введите имя пользователя"
                />
            </form>
        </div>
    );
};
