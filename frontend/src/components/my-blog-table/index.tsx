import React from 'react'
import { Icon, Table } from 'antd'
import { Link } from 'react-router-dom'

import './styles.scss'

interface IMyBlogTableProps {}

const MyBlogTable: React.FC<IMyBlogTableProps> = () => {
  const dataSource = [
    {
      id: 'skjdhfksjd',
      nickname: 'Mike',
      title: '10 Downing Street',
      createdAt: '2019/06/01',
    },
    {
      id: 'skjdhksjh',
      nickname: 'John',
      title: '10 Downing Street',
      createdAt: '2019/06/01',
    },
  ]
  const pagination = {
    pageSize: 7,
    total: 50,
  }
  return (
    <div className="my-blog-table-wrapper">
      <Table dataSource={dataSource} pagination={pagination}>
        <Table.Column
          title="작성자"
          dataIndex="nickname"
          key="nickname"
          width={150}
        />
        <Table.Column title="제목" dataIndex="title" key="title" width={500} />
        />
        <Table.Column
          title="작성일"
          dataIndex="createdAt"
          key="createdAt"
          width={150}
        />
        <Table.Column
          title="수정"
          dataIndex="id"
          key="id"
          width={100}
          onCellClick={record => console.log('Line: 38', record)}
          render={record => (
            <Link to="/update-blog/slhfsd">
              <Icon className="blog-update-btn" type="edit" />
            </Link>
          )}
        />
      </Table>
    </div>
  )
}

export default MyBlogTable
