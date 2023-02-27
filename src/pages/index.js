import dynamic from "next/dynamic";
const Auth = dynamic(() => import("./auth"));
export default function Home() {
  return (
    <>
      <Auth />
    </>
  );
}
