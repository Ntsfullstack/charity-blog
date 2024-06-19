import React from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate as AntRate } from "antd";
import { Flex } from "antd";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const Rate: React.FC = () => (
  <Flex gap="middle" vertical align="center">
    <AntRate
      defaultValue={3}
      character={({ index }: { index?: number }) => customIcons[index ?? 0]}
    />
  </Flex>
);

export default Rate;
