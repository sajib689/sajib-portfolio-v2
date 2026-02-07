import { getProjects, getMessages, getAppointments, getPosts } from "../actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/src/Components/Admin/DashboardClient";

export default async function DashboardPage() {
    const { data: initialProjects } = await getProjects();
    const initialMessages = await getMessages();
    const initialAppointments = await getAppointments();
    const initialPosts = await getPosts();


    async function logout() {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("admin_token");
        redirect("/admin/login");
    }

    return (
        <DashboardClient
            initialProjects={initialProjects}
            initialMessages={initialMessages}
            initialAppointments={initialAppointments}
            initialPosts={initialPosts}
        />
    );
}

