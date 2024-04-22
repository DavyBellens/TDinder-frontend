import { useRouter } from "next/router";
import defaultProfilePicture from "/public/images/default-profilePicture.jpg";
import fotoVanMezelf from "/public/images/foto-van-mezelf.jpg";

type Props = {
  profiles: any[];
};
const ProfilesOverviewTable: React.FC<Props> = ({ profiles }: Props) => {
  const router = useRouter();
  return (
    <div className="app m-2">
      {profiles &&
        defaultProfilePicture &&
        profiles.map((p, index) => {
          return (
            <div
              key={index}
              onClick={() => router.push("/matches/" + p.id)}
              className="text-md grid grid-cols-4 bg-white bg-opacity-90 pt-1 pb-1 border border-b-1"
            >
              <img
                src={p.id == "1" || p.id == "2" ? fotoVanMezelf.src : defaultProfilePicture.src}
                width={50}
                height={50}
                alt={"profile picture of profile with id " + p.id}
                className="rounded-full row-span-2 row-start-1 m-auto"
              />
              <div className="grid text-black text-opacity-70 font-bold col-span-3 m-1 grid-rows-2">
                <span className={p.name.length > 15 ? "text-sm" : "text-lg"}>{p.name}</span>
                <div>
                  <span>- {p.age}</span>
                  <span className="font-mono text-xl">
                    {p.gender === "MAN" ? " ♂" : p.gender === "WOMAN" ? " ♀" : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ProfilesOverviewTable;
