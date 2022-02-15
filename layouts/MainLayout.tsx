import Header from "@/components/Header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    return (
        <div className="flex flex-col max-w-3xl min-h-screen mx-auto text-black">
            <Header />
            {children}
        </div>
    )
}