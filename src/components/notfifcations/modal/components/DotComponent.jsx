import { makeStyles } from "@mui/styles";

const useStylesFirstDot = makeStyles({
  "@keyframes move": {
    "0%": { transform: "translateY(0px)" },
    "10%": { transform: "translateY(-1px)" },
    "25%": { transform: "translateY(-2px)" },
    "40%": { transform: "translateY(-3px)" },
    "50%": { transform: "translateY(-2px)" },
    "75%": { transform: "translateY(-1px)" },
    "100%": { transform: "translateY(0px)" },
  },
  animatedBox: {
    width: "10px",
    height: "10px",
    backgroundColor: "#CFCFCF",
    borderRadius: "50%",
    animation: "$move 1.2s linear",
    animationIterationCount: "infinite",
    animationDelay: "1s",
  },
});

const useStylesSecondDot = makeStyles({
  "@keyframes move": {
    "0%": { transform: "translateY(0px)" },
    "10%": { transform: "translateY(-1px)" },
    "25%": { transform: "translateY(-2px)" },
    "40%": { transform: "translateY(-3px)" },
    "50%": { transform: "translateY(-2px)" },
    "75%": { transform: "translateY(-1px)" },
    "100%": { transform: "translateY(0px)" },
  },
  animatedBox: {
    width: "10px",
    height: "10px",
    backgroundColor: "#CFCFCF",
    borderRadius: "50%",
    animation: "$move 1.2s linear",
    animationIterationCount: "infinite",
    animationDelay: "1.25s",
  },
});

const useStylesThirdDot = makeStyles({
  "@keyframes move": {
    "0%": { transform: "translateY(0px)" },
    "10%": { transform: "translateY(-1px)" },
    "25%": { transform: "translateY(-2px)" },
    "40%": { transform: "translateY(-3px)" },
    "50%": { transform: "translateY(-2px)" },
    "75%": { transform: "translateY(-1px)" },
    "100%": { transform: "translateY(0px)" },
  },
  animatedBox: {
    width: "10px",
    height: "10px",
    backgroundColor: "#CFCFCF",
    borderRadius: "50%",
    animation: "$move 1.2s linear",
    animationIterationCount: "infinite",
    animationDelay: "1.45s",
  },
});

function FadeInBox(props) {
  const { number } = props;

  let classes;
  switch (number) {
    case 1:
      classes = useStylesFirstDot();
      break;
    case 2:
      classes = useStylesSecondDot();
      break;
    case 3:
      classes = useStylesThirdDot();
      break;
  }

  return (
    <>
      <div className={classes.animatedBox} />
    </>
  );
}
export default FadeInBox;
