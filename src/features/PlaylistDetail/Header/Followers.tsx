const Followers = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center -space-x-2.5">
        <Avatar name="G" />
        <Avatar name="S" />
        <Avatar name="A" />
        <Avatar name="周" />
        <Avatar name="D" />
      </div>
      <span className="text-sm text-[#434343]">5 位追蹤者</span>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="text-xs font-medium bg-[#877E7B] text-white w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#F2F2F2]">{name.charAt(0)}</div>
  )
}

export default Followers;