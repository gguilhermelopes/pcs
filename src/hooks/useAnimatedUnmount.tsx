import { useEffect, useRef, useState } from "react";

export default function useAnimatedUnmount(visible: boolean) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) setShouldRender(true);

    const handleAnimationEnd = () => setShouldRender(false);

    if (!visible && animatedElementRef.current) {
      animatedElementRef.current.addEventListener(
        "animationend",
        handleAnimationEnd
      );
    }

    return () => {
      if (animatedElementRef.current)
        animatedElementRef.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
    };
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
