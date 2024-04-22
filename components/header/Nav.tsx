import { Gender, Preference } from "@/types";
import Link from "next/link";

type Props = {
  isLoggedIn: boolean;
  gender?: Gender;
  preference?: Preference;
};

const Nav: React.FC<Props> = ({ isLoggedIn, gender, preference }: Props) => {
  return (
    <nav role="navigation" className={isLoggedIn ? "grid grid-cols-3 p-3 text-center" : " p-3"}>
      {isLoggedIn ? (
        <>
          <Link
            href="/options"
            className={"text-3xl flex justify-center items-center font-mono text-red-700 text-opacity-60 "}
          >
            ☰
          </Link>
          <Link href="/" className={"text-4xl flex justify-center"}>
            {preference === "FEMALE" && gender === "WOMAN" && "👩‍❤️‍👩"}
            {preference === "MALE" && gender === "MAN" && "👨‍❤️‍👨"}
            {((preference === "FEMALE" && gender === "MAN") || (preference === "MALE" && gender === "WOMAN")) &&
              "👨‍❤️‍👩"}
            {(gender === "OTHER" ||
              gender === "SECRET" ||
              gender === "X" ||
              preference === "BOTH" ||
              preference === "OTHER/SECRET") &&
              "💑"}
          </Link>
          <Link href="/matches" className={"text-4xl flex justify-center"}>
            🔗
          </Link>
        </>
      ) : (
        <Link href={"/login"} className="text-xl text-white flex justify-center items-center text-center">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
