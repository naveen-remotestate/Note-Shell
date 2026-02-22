import RecentIcon from "../assets/RecentIcon";

function Recents() {
  const test_recent_data = [
    "Reflection on the Month of June",
    "Project proposal",
    "Travel itinerary",
  ];
  return (
    <>
      <div className="flex flex-col gap-4 text-left ">
        <div id="recent-title">
          <h5 className="text-xs font-semibold">Recents</h5>{" "}
        </div>
        <div className="flex flex-col gap-7 ">
          {test_recent_data.map((item) => (
            <div key={item} className="flex flex-row gap-3">
              <RecentIcon />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Recents;
