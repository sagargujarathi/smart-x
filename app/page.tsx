import { redirect } from "next/navigation";
import LoadingPage from "./(loading)/loading";

const Page = () => {
  redirect("/signin");

  return <LoadingPage />;
};

export default Page;
