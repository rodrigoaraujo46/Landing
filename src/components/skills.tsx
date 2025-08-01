import Card, { CardTitle, CardText } from "./card";
import Gopher from "./gopher";
import IconGroup from "./iconGroup";
import Icons from "./icons";

export default function Skills() {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-5xl font-roboto font-bold">Skills</h1>
            <div className="flex flex-row gap-6 justify-center flex-wrap">
                <div className="w-[588px]">
                    <Card>
                        <CardTitle> Backend </CardTitle>
                        <CardText> I love problem-solving and building complex systems. I&nbsp;strive to create scalable, reliable, and secure solutions. </CardText>
                        <div className="flex flex-row justify-between h-full">
                            <div className="mt-6 h-[40px]">
                                <IconGroup>
                                    <Icons.Python />
                                    <Icons.Django />
                                    <Icons.Go />
                                    <Icons.Postgresql />
                                    <Icons.Typescript />
                                </IconGroup>
                            </div>
                            <div className="min-w-20">
                                <Gopher />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col gap-6 w-[588px]">
                    <Card>
                        <CardTitle>Frontend & Design</CardTitle>
                        <CardText> I'm passionate about design, animation, and interactions, always aiming to build fun websites with great user experiences. </CardText>
                        <div className="mt-6 h-[40px]">
                            <IconGroup>
                                <Icons.Tailwindcss />
                                <Icons.React />
                                <Icons.Css />
                                <Icons.Htmx />
                                <Icons.Html5 />
                                <Icons.Javascript />
                            </IconGroup>
                        </div>
                    </Card>
                    <Card >
                        <CardTitle> Cloud & DevOps </CardTitle>
                        <CardText> I have deployed and managed various applications using tools such as AWS, GCP, and other cloud services. </CardText>
                        <div className="mt-6 h-[40px]">
                            <IconGroup>
                                <Icons.Linux />
                                <Icons.Ngrok />
                                <Icons.Redis />
                                <Icons.Docker />
                            </IconGroup>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

