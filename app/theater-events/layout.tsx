import React from "react";

interface ConcertLayoutProps {
  children: React.ReactNode;
}
const ConcertLayout: React.FC<ConcertLayoutProps> = (props) => {
  return <div className="bg-[#13131A]">{props.children}</div>;
};
export default ConcertLayout;
