import { Link, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <div className="min-h-screen min-w-screen box-border flex justify-center flex-col p-14 items-center">
        <h2 className="text-5xl font-bold text-cyan-700 mb-2"> 404 </h2>
        <h2 className="text-3xl font-bold"> Page not found. </h2>
        <Link className="max-w-min" to="/">
          {" "}
          <Button className="mt-4" variant="link">
            {" "}
            Back to homepage.{" "}
          </Button>{" "}
        </Link>
      </div>
    </>
  );
}
