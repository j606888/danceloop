import { Tab } from ".";
import NewPlaylist from "./NewPlaylist";

const TABS = [
  {
    label: "我的清單",
    value: "mine",
  },
  {
    label: "追蹤清單",
    value: "followed",
  },
  // {
  //   label: "探索",
  //   value: "explore",
  // },
];

const PlaylistHeader = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  return (
    <div className="flex justify-between items-center p-3 bg-white border-b border-[#F2F2F2]">
      <div className="flex items-center gap-2">
        {TABS.map((tab) => (
          <div
            key={tab.value}
            className={`cursor-pointer rounded-[4px] px-3 py-2 ${
              tab.value === activeTab
                ? "text-white bg-black"
                : "text-[#323232] bg-[#F2F2F2]"
            }`}
            onClick={() => setActiveTab(tab.value as Tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {/* <div className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-[#f2f2f2]">
          <ArrowUpDown className="w-4 h-4" />
        </div> */}
        <NewPlaylist />
      </div>
    </div>
  );
};

export default PlaylistHeader;
