// import React, { useEffect, useState } from "react";
// import { Select } from "antd";
// import type { SelectProps } from "antd";
// import { getTagCategory } from "../../api/auth.api";

// interface ItemProps {
//   label: string;
//   value: string;
// }

// interface TagsCategoryProps {
//   onChange: (value: string[]) => void;
//   data: ItemProps[];
// }

// const TagsCategory = ({ onChange, data }: TagsCategoryProps) => {
//   const [options, setOptions] = useState<ItemProps[]>([]);

//   const sharedProps: SelectProps = {
//     mode: "multiple",
//     style: { width: "100%" },
//     options,
//     placeholder: "Select Item...",
//     maxTagCount: "responsive",
//   };

//   const selectProps: SelectProps = {
//     value: data,
//     onChange: ,
//   };

//   return <Select {...sharedProps} {...selectProps} />;
// };

// export default TagsCategory;
