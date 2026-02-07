import Main from "@/src/Components/Home/Main";
import { getProjects } from "./admin/actions";


export default async function Home() {
  const { data: projects, isFallback } = await getProjects();

  return (
    <div>
      <Main projects={projects} isFallback={isFallback} />
    </div>
  );
}


