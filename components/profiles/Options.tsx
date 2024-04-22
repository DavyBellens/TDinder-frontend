import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfileInfo from "@/components/profiles/ProfileInfo";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import AuthError from "../authorization/AuthError";

type Props = {
  profile: Profile;
};

const OptionsComponent: React.FC<Props> = ({ profile }: Props) => {
  const router = useRouter();

  const logoutUser = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("token");
    router.push("/login");
  };
  const basic = "grid grid-cols-4 bg-white bg-opacity-75 rounded-lg font-bold text-center text-xl mt-5 p-5";
  return (
    <div className="flex flex-col items-center w-full">
      {profile ? (
        <>
          <button onClick={logoutUser} className={basic + " text-black w-10/12"}>
            <span className="text-3xl text-center">🚪</span>
            <span className="col-span-3">Logout</span>
          </button>
          <button
            onClick={() => router.push("/matches/delete/" + profile.id)}
            className={basic + " text-lg p-3 w-10/12 text-red-700"}
          >
            <span className="text-3xl text-center">🗑️</span>
            <span className="col-span-3">Remove account</span>
          </button>
        </>
      ) : (
        <AuthError />
      )}
    </div>
  );
};
export default OptionsComponent;
