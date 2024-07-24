import { Link } from "react-router-dom";

export function Header(props: {
	link?: string;
}) {
    const { link = "" } = props;
    return (
        <div className="max-w-screen py-1 px-6 border box-border">
            <h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
                {link ? (
                    <Link to={link}>
                        Scoreboard
                    </Link>
                ) : (
                    "Scoreboard"
                )}
            </h1>
        </div>
	);
}
