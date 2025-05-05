import Character from "../shared/Character";
import useAuth from "../../../hooks/useAuth";

type UserCharacterSummaryProps = {
    cssScore: number | undefined;
    htmlScore: number | undefined,
    javaScriptScore: number | undefined,
    nodeJsScore: number | undefined,
    reactScore: number | undefined,
    overallScore: number | undefined,
    pfp: string | undefined
}

function UserCharacterSummary ({pfp, cssScore, htmlScore, javaScriptScore, nodeJsScore, reactScore, overallScore}: UserCharacterSummaryProps): JSX.Element {
    const { user } = useAuth()
    
    return (
        <div className="bg-red-400 w-90 h-129 m-1 rounded-3xl">
            <div className="scale-90 flex flex-col justify-center items-center bg-red-400 w-90 h-129 m-1 rounded-3xl">
                <h2 className="font-semibold text-xl">{user?.name}</h2>
                <div className="inline-block origin-top overflow-hidden"><Character src={pfp} alt="Profile"/></div>
                <div className="flex">
                    <div className="m-2">
                        <div className="text-lg"><span className="font-bold">HTML Score:</span> {htmlScore}</div>
                        <div className="text-lg"><span className="font-bold">CSS Score:</span> {cssScore}</div>
                        <div className="text-lg"><span className="font-bold">JavaScript Score:</span> {javaScriptScore}</div>
                    </div>
                    <div className="m-2">
                        <div className="text-lg"><span className="font-bold">React Score:</span> {reactScore}</div>
                        <div className="text-lg"><span className="font-bold">NodeJS Score:</span> {nodeJsScore}</div>
                        <div className="text-lg"><span className="font-bold">Overall Score:</span> {overallScore}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCharacterSummary;