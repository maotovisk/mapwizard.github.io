import { ComponentChildren } from "preact";
import Button from "./Button";

export interface Tab {
    id: string;
    label: ComponentChildren;
}

interface TabGroupProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export default function TabGroup({ tabs, activeTab, onChange }: TabGroupProps) {
    return (
        <div className="flex rounded-lg border border-gray-400/40 dark:border-gray-500/40 overflow-hidden">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    variant="tab"
                    active={activeTab === tab.id}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}
