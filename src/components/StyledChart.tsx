import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { color } from "../utils/theme";
import { useAtomValue } from "jotai";
import { emailsAtom } from "../state";
import { useEffect, useState } from "react";

const palette = [color.green, color.red];

const StyledChart = () => {
  const emails = useAtomValue(emailsAtom);
  const [resultData, setResultData] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    if (emails.filter(email => email.result !== undefined).length === 0) {
      setResultData([]);
      return;
    }

    const countSpam = emails.filter((email) => email.result === "spam").length;
    const spamRate = Math.round((countSpam / emails.length) * 100);
    const hamRate = 100 - spamRate;

    setResultData([
      { value: hamRate, label: "정상" },
      { value: spamRate, label: "스팸" },
    ]);
  }, [emails]);

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data: resultData,
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
