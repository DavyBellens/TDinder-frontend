import { BackendProfile } from "@/types";
import default_profile_picture from "/public/images/default-profilePicture.jpg";
import picture_of_me1 from "/public/images/foto-van-mezelf.jpg";
import picture_of_me2 from "/public/images/my_gf_and_me.jpg";
import { useEffect, useState } from "react";

type Props = {
  profile: BackendProfile;
};

const MatchProfile: React.FC<Props> = ({ profile }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [images, setImages] = useState<any[]>([default_profile_picture.src, default_profile_picture.src]);
  const [selectedImage, setSelectedImage] = useState<0 | 1>(0);

  const changeImage = (value: number) => {
    if (index + value === images.length) {
      setIndex(0);
      setSelectedImage(images[0]);
    } else if (index + value === -1) {
      setIndex(images.length - 1);
      setSelectedImage(images[images.length - 1]);
    } else {
      setIndex(index + value);
      setSelectedImage(images[index + value]);
    }
  };

  useEffect(() => {
    if (profile.id == "1" || profile.id == "2") {
      setImages([picture_of_me1.src, picture_of_me2.src]);
    }
  }, [profile]);

  return profile ? (
    <div className="flex items-center flex-col w-10/12 justify-center">
      {default_profile_picture && (
        <div>
          <div className="flex justify-center relative h-full mb-10 w-full">
            <div className="absolute left-0 top-0 w-1/2 h-full" onClick={() => changeImage(-1)}></div>
            <div className="image-container bg-black m-auto flex items-center w-full relative align-middle">
              <img
                src={images[selectedImage]}
                alt={"picture of profile " + profile.name}
                className="bg-black image-container"
              />
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full" onClick={() => changeImage(1)}></div>
          </div>
          <div className={"bg-white text-black p-1 text-xl mt-5"}>
            <p>{profile.name}</p>
            <div className="flex p-1 text-gray-600">
              -{profile.age}
              <p className="font-mono text-2xl pl-1">
                {(profile.gender === "MAN" || profile.gender === "WOMAN") && profile.gender === "MAN" ? "♂" : "♀"}
              </p>
            </div>
            <p className="text-gray-600">{profile.bio}</p>
            <div className="text-gray-600">{profile.interests ? profile.interests.map((i) => "#" + i + " ") : ""}</div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p></p>
  );
};

export default MatchProfile;
