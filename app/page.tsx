import { redirect } from "next/navigation";
import LoadingPage from "./(loading)/loading";

const Page = () => {
  redirect("/login");
  
  return <LoadingPage/>
};

export default Page;
