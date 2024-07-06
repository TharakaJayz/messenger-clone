import Sidebar from "../components/sidebar/Sidebar";

export default async function UserLayout({ children }: { children: React.ReactNode }) {

    return <div className="h-full" >
       
        <Sidebar>
            {children}
        </Sidebar>
    </div>

} 