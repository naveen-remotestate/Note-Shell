import DateIcon from "../assets/DateIcon";
import FolderIcon from "../assets/FolderIcon";
import ThreeDotIcon from "../assets/ThreeDotIcon";

function OpenedNote() {
  const noteTitle = "Reflection on the Month of June";
  const folderName = "Personal";
  const date = "21/06/2026";
  const content =
    "It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me One of the best things that happened was getting promoted at work. I've been working really hard and it's great to see that effort recognized. It's also exciting to have more responsibility and the opportunity to contribute to the company in a bigger way. I'm looking forward to taking on new challenges and learning as much as I can in my new role. I also had a great time on my vacation to Hawaii. The beaches were beautiful and I loved trying all of the different types of Hawaiian food. It was nice to relax and get away from the daily grind for a bit. I'm so grateful to have had the opportunity to take a trip like that. On the downside, I feel like I didn't make as much progress on my fitness goals as I would have liked. I was really busy with work and didn't make it to the gym as often as I planned. I'm going to try to be more consistent in July and make exercise a higher priority. I know it will be good for my physical and mental health. I also had a few rough patches in my relationships this month. I had a couple of misunderstandings with friends and it was hard to navigate those conflicts. But I'm glad we were able to talk things through and move past them. I value my relationships and I want to make sure I'm always working to be a good friend. Overall, it was a good month with a mix of ups and downs. I'm looking forward to what July has in store! I'm hoping to make some more progress on my goals and spend quality time with the people I care about.";
  return (
    <>
      <div id="frame18" className="flex flex-col h-full w-full p-12">
        <div id="frame24" className="flex flex-row justify-between p-2">
          <h1 className="text-headingcolor text-2xl font-SourceSans3 font-semibold">
            {noteTitle}
          </h1>
          <div>
            <ThreeDotIcon />
          </div>
        </div>
        <div
          id="frame20"
          className="flex flex-col gap-3.5 font-SourceSans3 text-sm text-menutextcolor p-2"
        >
          <div id="frame19a" className="flex flex-row gap-5 pt-3 ">
            <DateIcon />
            <h4>Date</h4>
            <h4 className="text-headingcolor font-semibold  ">{date}</h4>
          </div>
          <div className="border-b bg-secondary"></div>
          <div id="frame19b" className="flex flex-row gap-5 ">
            <FolderIcon />
            <h4>Folder</h4>
            <h4 className="text-headingcolor font-semibold  ">{folderName}</h4>
          </div>
        </div>
        <div className="h-90/100 w-full text-headingcolor p-2">
          <textarea
            name="postContent"
            defaultValue={content}
            placeholder="Enter Note"
            className="h-full w-full wrap-normal"
          />
        </div>
      </div>
    </>
  );
}
export default OpenedNote;
