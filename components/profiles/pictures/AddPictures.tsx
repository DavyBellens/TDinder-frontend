import ImageUpload from "@/components/profiles/pictures/ImageUpload";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useRouter } from "next/router";

type Props = {
  profile: Profile;
  id: string;
  images: string[];
};
const ProfileAddPictureComponent: React.FC<Props> = ({ profile, id, images }: Props) => {
  const router = useRouter();

  const updateProfile = async (pictures: string[]) => {
    const profileObject = await ProfileService.getProfileById(profile.id);
    if (profileObject.profile) {
      await ProfileService.updateProfile(
        profile.id,
        {},
        profileObject.profile.gender,
        profileObject.profile.preference,
        pictures,
        profileObject.profile.socials
      );
    }
    router.reload();
  };

  const addPictureToProfile = async (picture: string) => {
    const profilePictures = [...profile.pictures, picture];
    await updateProfile(profilePictures);
  };
  const removeLastPictureFromProfile = async () => {
    const profilePictures = profile.pictures;
    profilePictures.pop();
    if (profilePictures.length > 0) {
      updateProfile(profilePictures);
    }
  };
  return (
    <>
      {profile && images && (
        <>
          <h1 className="text-3xl font-bold text-center p-5 mt-5">
            Your pictures <br />
            <small className="font-normal">Max. 2</small>
          </h1>
          {images.length > 0 ? (
            <ul className="p-1 justify-center grid gap-2 grid-cols-2">
              {images.map((i, index) => {
                return (
                  <li
                    key={index}
                    className="m-auto rounded-lg justify-center bg-black h-full flex items-center"
                    onClick={() =>
                      profile.pictures && router.push(router.asPath + "/../" + profile.pictures[index] + "/remove")
                    }
                  >
                    {/* <Image
                      src={i}
                      alt={"Profile picture with name " + profile.pictures[index]}
                      width="0"
                      height="0"
                      style={{ width: "150px", height: "auto" }}
                      loading="lazy"
                      className="rounded-lg"
                      />
                      */}
                    <img
                      src={i}
                      alt={"Profile picture with name " + profile.pictures[index]}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center m-5 text-xl">You haven't posted any pictures</p>
          )}
          {images.length < 2 && (
            <ImageUpload
              callBack={async (image: any) => {
                if (image != null) {
                  await addPictureToProfile(image);
                } else {
                  await removeLastPictureFromProfile();
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
};
export default ProfileAddPictureComponent;
