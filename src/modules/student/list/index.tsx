import React, { useEffect, useState } from 'react';
import { Button, Card, Select, Table, Tag } from 'antd';
import { EditOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import { QUERY_PARAMS } from 'constants/index';
import { STUDENTS } from 'constants/columns';

import { QueryForm } from 'components/index';
import { deleteStudent, getStudents, getTags } from 'apis/index';
import { useHistory } from 'react-router';
import { theme } from 'constants/theme';

const SexOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
];

export default function StudentList(): JSX.Element {
  const history = useHistory();

  const [selectedTags, setSelectedTags] = useState([]);
  const [queryParams, setQueryParams] = useState({ ...QUERY_PARAMS, tags: [], sex: undefined });
  const onChangeQueryParams = (params = {}) => {
    console.log(params);
    setQueryParams({
      ...queryParams,
      ...params,
    });
    fetchStudents(params);
  };

  const fetchTags = async (params = {}) => {
    const res: Iobject = await getTags({ ...queryParams, ...params });
    if (res.code === 0) {
      setTags(res.data);
    }
  };
  const [tags, setTags] = useState([
    {
      id: 1,
      value: '龋齿',
    },
    {
      id: 2,
      value: '芒果过敏',
    },
  ]);

  const fetchStudents = async (params = {}) => {
    const res: Iobject = await getStudents({ ...queryParams, ...params });
    if (res.code === 0) {
      setStudents(res.data);
    }
  };
  const [students, setStudents] = useState([
    {
      id: '1',
      no: 1,
      tags: ['龋齿'],
      name: '张三',
      age: 4,
      sex: '男',
      address: '成都市武侯区',
      create_time: Date.now(),
    },
    {
      id: '2',
      no: 2,
      tags: ['芒果过敏'],
      name: '李四',
      age: 4.5,
      sex: '女',
      address: '成都市高新区',
      create_time: Date.now(),
    },
  ]);
  useEffect(() => {
    fetchStudents();
    fetchTags();
  }, []);

  const onDelete = async (id = '') => {
    const res: Iobject = await deleteStudent({ id });
    if (res.code === 0) {
      fetchStudents(QUERY_PARAMS);
    }
  };

  const columns = STUDENTS.map((item) => {
    switch (item.key) {
      case 'student_tags':
        item.render = (filed: [], row) => {
          return filed.map((tag) => <Tag>{tag}</Tag>);
        };
        break;
      case 'operator':
        item.render = (filed, row) => {
          return (
            <>
              <Button type='text' size='small' onClick={() => {}}>
                <EditOutlined style={{ color: theme.token?.colorPrimary }} />
              </Button>
              <Button type='link' size='small' onClick={() => history.push(`/student/${row.id}`)}>
                详情
              </Button>
              {/* <Popconfirm
                title='删除标签'
                description={`是否要删除「${row.student_name}」`}
                okType='danger'
                okText='删除'
                cancelText='取消'
                onConfirm={() => onDelete(row.id)}
              >
                <Button type='text' danger size='small' onClick={() => {}}>
                  删除
                </Button>
              </Popconfirm> */}
            </>
          );
        };
        break;

      default:
        break;
    }
    return item;
  });

  const onExport = () => {};

  return (
    <>
      <QueryForm
        placeholder='请输入学生姓名/学号'
        onChangeQuery={debounce(onChangeQueryParams, 100)}
        showDatePicker={false}
        selector={
          <>
            <Select
              style={{ minWidth: '120px' }}
              allowClear
              options={SexOptions}
              value={queryParams.sex}
              placeholder={'请选择性别'}
              onChange={(val) => {
                onChangeQueryParams({
                  sex: val,
                });
              }}
            />
            <Select
              style={{ minWidth: '120px' }}
              mode='multiple'
              allowClear
              options={tags}
              value={selectedTags}
              placeholder={'请选择标签'}
              onChange={(val, options) => {
                setSelectedTags(val);
                onChangeQueryParams({
                  tags: Array.isArray(options) ? options.map((o) => o.id) : [options.id],
                });
              }}
            />
          </>
        }
      >
        <Button type='primary' onClick={() => onExport()}>
          <PlusOutlined />
          新增学生
        </Button>
        <Button onClick={() => onExport()}>
          <DownloadOutlined />
          导出学生信息
        </Button>
      </QueryForm>
      <Card>
        <Table dataSource={students} columns={columns} />
      </Card>
    </>
  );
}