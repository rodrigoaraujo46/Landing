import { IconCloud } from "@/components/magicui/icon-cloud";
import Icons from "./icons";

export default function SkillCloud() {
    const icons: React.ReactElement<HTMLImageElement>[] = [
        <Icons.Go />,
        <Icons.Python />,
        <Icons.Typescript />,
        <Icons.Javascript />,
        <Icons.React />,
        <Icons.Html5 />,
        <Icons.Css />,
        <Icons.Postgresql />,
        <Icons.Docker />,
        <Icons.Git />,
        <Icons.GitHub />,
        <Icons.Htmx />,
        <Icons.Tailwindcss />,
        <Icons.Linux />,
        <Icons.Redis />,
        <Icons.Django />,
        <Icons.Ngrok />,
        <Icons.Vite />
    ];

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud icons={icons} />
        </div>
    );
}
