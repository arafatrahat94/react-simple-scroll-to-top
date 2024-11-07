import React, { useEffect, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";

// Define the component's props type
interface ScrollToTopProps {
  size?: number; // Optional size prop (e.g., 'lg', 'xl', etc.)
  color?: string; // Optional color (e.g., 'red-500', '#ff6347', etc.)
  opacity?: number; // Optional opacity (e.g., 'opacity-50', 'opacity-80', etc.)
  border?: string; // Optional border (e.g., 'border-2 border-red-500', etc.)
  disableBounceAnimation?: boolean;
  bottom?: number;
  right?: number;
  CaretColor?: string;
}

const SimpleScrollToTop: React.FC<ScrollToTopProps> = ({
  size = 30, // Default size is 'lg' if no prop is passed
  color = "white", // Default color is '#07332F'
  border = `1px solid black`,
  disableBounceAnimation = false,
  bottom = 20,
  right = 20,
  CaretColor = "black",
}) => {
  const [buttonShow, setButton] = useState<boolean>(false);

  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div
        style={{ bottom: `${bottom}px`, right: `${right}px` }}
        className={`${
          buttonShow
            ? `fixed z-50 transform opacity-100 duration-500`
            : `opacity-0 fixed  transform duration-500 -z-50`
        }  ${
          disableBounceAnimation ? "" : "animate-bounce"
        }  duration-300 delay-300`}
      >
        <button
          style={{ border: border, backgroundColor: color }}
          onClick={handleScroll}
          className={`btn p-2 flex items-center justify-center rounded-full cursor-pointer ${
            size && `w-[${size}px] h-[${size}px]`
          } `}
        >
          <span className={`text-[${CaretColor}]`}>
            <BsFillCaretUpFill className={`text-[${CaretColor}] `} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SimpleScrollToTop;
