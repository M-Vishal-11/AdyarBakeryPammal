import DropdownSVG from "./DropdownSVG";

const OffersBtn = ({
  expand,
  setExpand,
}: {
  expand: boolean;
  setExpand: any;
}) => {
  return (
    <button
      onClick={() => setExpand(!expand)}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--top-color)] text-white hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
    >
      <span className="font-medium">
        {expand ? "Collapse All" : "Expand All"}
      </span>
      <DropdownSVG expand={expand} />
    </button>
  );
};

export default OffersBtn;
