import Image from "next/image";

export default function Home() {
  React.useEffect(() => {
    let oktogo = false;
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data) oktogo = true;
    } catch (error) {
      console.log(error);
    }
    if (oktogo) redirect("/dashboard");
    else redirect("/auth");
  }, []);
  return <div></div>;
}
