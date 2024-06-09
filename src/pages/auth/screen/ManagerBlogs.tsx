import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { deletePost, getListBlogs, updatePost } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

interface DataType {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  likes: any;
  author: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  authorId: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

type DataIndex = keyof DataType;

const data: DataType[] = [];

const ManthumbnailrBlogs: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<DataType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getListBlogs();
        console.log(res);

        if (res && res.status === "success" as any) {
          setData(
            res.data.map((item: DataType) => ({
              _id: item._id, // Ensure _id is present and unique
              slug: item.slug,
              title: item.title,
              thumbnail: item.thumbnail,
              author: item.authorId.username,
              description: item.description,
            }))
          );
        } else {
          // Handle the case where the response is not successful
          console.error("API response not successful:", res);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs(); // Call the function here
  }, []);

  const handleEdit = async (slug: any) => {
    navigate(`/auth/edit-blog/${slug}`);
  };
  const handleDelete = async (slug: string) => {
    const res = await deletePost(slug);
    if (res?.status === 200) {
      setData(data.filter((item) => item.slug !== slug));
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "10%",
      render: (value) => (
        <img src={value} alt="Thumbnail" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: "45%",
      render: (value) => <p>{value}</p>,
    },
    {
      title: "author",
      dataIndex: "author",
      width: "10%",
      key: "author",
      ...getColumnSearchProps("author"),
      sorter: (a, b) => a.author.length - b.author.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.slug)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.slug)}
            okText="Yes"
            cancelText="No"
          >
            <Button key={record.slug} type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="slug"
      pagination={{
        defaultPageSize: 8,
      }}
    />
  );
};

export default ManthumbnailrBlogs;
