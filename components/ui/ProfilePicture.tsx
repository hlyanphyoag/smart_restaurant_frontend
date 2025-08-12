import { useRouter } from "next/navigation";
import { NavbarButton } from "./resizeable-navbar";

const ProfilePicture = ({ name, path }: { name?: string; path?: string }) => {
  const router = useRouter();

  return (
    <NavbarButton
      onClick={() => {
        if (path) {
          router.push(path);
        }
      }}
      variant="secondary"
      className="rounded-full flex items-center justify-center text-lg border h-12 w-12 border-neutral-100 bg-green-400 text-white"
    >
      {name ? name[0] : "U"}
    </NavbarButton>
  );
};

export default ProfilePicture;
