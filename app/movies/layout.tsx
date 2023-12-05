import React from "react";

interface MovieLayoutProps {
  children: React.ReactNode;
}
const MovieLayout: React.FC<MovieLayoutProps> = (props) => {
  return <div className="bg-[#13131A]">{props.children}</div>;
};
export default MovieLayout;
