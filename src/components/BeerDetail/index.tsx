import React from "react";
import { Modal, Card } from "antd";

import { Beer } from "../../types";
import "./index.css";

interface IProps {
  beer: Beer | null;
  show: boolean;
  onHide: () => void;
}

const { Meta } = Card;
const BeerDetail: React.FC<IProps> = ({ beer, show, onHide }: IProps) => {
  {
    if (!beer) return <></>;
  }
  return (
    <Modal
      visible={show}
      onCancel={onHide}
      footer={null}
      closeIcon={<></>}
      className='beer-detail-modal'
    >
      <Card
        cover={
          <img alt={beer.name} src={beer.image_url} className='beer-image' />
        }
      >
        <Meta title={beer.name} />
        <p>
          {`ABV : ${beer.abv}`}
          <br />
          {`Firse Brewed : ${beer.first_brewed}`}
          <br />
          {beer.tagline}
        </p>
        <br />
        <Meta title='Description' description={beer.description} />
        <br />
        <Meta title="Brewer's Tips" description={beer.brewers_tips} />
      </Card>
    </Modal>
  );
};

export default BeerDetail;
