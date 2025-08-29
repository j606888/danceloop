import { useMeQuery } from "@/store/slices/user";
import Sidrbar from "./Sidrbar";

const Navbar = () => {
  const { data: user } = useMeQuery();
  const isLogin = !!user;

  return (
    <div className="sticky top-0 z-50 flex gap-4 h-[56px] px-3 items-center shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] bg-white">
      <Sidrbar />
      <div className="flex items-center gap-1">
        <img src="/icons/Logo.svg" alt="Logo" />
        <h4 className="text-xl font-bold tracking-tight">DanceLoop</h4>
      </div>
      {isLogin ? (
        <div className="flex items-center justify-center bg-[#DD886F] ml-auto w-8 h-8 rounded-full">
          <p className="text-white text-sm">{user?.name.charAt(0)}</p>
        </div>
      ) : (
        <button className="px-3 py-2 bg-[#DD886F] text-white rounded-[10px] ml-auto">
          登入
        </button>
      )}
    </div>
  );
};

export default Navbar;
