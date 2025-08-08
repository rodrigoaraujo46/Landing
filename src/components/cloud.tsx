import { IconCloud } from "@/components/magicui/icon-cloud";
import Icons from "./icons";

export default function SkillCloud() {
    const icons: string[] = [
        Icons.Go().props.src,
        Icons.Python().props.src,
        Icons.Typescript().props.src,
        Icons.Javascript().props.src,
        Icons.React().props.src,
        Icons.Html5().props.src,
        Icons.Css().props.src,
        Icons.Postgresql().props.src,
        Icons.Docker().props.src,
        Icons.Git().props.src,
        Icons.Htmx().props.src,
        Icons.Tailwindcss().props.src,
        Icons.Linux().props.src,
        Icons.Redis().props.src,
        Icons.Django().props.src,
        Icons.Ngrok().props.src,
        Icons.Vite().props.src,
        Icons.Kubernetes().props.src,
    ];

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={icons} />
        </div>
    );
}
