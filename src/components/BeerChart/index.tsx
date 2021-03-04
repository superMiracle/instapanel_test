import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

import BeerDetail from "../BeerDetail";
import { Beer } from "../../types";

interface IProps {
  beers: Beer[] | [];
}
const BeerChart: React.FC<IProps> = ({ beers }: IProps) => {
  const [beer, setBeer] = useState<Beer | null>(null);

  const renderChartData = (beers: Beer[]) => {
    let labels = beers?.map((beer: Beer) => beer.name);

    let data = beers?.map((beer: Beer) => beer.abv);
    data.push(0);

    const datasets = [
      {
        label: "ABV",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        data: data,
      },
    ];

    return { labels, datasets };
  };

  const onCloseModal = () => {
    setBeer(null);
  };

  if (!beers || beers.length == 0) return <></>;

  return (
    <>
      <Bar
        data={renderChartData(beers)}
        options={{
          title: { display: true, text: "ABV", fontSize: 18 },
          legend: { display: true, position: "right" },
        }}
        onElementsClick={(elements) => {
          const index =
            elements[0] && Object.keys(elements[0]).includes("_index")
              ? elements[0]._index
              : -1;
          if (index >= 0) setBeer(beers[index]);
        }}
      ></Bar>
      <BeerDetail show={beer != null} beer={beer} onHide={onCloseModal} />
    </>
  );
};

export default BeerChart;
