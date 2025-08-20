import Card, { CardTitle, CardText } from "./card";
import Gopher from "./gopher";
import IconGroup from "./iconGroup";
import Icons from "./icons";

export default function Skills() {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-5xl font-roboto font-bold">Skills</h1>
            <div className="flex flex-row gap-6 justify-center flex-wrap">
                <div className="max-w-[588px]">
                    <Card from="left">
                        <CardTitle> Backend </CardTitle>
                        <CardText> I’m passionate about problem-solving and crafting complex systems. My focus is on building solutions that are scalable, reliable, and secure. </CardText>
                        <div className="flex flex-row justify-between h-full mt-6">
                            <div className="h-[40px]">
                                <IconGroup>
                                    <Icons.Python />
                                    <Icons.Django />
                                    <Icons.Go />
                                    <Icons.Postgresql />
                                    <Icons.Typescript />
                                </IconGroup>
                            </div>
                            <div>
                                <Gopher />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col gap-6 max-w-[588px]">
                    <Card from="right">
                        <CardTitle>Frontend & Design</CardTitle>
                        <CardText> I’m passionate about design, animation, and interactions, always striving to create engaging websites with outstanding user experiences. </CardText>
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
                    <Card from="right">
                        <CardTitle> Cloud & DevOps </CardTitle>
                        <CardText> I have deployed some applications using Cloud and DevOps systems. </CardText>
                        <div className="mt-6 h-[40px]">
                            <IconGroup>
                                <Icons.Linux />
                                <Icons.Kubernetes />
                                <Icons.Redis />
                                <Icons.Docker />
                                <Icons.Ngrok />
                            </IconGroup>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

