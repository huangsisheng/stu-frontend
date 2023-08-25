/* *** 所有表列 *** */
import type { ColumnsType } from 'antd/es/table';

export const STUDENTS: ColumnsType<any> = [
  {
    title: '学号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'operator',
    fixed: 'right',
  },
];

export const TAGS: ColumnsType<any> = [
  {
    title: '标签名',
    dataIndex: 'tag_name',
    key: 'tag_name',
  },
  {
    title: '标签说明',
    dataIndex: 'tag_description',
    key: 'tag_description',
  },
  {
    title: '绑定学生数量',
    dataIndex: 'bind_number',
    key: 'bind_number',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'operator',
    fixed: 'right',
  },
];