import React, { useState } from "react";
import { Table, Image } from "antd";
import BeerDetail from "../BeerDetail";

import { Beer } from "../../types";
import "./index.css";

interface IProp {
  data: Beer[];
  total: number;
  paginate: (page: number, size: number) => void;
}

const BeerTable: React.FC<IProp> = ({ data, total, paginate }: IProp) => {
  const [beer, setBeer] = useState<Beer | null>(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "TagLine",
      dataIndex: "tagline",
      key: "tagline",
    },
    {
      title: "Photo",
      dataIndex: "image_url",
      key: "photo",
      render: (value: any, record: Beer, index: number) => {
        return (
          <Image
            preview={false}
            src={record.image_url}
            height='50px'
            className='beer-image'
            onClick={() => setBeer(record)}
          />
        );
      },
    },
    {
      title: "Abv",
      dataIndex: "abv",
      key: "abv",
      sorter: (a: Beer, b: Beer) => a.abv - b.abv,
    },
  ];

  const onCloseModal = () => {
    setBeer(null);
  };

  const onPaginate = (page: number, size: number) => {
    paginate(page, size);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        title={() => <h2>Beers</h2>}
        bordered
        pagination={{
          total: total,
          defaultPageSize: 10,
          onChange: (page, size) => {
            onPaginate(page, size ? size : 10);
          },
        }}
      />

      <BeerDetail show={beer != null} onHide={onCloseModal} beer={beer} />
    </>
  );
};

export default BeerTable;
