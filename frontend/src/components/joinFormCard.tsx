import { ReactNode } from "react";
import { Button } from "@shadcn/button";
import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";

export function JoinFormCard(props: {
  desc: string;
  children: ReactNode;
  submit_text: string;
  onSubmit: () => void;
}) {
  return (
    <Card className="box-border w-[95vw] max-w-[400px]">
      <CardHeader>
        <CardDescription>{props.desc}</CardDescription>
      </CardHeader>

      <CardContent>
        {props.children}

        <Button className="mt-3" onClick={props.onSubmit}>
          {props.submit_text}
        </Button>
      </CardContent>
    </Card>
  );
}

export function JoinFormCard2Buttons(props: {
  desc: string;
  children: ReactNode;
  submit_text: string;
  onSubmit: () => void;
  submit_text2: string;
  onSubmit2: () => void;
}) {
  return (
    <Card className="w-[95vw] box-border max-w-[400px]">
      <CardHeader>
        <CardDescription>{props.desc}</CardDescription>
      </CardHeader>

      <CardContent>
        {props.children}

        <Button className="mt-3" onClick={props.onSubmit}>
          {props.submit_text}
        </Button>
        <Button className="mt-3" onClick={props.onSubmit2}>
          {props.submit_text2}
        </Button>
      </CardContent>
    </Card>
  );
}
