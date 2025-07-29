import { IconCloud } from "@/components/magicui/icon-cloud";

const slugs = [
    { name: "go", light: "_", dark: "_" },
    { name: "python", light: "_", dark: "_" },
    { name: "typescript", light: "_", dark: "_" },
    { name: "javascript", light: "_", dark: "_" },
    { name: "react", light: "_", dark: "_" },
    { name: "html5", light: "_", dark: "_" },
    { name: "css", light: "_", dark: "_" },
    { name: "postgresql", light: "_", dark: "_" },
    { name: "docker", light: "_", dark: "_" },
    { name: "git", light: "_", dark: "_" },
    { name: "github", light: "_", dark: "white" },
    { name: "htmx", light: "_", dark: "_" },
    { name: "tailwindcss", light: "_", dark: "_" },
    { name: "linux", light: "_", dark: "_" },
    { name: "redis", light: "_", dark: "_" },
    { name: "django", light: "green", dark: "green" },
    { name: "ngrok", light: "_", dark: "white" },
    { name: "vite", light: "_", dark: "_" }
];

export default function SkillCloud() {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug.name}/${slug.light}/${slug.dark}`,
    );

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    );
}
