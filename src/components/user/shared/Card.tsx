import { useNavigate } from "react-router-dom";

type CardProps = {
    colorClass: string;
    title: string;
    route?: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ colorClass, title, route, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    }

    return (
        <div className="m-5">
            <h2 className="font-bold text-2xl">{title}</h2>
            <div className={`flex flex-col justify-center items-center ${colorClass} w-80 h-100 rounded-2xl`}>
                <div className="flex justify-center items-center bg-white w-65 h-60 rounded-2xl mb-6 p-8">{children}</div>
                <button className="bg-white w-65 h-10 rounded-2xl cursor-pointer hover:bg-green-100" onClick={handleClick}>Start</button>
            </div>
        </div>
    )
}

export default Card;