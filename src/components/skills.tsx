import React from "react";

interface SkillCategoryProps {
    children: React.ReactNode;
}

export default function Skills() {
    return (
        <>
            <h1>Skills</h1>
            <div className="flex flex-row gap-10 justify-center">
                <div className="flex flex-col gap-10 justify-center">
                    <SkillCategory>
                        HI
                    </SkillCategory>
                    <SkillCategory>
                        HI2
                    </SkillCategory>
                </div>
                <div className="flex flex-col gap-10 mt-16">
                    <SkillCategory>
                        BYE
                    </SkillCategory>
                    <SkillCategory>
                        BYE2
                    </SkillCategory>
                </div>
            </div>
        </>
    );
}

function SkillCategory({ children }: SkillCategoryProps) {
    return (
        <div className="border border-gopher rounded-xl h-50 w-96">
            {children}
        </div>
    );
}
