import Collaborators from "./Collaborators";
import HeaderActions from "./HeaderActions";
import Followers from "./Followers";
import MetaInfo from "./MetaInfo";

const Header = () => {
  return (
    <div className="bg-[#F2F2F2]">
      <HeaderActions />
      <div className="flex flex-col gap-2 px-4 pb-2">
        <h2 className="text-lg font-medium text-[#343434]">翰林 Salsa Zero - 2025 第二期</h2>
        <div className="flex items-center gap-3">
          <Collaborators />
          <Followers />
        </div>
        <MetaInfo />
      </div>
    </div>
    );
  };

export default Header;