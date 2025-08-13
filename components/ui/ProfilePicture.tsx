import { useRouter } from "next/navigation";
import { NavbarButton } from "./resizeable-navbar";

const ProfilePicture = ({
  name,
  path,
  imageURL,
}: {
  name?: string;
  path?: string;
  imageURL?: string;
}) => {
  const router = useRouter();

  return (
    <NavbarButton
      onClick={() => {
        if (path) {
          router.push(path);
        }
      }}
      variant="secondary"
      className="rounded-full flex items-center justify-center text-lg border h-12 w-12 border-neutral-100 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
      style={{ padding: 0 }}
    >
      {imageURL ? (
        <img
          src={imageURL}
          alt={name || "User"}
          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
      ) : (
        <span className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-green-400 via-green-500 to-green-600 text-white font-bold text-xl border-2 border-white shadow-sm">
          {name ? name[0].toUpperCase() : "U"}
        </span>
      )}
    </NavbarButton>
  );
};

export default ProfilePicture;
