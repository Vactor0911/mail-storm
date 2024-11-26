import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { color } from "../utils/theme";
import { useAtomValue } from "jotai";
import { analysisResultAtom } from "../state";

const palette = [color.green, color.red];

const StyledChart = () => {
  const analysisResult = useAtomValue(analysisResultAtom);

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data: analysisResult,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          paddingAngle: 3,
          cornerRadius: 5,
          innerRadius: 20,
          arcLabel: (item) => `${item.value}%`,
          valueFormatter: (v) => (v === null ? "" : `${v.value}%`),
        },
      ]}
      slotProps={{
        legend: {
          direction: "row",
          position: {
            horizontal: "middle",
            vertical: "bottom",
          },
        },
      }}
      width={300}
      height={300}
      margin={{ right: 20, bottom: 70 }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default StyledChart;
